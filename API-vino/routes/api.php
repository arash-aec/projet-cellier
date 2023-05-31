<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use GuzzleHttp\Middleware;
use App\Http\Controllers\BouteilleController;
use App\Http\Controllers\CellierController;
use App\Http\Controllers\CellierBouteillesController;
use App\Http\Controllers\ListeAchatController;
use App\Http\Controllers\UsagerController;
use App\Http\Controllers\SAQController;

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

// Récupération de tous les celliers d'un usager
Route::get('/celliers/{id}', [CellierController::class, 'getCelliersUsager']);

// Récupération d'un cellier avec son id
Route::get('/cellier/{id}', [CellierController::class, 'getCellier']);

// Ajout d'un cellier
Route::post('/cellier', [CellierController::class, 'ajoutCellier']);

// Modification d'un cellier
Route::put('/cellier/{id}', [CellierController::class, 'modifierCellier']);

// Suppression d'un cellier
Route::delete('/cellier/{id}', [CellierController::class, 'effacerCellier']);


// ------------------------------------------ Bouteille
// Récupération de toutes les bouteilles
Route::get('/bouteilles', [BouteilleController::class, 'getBouteilles']);

// Récupération des bouteilles avec id d'un cellier 
Route::get('/bouteilles/{id_cellier}', [BouteilleController::class, 'getBouteillesCellier']);

// Récupération d'une bouteille avec son id 
Route::get('/bouteille/{id}', [BouteilleController::class, 'getBouteille']);

// Modification d'une bouteille
Route::put('/bouteille/{id}', [BouteilleController::class, 'modifierBouteille']);

// Suppression d'une bouteille
Route::delete('/bouteille/{id}', [BouteilleController::class, 'effacerBouteille']);


// Auto Complete Liste Bouteille
Route::post('/bouteilles/autocompleteBouteille', [BouteilleController::class, 'autocompleteBouteille']);


// ------------------------------------------ Liste_achat
// Récupération de la liste d'achat d'un usager
Route::get('/liste-achat/{id_usager}', [ListeAchatController::class, 'getListeAchatUsager']);

// Ajout d'une bouteille dans liste d'achat
Route::post('/liste-achat/{id_bouteille}/{id_usager}', [ListeAchatController::class, 'getListeAchatAjout']);

// Supprimer une bouteille de la liste d'achat
Route::delete('/liste-achat/{id_bouteille}/{id_usager}/supprimer', [ListeAchatController::class, 'supprimerBouteilleListeAchat']);


// ------------------------------------------ Cellier_bouteilles
// Récupération de tous les cellier_bouteilles
Route::get('/cellier-bouteilles', [CellierBouteillesController::class, 'getcellierBouteilles']);

// Récupérer les bouteilles d'un cellier avec son id
Route::get('/cellier-bouteilles/{id}', [CellierBouteillesController::class, 'getCellierBouteillesId']);

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
Route::get('/usagers', [UsagerController::class, 'getUsagers']);

// Récupération d'un usager avec son id
Route::get('/usager/{id}', [UsagerController::class, 'getUsager']);

// Modification d'un usager
Route::put('/modifierUsager/{id}', [UsagerController::class, 'modifierUsager']);

// Ajout d'un usager
Route::post('/ajouterUsager', [UsagerController::class, 'ajouterUsager']);

// Suppression d'un usager
Route::delete('/usager/{id}', [UsagerController::class, 'supprimerUsager']);

// Ajout de bouteille non liste
Route::post('bouteilles/nouvelle', [BouteilleController::class, 'ajouterNouvelleBouteille']);



// ------------------------------------------ Authentification
// Inscription
Route::post('/registration', [App\Http\Controllers\AuthController::class, 'register']);
// Connexion
Route::post('/connexion', [App\Http\Controllers\AuthController::class, 'login']);

Route::group(['middleware'=> ['auth:sanctum']], function() {
    Route::post('/profile', [App\Http\Controllers\AuthController::class, 'profile']);
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
});



// ------------------------------------------ SAQ
// Importation des bouteilles de la SAQ
Route::get('/importation-saq/{nombre}/{page}', [SAQController::class, 'getProduits']);
