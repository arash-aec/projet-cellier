<?php

use App\Models\ListeCellier;
use App\Models\Cellier;
use App\Models\Bouteille;
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



// Cellier 
Route::get('/celliers', function () {
    $celliers = Cellier::get();
    return response()->json($celliers);
});
Route::get('/cellier/{id}', function ($id) {
    $cellier = Cellier::find($id);
    return response()->json($cellier);
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