<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cellier;

class CellierController extends Controller
{
    /**
     * Récupération de tous les celliers
     */
    public function getCelliers() { 
        $celliers = Cellier::get();
        return response()->json($celliers);
    }

    /**
     *  Récupération d'un cellier avec son id
     */
    public function getCellier($id) {
        $cellier = Cellier::find($id);
        return response()->json($cellier);
    }

    /**
     * Ajout d'un cellier 
     */
    public function ajoutCellier(Request $request) {
        $cellier = new Cellier();
        $cellier->nom = $request->input('nom');
        $cellier->usager_id = 1;
        $cellier->save();
        return response()->json($cellier, 201);
    }

    /**
     * Modification d'un cellier
     */
    public function modifierCellier($id, Request $request) {
        $cellier = Cellier::findOrFail($id);
        $cellier->nom = $request->input('nom');
        $cellier->save();
        return response()->json($cellier);
    }

    /**
     * Suppression d'un cellier
     */
    public function effacerCellier($id){
        $cellier = Cellier::findOrFail($id);
        $cellier->delete();
        return response()->json(['message' => 'Cellier supprimé avec succès']);
    }
}
