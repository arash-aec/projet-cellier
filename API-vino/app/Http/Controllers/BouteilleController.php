<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\CellierBouteilles;
use App\Models\Bouteille;
use App\Models\Pays;
use App\Models\Type;



class BouteilleController extends Controller
{

    /**
     * Récupération de tous les celliers d'un usager
     */
    public function getBouteilles() { 
        $bouteilles = Bouteille::get();
        return response()->json($bouteilles);
    }

    /**
     * Récupération des toutes les bouteilles avec l'id du cellier 
     */
    public function getBouteillesCellier($id_cellier){
        // Récupère les bouteilles du cellier par son id
        $cellierBouteilles = CellierBouteilles::where('cellier_id', $id_cellier)->get();
        // Extraction des bouteilles
        $bouteilleIds = $cellierBouteilles->pluck('bouteille_id');
        // Recuperation de Type et Pays
        $bouteilles = Bouteille::whereIn('id', $bouteilleIds)->with('relationPays', 'relationType')->get();
        
        $bouteilles = $bouteilles->map(function ($bouteille) use ($cellierBouteilles) {
            // Obtention du premier enregistrement
            $cellierBouteille = $cellierBouteilles->firstWhere('bouteille_id', $bouteille->id);
            
            // Déclaration des variables 
            $quantite = $cellierBouteille ? $cellierBouteille->quantite : 0;
            $dateAchat = $cellierBouteille ? $cellierBouteille->date_achat : null;
            $gardeJusqua = $cellierBouteille ? $cellierBouteille->garde_jusqua : null;
            $notes = $cellierBouteille ? $cellierBouteille->notes : null;
            $prix = $cellierBouteille ? $cellierBouteille->prix : null;
            $millesime = $cellierBouteille ? $cellierBouteille->millesime : null;

            // Récupération des informations
            $bouteilles = $this->formatBouteille($bouteille);
            // Ajout de la quantité
            $bouteilles['quantite'] = $quantite;
            $bouteilles['date_achat'] = $dateAchat;
            $bouteilles['garde_jusqua'] = $gardeJusqua;
            $bouteilles['notes'] = $notes;
            $bouteilles['prix'] = $prix;
            $bouteilles['millesime'] = $millesime;
            return $bouteilles;
        });
        
        return response()->json($bouteilles);
    }

    /**
     * Récuperation d'une bouteille avec son id 
     */
    public function getBouteille($id) {
        $bouteille = Bouteille::with('relationPays', 'relationType')->find($id);
        $bouteille = $this->formatBouteille($bouteille);
        return response()->json($bouteille);
    }

    /**
     * Modification d'une bouteille avec son id 
     */
    public function modifierBouteille($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'nom' => 'required',
            'description' => 'required',
            'prix_saq' => 'required|numeric',
            'format' => 'required',
            'pays' => 'required',
            'type' => 'required',
            'url_img' => 'required',
            'url_saq' => 'required',
        ]);
        
        if ($validator->fails()) {
            // Les données n'ont pas passé la validation
            return response()->json(['errors' => $validator->errors()], 400);
        }
        
        $bouteille = Bouteille::findOrFail($id);
        $bouteille->nom = $request->input('nom');
        $bouteille->description = $request->input('description');
        $bouteille->prix_saq = $request->input('prix_saq');
        $bouteille->format = $request->input('format');
        $bouteille->relationPays->pays = $request->input('pays');
        $bouteille->relationType->type = $request->input('type');
        $bouteille->url_img = $request->input('url_img');
        $bouteille->url_saq = $request->input('url_saq');
        $bouteille->save();
        
        return response()->json($bouteille);
    }

    /**
     * Suppression d'une bouteille
     */
    public function effacerBouteille($id) {
        $bouteille = Bouteille::findOrFail($id);
        $bouteille->delete();
        return response()->json(['message' => 'bouteille supprimé avec succès']);
    }

    /**
     * Auto Complete Liste Bouteille
     */
    public function autocompleteBouteille(Request $request) {
        $nom = $request->input('nom');
        $nb_resultat = 10;
        $nom = preg_replace("/\*/", "%", $nom);
        $rows = Bouteille::select('id', 'nom')
            ->whereRaw('LOWER(nom) LIKE LOWER(?)', ['%' . $nom . '%'])
            ->limit($nb_resultat)
            ->get()
            ->toArray();
        foreach ($rows as &$row) {
            $row['nom'] = trim(utf8_encode($row['nom']));
        }
        return response()->json($rows);
    }


    // Fonction pour formater une bouteille
    public function formatBouteille($bouteille) {
        return [
            'id' => $bouteille->id,
            'nom' => $bouteille->nom,
            'image' => $bouteille->image,
            'code_saq' => $bouteille->code_saq,
            'pays' => $bouteille->relationPays->pays,
            'description' => $bouteille->description,
            'prix_saq' => $bouteille->prix_saq,
            'url_saq' => $bouteille->url_saq,
            'url_img' => $bouteille->url_img,
            'format' => $bouteille->format,
            'type' => $bouteille->relationType->type,
        ];
    }

    public function ajouterNouvelleBouteille(Request $request)
{
    // Créer une nouvelle bouteille
    $bouteille = new Bouteille();
    $bouteille->nom = $request->input('nom');
    $bouteille->description = $request->input('description');
    $bouteille->format = $request->input('format');
    $bouteille->image = '';

    // Retrieve the foreign key ID for the selected type
    $type = Type::where('type', $request->input('type'))->first();
    if ($type) {
        $bouteille->type = $type->id;
    }

    // Retrieve the foreign key ID for the selected pays
    $pays = Pays::where('pays', $request->input('pays'))->first();
    if ($pays) {
        $bouteille->pays = $pays->id;
    }

    // Set the authenticated user's ID as the usager_id
    //$bouteille->usager_id = Auth::user()->id;
    //$bouteille->usager_id = Auth::id();
    //$usager_id = Auth::id();

    // Set the usager_id
    //$bouteille->usager_id = $usager_id;

    $bouteille->usager_id = $request->input('usager_id');

    // Définir d'autres propriétés de la bouteille

    // Enregistrez la bouteille dans la base de données
    $bouteille->save();

    // Créer une nouvelle entrée dans la table vino_cellier_bouteilles
    $cellierBouteille = new CellierBouteilles();
    $cellierBouteille->cellier_id = $request->input('cellier_id');
    $cellierBouteille->bouteille_id = $bouteille->id;
    $cellierBouteille->quantite = $request->input('quantite');
    $cellierBouteille->date_achat = $request->input('date_achat');
    $cellierBouteille->garde_jusqua = $request->input('garde_jusqua');
    $cellierBouteille->notes = $request->input('notes');
    $cellierBouteille->prix = $request->input('prix');
    $cellierBouteille->millesime = $request->input('millesime');
    // Définir les autres propriétés de la bouteille cellier

    // Enregistrer la bouteille de cellier dans la base de données
    $cellierBouteille->save();

    return response()->json(['success' => true, 'bouteille' => $bouteille, 'cellier_bouteille' => $cellierBouteille]);
}


}
