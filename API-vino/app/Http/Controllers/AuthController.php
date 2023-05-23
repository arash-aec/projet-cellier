<?php

namespace App\Http\Controllers;
use App\Models\Usager;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('courriel', 'mot_de_passe');

        /*
        if (Auth::attempt($credentials)) {
            // Authentication passed, return the authenticated user
            return response()->json(Auth::user());
        }

*/
        if (Auth::guard('vino')->attempt($credentials)) {
            // Authentication passed, return the authenticated user
            return response()->json(Auth::guard('vino')->user());
        }


        // Authentication failed, return an error response
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
