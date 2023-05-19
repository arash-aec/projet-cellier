<?php

use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Usager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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



//Bouteille

Route::get('/bouteilles', function () {
    $bouteilles = Bouteille::get();
    return response()->json($bouteilles);
});

Route::get('/bouteille/{id}', function ($id) {
    $bouteille = Bouteille::find($id);
    return response()->json($bouteille);
});

//Usager

Route::get('/usagers', function () {
    $usagers = Usager::get();
    return response()->json($usagers);
});

Route::get('/usager/{id}', function ($id) {
    $usager = Usager::find($id);
    return response()->json($usager);
});

Route::put('/usager/{id}', function ($id, Request $request) {
    $usager = Usager::findOrFail($id);
    $usager->nom = $request->input('nom');
    // Ajoutez tout autre champ que vous souhaitez modifier
    $usager->save();
    return response()->json($usager);
});

Route::post('/usager', function (Request $request) {
    $usager = new Usager;
    $usager->nom = $request->input('nom');
    // Ajoutez tous les autres champs que vous souhaitez définir lors de la création de l'Usager
    $usager->save();
    return response()->json($usager);
});

Route::delete('/usager/{id}', function ($id) {
    $usager = Usager::findOrFail($id);
    $usager->delete();
    return response()->json(['message' => 'Usager supprimé avec succès']);
});