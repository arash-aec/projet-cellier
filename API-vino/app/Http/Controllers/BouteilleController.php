<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CellierBouteilles;
use App\Models\Bouteille;

class BouteilleController extends Controller
{
    /**
     * Récupération des toutes les bouteilles avec l'id du cellier 
     */
    public function getBouteilles($id){
        // Récupère les bouteilles du cellier par son id
        $cellierBouteilles = CellierBouteilles::where('cellier_id', $id)->get();
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
        $bouteille = $bouteille->map(function ($bouteille) {
            return $this->formatBouteille($bouteille);
        });
        return response()->json($bouteille);
    }

    /**
     * Modification d'une bouteille avec son id 
     */
    public function modifierBouteille($id, Request $request) {
        $bouteille = Bouteille::findOrFail($id);
        $bouteille->nom = $request->input('nom');
        $bouteille->description = $request->input('description');
        $bouteille->prix = $request->input('prix');
        $bouteille->format = $request->input('format');
        $bouteille->type = $request->input('type');
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

}
