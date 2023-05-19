<?php

use App\Models\ListeCellier;
use App\Models\VinoBouteille;
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


Route::get('/listeCellier', function () {
    $listeCelliers = ListeCellier::with('bouteille')->get();
    return response()->json($listeCelliers);
});
