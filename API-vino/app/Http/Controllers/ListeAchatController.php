<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListeAchat;

class ListeAchatController extends Controller
{
    /**
     * Récupérer la liste d'achat d'un usager
     */
    public function getListeAchatUsager($id) {
        $listeAchat = ListeAchat::where('usager_id', $id)->get();
        return response()->json($listeAchat);
    }

    /**
     * Ajoute une bouteille à la liste d'achat
     */
    public function getListeAchatAjout($id_bouteille, $id_usager, Request $request) {
        // Crée une nouvelle instance du modèle ListeAchat avec les valeurs des clés étrangères
        $listeAchat = new ListeAchat();
        $listeAchat->usager_id = $id_usager;
        $listeAchat->bouteille_id = $id_bouteille;
        $listeAchat->quantite = $request->input('quantite');

        // Enregistre la nouvelle instance dans la base de données
        $listeAchat->save();

        return response()->json(['message' => 'Bouteille ajoutée avec succès']);
    }

    /**
     * Ajoute une bouteille à la liste d'achat
     */
    public function supprimerBouteilleListeAchat($id_bouteille, $id_usager) {
        $id_bouteille = intval($id_bouteille);
        $id_usager = intval($id_usager);
        $bouteille = ListeAchat::where('usager_id', $id_usager)
                                ->where('bouteille_id', $id_bouteille)
                                ->firstOrFail();
        $bouteille->delete();
        return response()->json(['message' => 'Bouteille supprimée avec succès']);
    }
}
