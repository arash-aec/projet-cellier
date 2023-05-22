<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Usager;
use App\Models\Type;
use App\Models\Pays;
use App\Models\Role;


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


// ------------------------------------------ Type
// Récupération d'un type avec son id
Route::get('/type/{id}', function ($id) {
    $type = Type::find($id);
    return response()->json($type);
});


// ------------------------------------------ Pays
// Récupération d'un pays avec son id
Route::get('/pays/{id}', function ($id) {
    $pays = Pays::find($id);
    return response()->json($pays);
});

// ------------------------------------------ Role
// Récupération d'un role avec son id
Route::get('/role/{id}', function ($id) {
    $role = Role::find($id);
    return response()->json($role);
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