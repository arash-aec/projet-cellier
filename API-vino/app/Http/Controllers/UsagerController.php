<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usager;

class UsagerController extends Controller
{
    /**
     * Récupération de tous les usagers
     */
    public function getUsagers() {
        $usagers = Usager::get();
        return response()->json($usagers);
    }

    /**
     * Récupération d'un usager avec son id
     */
    public function getUsager($id) {
        $usager = Usager::find($id);
        return response()->json($usager);
    }

    /**
     * Modification d'un usager
     */
    public function modifierUsager($id, Request $request) {
        $usager = Usager::findOrFail($id);
        $usager->nom = $request->input('nom');
        $usager->prenom = $request->input('prenom');
        $usager->courriel = $request->input('courriel');
        $usager->role = $request->input('role');
        $usager->save();
        return response()->json($usager);
    }

    /**
     * Ajout d'un usager
     */
    public function ajouterUsager(Request $request) {
        // $usager = new Usager;
        // $usager->nom = $request->input('nom');
        // $usager->prenom = $request->input('prenom');
        // $usager->courriel = $request->input('courriel');
        // $usager->mot_de_passe= $request->input('mot_de_passe');
        // $usager->role = $request->input('role');
        // $usager->save();
        // return response()->json($usager);
    }

    /**
     * Suppression d'un usager
     */
    public function supprimerUsager($id) {
        $usager = Usager::findOrFail($id);
        $usager->delete();
        return response()->json(['message' => 'Usager supprimé avec succès']);
    }
}
