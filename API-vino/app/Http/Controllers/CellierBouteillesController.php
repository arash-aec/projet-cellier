<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CellierBouteilles;


class CellierBouteillesController extends Controller
{
    /**
     * Récupérer les bouteilles d'un cellier
     */
    public function getCellierBouteilles($id) {
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
     * Ajouter une bouteille dans cellier
     */
    public function ajouterBouteilleCellier(Request $request) {
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
