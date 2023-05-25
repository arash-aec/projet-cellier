<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Usager;

use App\Http\Controllers\BouteilleController;
use App\Http\Controllers\CellierController;
use App\Http\Controllers\CellierBouteillesController;

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
Route::get('/celliers', [CellierController::class, 'getCelliers']);

// Récupération d'un cellier avec son id
Route::get('/cellier/{id}', [CellierController::class, 'getCellier']);

// Ajout d'un cellier
Route::post('/cellier', [CellierController::class, 'ajoutCellier']);

// Modification d'un cellier
Route::put('/cellier/{id}', [CellierController::class, 'modifierCellier']);

// Suppression d'un cellier
Route::delete('/cellier/{id}', [CellierController::class, 'effacerCellier']);


// ------------------------------------------ Bouteille
// Récupération des bouteilles avec id d'un cellier 
Route::get('/bouteilles/{id}', [BouteilleController::class, 'getBouteilles']);

// Récupération d'une bouteille avec son id 
Route::get('/bouteille/{id}', [BouteilleController::class, 'getBouteille']);

// Modification d'une bouteille
Route::put('/bouteille/{id}', [BouteilleController::class, 'modifierBouteille']);

// Suppression d'une bouteille
Route::delete('/bouteille/{id}', [BouteilleController::class, 'effacerBouteille']);


// Auto Complete Liste Bouteille
Route::post('/bouteilles/autocompleteBouteille', [BouteilleController::class, 'autocompleteBouteille']);


// ------------------------------------------ Cellier_bouteilles
// Récupérer les bouteilles d'un cellierà
Route::get('/cellier-bouteilles/{id}', [CellierBouteillesController::class, 'getCellierBouteilles']);

// Ajouter une bouteille à la quantité Cellier_bouteilles
Route::post('/cellier-bouteilles/{bouteille_id}/{cellier_id}/ajouter', [CellierBouteillesController::class, 'ajouterBouteilleQuantite']);

// Retirer une bouteille à la quantité Cellier_bouteilles
Route::post('/cellier-bouteilles/{bouteille_id}/{cellier_id}/boire', [CellierBouteillesController::class, 'boireBouteilleQuantite']);

// Modification de la Quantite
Route::put('/cellier-bouteilles/{bouteille_id}/{cellier_id}/modifier', [CellierBouteillesController::class, 'modifierBouteilleQuantite']);

// Ajouter une bouteille dans cellier
Route::post('/cellier-bouteilles/ajoutBouteilleCellier', [CellierBouteillesController::class, 'ajouterBouteilleCellier']);

// Supprimer une bouteille d'un cellier
Route::delete('/cellier-bouteilles/{bouteille_id}/{cellier_id}/supprimer', [CellierBouteillesController::class, 'supprimerBouteilleCellier']);



// ------------------------------------------ Usager
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