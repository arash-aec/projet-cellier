<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\CellierBouteilles;

class CellierBouteillesController extends Controller
{
    /**
     * Récupération de tous les cellierbouteilles
     */
    public function getcellierBouteilles() { 
        $celliers = CellierBouteilles::get();
        return response()->json($celliers);
    }

    /**
     * Récupérer une bouteille d'un cellier avec son id_bouteille et son id_cellier
     */
    public function getCellierBouteille($bouteille_id, $cellier_id) {
        $cellierBouteilles = CellierBouteilles::where('bouteille_id', $bouteille_id)
        ->where('cellier_id', $cellier_id)
        ->get();

        return response()->json($cellierBouteilles);
    }

    /**
     * Récupérer les bouteilles d'un cellier avec son id
     */
    public function getCellierBouteillesId($id) {
        $cellierBouteilles = CellierBouteilles::where('cellier_id', $id)->get();
        return response()->json($cellierBouteilles);
    }

    /**
     * Ajouter une bouteille à la quantité Cellier_bouteilles
     */
    public function ajouterBouteilleQuantite($bouteille_id, $cellier_id, Request $request) {
        $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
        ->where('cellier_id', $cellier_id)
        ->first();

        $cellierBouteille->quantite += 1;
        $cellierBouteille->save();

        return response()->json(['message' => 'Quantité augmentée avec succès']);
    }

    /**
     * Retirer une bouteille à la quantité Cellier_bouteilles
     */
    public function boireBouteilleQuantite($bouteille_id, $cellier_id, Request $request) {
        $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
        ->where('cellier_id', $cellier_id)
        ->first();

        if ($cellierBouteille) {
            $cellierBouteille->quantite -= 1;
            // Vérifier si la quantité atteint 0 et supprimer la ligne si c'est le cas
            if ($cellierBouteille->quantite <= 0) {
                $cellierBouteille->delete();
            } else {
                $cellierBouteille->save();
            }

            return response()->json(['message' => 'Quantité diminuée avec succès']);
        } else {

            return response()->json(['error' => 'Cellier bouteille non trouvé'], 404);
        }
    }

    /**
     * Modification de la Quantite
     */
    public function modifierBouteilleQuantite($bouteille_id, $cellier_id, Request $request) {
        $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
        ->where('cellier_id', $cellier_id)
        ->first();
        $cellierBouteille->quantite = $request->input('quantite');
        $cellierBouteille->save();

        return response()->json($cellierBouteille);
    }

    /**
     * Modification de la Quantite
     */
    public function modifierBouteilleCellier($bouteille_id, $cellier_id, Request $request) {

        $validator = Validator::make($request->all(), [
            'bouteille_id' => 'required|integer',
            'cellier_id' => 'required|integer',
            'quantite' => 'required|integer|min:1',
            'date_achat' => 'required',
            'millesime' => 'required|integer|min:1900|max:'.date('Y'),
            'prix' => 'required|numeric|min:0',
            'garde_jusqua' => 'integer',
            'notes' => 'nullable|integer',
        ]);
    
        if ($validator->fails()) {
            // Les données n'ont pas passé la validation
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Rechercher l'entrée existante dans la table vino__cellier_bouteilles
        $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
                                            ->where('cellier_id', $cellier_id)
                                            ->first();
    
        if (!$cellierBouteille) {
            // L'entrée n'existe pas, retourner une réponse appropriée
            return response()->json(['error' => 'Entrée non trouvée'], 404);
        }
    
        // Mettre à jour les valeurs des champs de l'entrée existante
        $cellierBouteille->quantite = $request->input('quantite');
        $cellierBouteille->date_achat = $request->input('date_achat');
        $cellierBouteille->millesime = $request->input('millesime');
        $cellierBouteille->prix = $request->input('prix');
        $cellierBouteille->garde_jusqua = $request->input('garde_jusqua');
        $cellierBouteille->notes = $request->input('notes');
    
        // Enregistrer les modifications
        $res = $cellierBouteille->save();
    
        return response()->json(['success' => $res]);
    }

    /**
     * Ajouter une bouteille dans cellier
     */
    public function ajouterBouteilleCellier(Request $request) {
        $validator = Validator::make($request->all(), [
            'bouteille_id' => 'required|integer',
            'cellier_id' => 'required|integer',
            'quantite' => 'required|integer|min:1',
            'date_achat' => 'required',
            'millesime' => 'required|integer|min:1900|max:'.date('Y'),
            'prix' => 'required|numeric|min:0',
            'garde_jusqua' => 'integer',
            'notes' => 'nullable|integer',
        ]);
    
        if ($validator->fails()) {
            // Les données n'ont pas passé la validation
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Les données ont été validées, vous pouvez les utiliser en toute sécurité
        $cellierBouteille = new CellierBouteilles();
        $cellierBouteille->bouteille_id = $request->input('bouteille_id');
        $cellierBouteille->cellier_id = $request->input('cellier_id');
        $cellierBouteille->quantite = $request->input('quantite');
        $cellierBouteille->date_achat = $request->input('date_achat');
        $cellierBouteille->millesime = $request->input('millesime');
        $cellierBouteille->prix = $request->input('prix');
        $cellierBouteille->garde_jusqua = $request->input('garde_jusqua');
        $cellierBouteille->notes = $request->input('notes');
    
        $res = $cellierBouteille->save();
    
        return response()->json(['success' => $res]);
    }    

    /**
     * Supprimer une bouteille d'un cellier
     */
    public function supprimerBouteilleCellier($bouteille_id, $cellier_id) {
        $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
        ->where('cellier_id', $cellier_id)
        ->first();

        if ($cellierBouteille) {
            $cellierBouteille->delete();
            return response()->json(['message' => 'Bouteille supprimée avec succès']);
        } else {
            return response()->json(['error' => 'Cellier bouteille non trouvé'], 404);
        }
    }
}
