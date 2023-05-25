<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Usager;
use App\Models\CellierBouteilles;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// ------------------------------------------ Cellier
// Récupération de tous les celliers
Route::get('/celliers', function () {
    $celliers = Cellier::get();
    return response()->json($celliers);
});
// Ajout d'un cellier
Route::post('/cellier', function (Request $request) {
    $cellier = new Cellier();
    $cellier->nom = $request->input('nom');
    $cellier->usager_id = 1;
    $cellier->save();
    return response()->json($cellier, 201);
});
// Récupération d'un cellier avec son id
Route::get('/cellier/{id}', function ($id) {
    $cellier = Cellier::find($id);
    return response()->json($cellier);
});
// Modification d'un cellier
Route::put('/cellier/{id}', function ($id, Request $request) {
    $cellier = Cellier::findOrFail($id);
    $cellier->nom = $request->input('nom');
    $cellier->save();
    return response()->json($cellier);
});
// Suppression d'un cellier
Route::delete('/cellier/{id}', function ($id) {
    $cellier = Cellier::findOrFail($id);
    $cellier->delete();
    return response()->json(['message' => 'Cellier supprimé avec succès']);
});


// ------------------------------------------ Bouteille
// Récupération des bouteilles avec id d'un cellier 
Route::get('/bouteilles/{id}', function ($id) {   
    // Récupère les bouteilles du cellier par son id
    $cellierBouteilles = CellierBouteilles::where('cellier_id', $id)->get();
    // Extraction des bouteilles
    $bouteilleIds = $cellierBouteilles->pluck('bouteille_id');
    // Recuperation de Type et Pays
    $bouteilles = Bouteille::whereIn('id', $bouteilleIds)->with('relationPays', 'relationType')->get();
    // 
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
        $bouteilles = formatBouteille($bouteille);
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
});

// Récupération d'une bouteille avec son id 
Route::get('/bouteille/{id}', function ($id) {
    $bouteille = Bouteille::with('relationPays', 'relationType')->find($id);
    $bouteille = $bouteille->map(function ($bouteille) {
        return formatBouteille($bouteille);
    });
    return response()->json($bouteille);
});
// Modification d'une bouteille
Route::put('/bouteille/{id}', function ($id, Request $request) {
    $bouteille = Bouteille::findOrFail($id);
    $bouteille->nom = $request->input('nom');
    $bouteille->description = $request->input('description');
    $bouteille->prix = $request->input('prix');
    $bouteille->format = $request->input('format');
    $bouteille->type = $request->input('type');
    $bouteille->save();
    return response()->json($bouteille);
});
// Suppression d'une bouteille
Route::delete('/bouteille/{id}', function ($id) {
    $bouteille = Bouteille::findOrFail($id);
    $bouteille->delete();
    return response()->json(['message' => 'bouteille supprimé avec succès']);
});


// Auto Complete Liste Bouteille
Route::post('/bouteilles/autocompleteBouteille', function (Request $request) {
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
});

// Fonction pour formater une bouteille
function formatBouteille($bouteille) {
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


// ------------------------------------------ Cellier_bouteilles
// Récupérer les bouteilles d'un cellier
Route::get('/cellier-bouteilles/{id}', function ($id) {
    $cellierBouteilles = CellierBouteilles::where('cellier_id', $id)->get();
    return response()->json($cellierBouteilles);
});
// Ajouter une bouteille à la quantité Cellier_bouteilles
Route::post('/cellier-bouteilles/{bouteille_id}/{cellier_id}/ajouter', function ($bouteille_id, $cellier_id, Request $request) {
    $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
        ->where('cellier_id', $cellier_id)
        ->first();

    $cellierBouteille->quantite += 1;
    $cellierBouteille->save();

    return response()->json(['message' => 'Quantité augmentée avec succès']);
});
// Retirer une bouteille à la quantité Cellier_bouteilles
Route::post('/cellier-bouteilles/{bouteille_id}/{cellier_id}/boire', function ($bouteille_id, $cellier_id, Request $request) {
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
});
// Modification de la Quantite
Route::put('/cellier-bouteilles/{bouteille_id}/{cellier_id}/modifier', function ($bouteille_id, $cellier_id, Request $request) {
    $cellierBouteille = CellierBouteilles::where('bouteille_id', $bouteille_id)
    ->where('cellier_id', $cellier_id)
    ->first();
    $cellierBouteille->quantite = $request->input('quantite');
    $cellierBouteille->save();
    return response()->json($cellierBouteille);
});
// Ajouter une bouteille à cellier
Route::post('/cellier-bouteilles/ajoutBouteilleCellier', function (Request $request) {
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
});


//Usager

// Récupération de tous les usagers
Route::get('/usagers', function () {
    $usagers = Usager::get();
    return response()->json($usagers);
});

// Récupération d'un usager avec son id
Route::get('/usager/{id}', function ($id) {
    $usager = Usager::find($id);
    return response()->json($usager);
});


// Modification d'un usager
Route::put('/usager/{id}', function ($id, Request $request) {
    $usager = Usager::findOrFail($id);
    $usager->nom = $request->input('nom');
    $usager->prenom = $request->input('prenom');
    $usager->courriel = $request->input('courriel');
    $usager->mot_de_passe = $request->input('mot_de_passe');
    $usager->role = $request->input('role');
    $usager->save();
    return response()->json($usager);
});

// Ajout d'un usager
Route::post('/usager', function (Request $request) {
    $usager = new Usager;
    $usager->nom = $request->input('nom');
    $usager->prenom = $request->input('prenom');
    $usager->courriel = $request->input('courriel');
    $usager->mot_de_passe= $request->input('mot_de_passe');
    $usager->role = $request->input('role');
    // Ajoutez tous les autres champs que vous souhaitez définir lors de la création de l'Usager

    $usager->save();
    return response()->json($usager);
});

// Suppression d'un usager
Route::delete('/usager/{id}', function ($id) {
    $usager = Usager::findOrFail($id);
    $usager->delete();
    return response()->json(['message' => 'Usager supprimé avec succès']);
});

//Route API pour l'authentification des utilisateurs
// Route::post('/login', 'AuthController@login');


Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
