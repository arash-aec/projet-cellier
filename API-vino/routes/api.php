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

// Modification d'un bouteille
Route::put('/bouteille/{id}', function ($id, Request $request) {
    $bouteille = Bouteille::findOrFail($id);
    $bouteille->nom = $request->input('nom');
    $bouteille->description = $request->input('description');
    $bouteille->prix_saq = $request->input('prix_saq');
    $bouteille->format = $request->input('format');
    $bouteille->type = $request->input('type');
    $bouteille->save();
    return response()->json($bouteille);
});

// Suppression d'un bouteille
Route::delete('/bouteille/{id}', function ($id) {
    $bouteille = Bouteille::findOrFail($id);
    $bouteille->delete();
    return response()->json(['message' => 'bouteille supprimé avec succès']);
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