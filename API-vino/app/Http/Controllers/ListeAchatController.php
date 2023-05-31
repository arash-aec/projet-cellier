<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListeAchat;

use Illuminate\Support\Facades\DB;

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
     * Ajouter une bouteille à la quantité Cellier_bouteilles
     */
    public function ajouterBouteilleListeAchat($bouteille_id, $id_usager, Request $request) {
        $listeAchat = DB::table('vino__liste_achat')
            ->where('bouteille_id', $bouteille_id)
            ->where('usager_id', $id_usager)
            ->increment('quantite');

        if ($listeAchat) {
            return response()->json(['message' => 'Quantité augmentée avec succès']);
        } else {
            // Gérer le cas où l'enregistrement n'est pas trouvé
            return response()->json(['message' => 'Enregistrement non trouvé']);
        }
    }

    /**
     * Retirer une bouteille à la quantité Cellier_bouteilles
     */
    public function retirerBouteilleListeAchat($bouteille_id, $id_usager, Request $request) {
        $listeAchat = DB::table('vino__liste_achat')
            ->where('bouteille_id', $bouteille_id)
            ->where('usager_id', $id_usager)
            ->first();
    
        if ($listeAchat) {
            $quantite = $listeAchat->quantite - 1;
    
            if ($quantite <= 0) {
                DB::table('vino__liste_achat')
                    ->where('bouteille_id', $bouteille_id)
                    ->where('usager_id', $id_usager)
                    ->delete();
            } else {
                DB::table('vino__liste_achat')
                    ->where('bouteille_id', $bouteille_id)
                    ->where('usager_id', $id_usager)
                    ->update(['quantite' => $quantite]);
            }
    
            return response()->json(['message' => 'Quantité diminuée avec succès']);
        } else {
            return response()->json(['error' => 'Cellier bouteille non trouvé'], 404);
        }
    }

    /**
     * Modification de la Quantite
     */
    public function modifierBouteilleListeAchat($bouteille_id, $id_usager, Request $request) {
        $quantite = $request->input('quantite');

        DB::table('vino__liste_achat')
            ->where('bouteille_id', $bouteille_id)
            ->where('usager_id', $id_usager)
            ->update(['quantite' => $quantite]);

        $listeAchat = DB::table('vino__liste_achat')
            ->where('bouteille_id', $bouteille_id)
            ->where('usager_id', $id_usager)
            ->first();

        return response()->json($listeAchat);
    }

    /**
     * Ajoute une bouteille à la liste d'achat
     */
    public function supprimerBouteilleListeAchat($bouteille_id, $id_usager) {
        DB::table('vino__liste_achat')
            ->where('bouteille_id', $bouteille_id)
            ->where('usager_id', $id_usager)
            ->delete();
        return response()->json(['message' => 'Bouteille supprimée avec succès']);
    }
}
