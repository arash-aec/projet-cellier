<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usager;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Auth\Authenticatable;


class AuthController extends Controller
{
    //
    public function register(Request $request) {
        $fields = $request->validate([
            'nom' => 'required',
            'prenom'=> 'required',
            'courriel'=> 'required',
            'mot_de_passe' => 'required|confirmed',
            'role' => 'required',
        ]);

        $usager = Usager::create([
            'nom' => $fields['nom'],
            'prenom' => $fields['prenom'],
            'courriel' => $fields['courriel'],
            'mot_de_passe' => bcrypt($fields['mot_de_passe']),
            'role' => $fields['role']
        ]);
        

        $token = $usager->createToken('SOME_HASH')->plainTextToken;

        $response = [
            'usager' => $usager,
            'token' => $token
        ];

        return response($response, 200);
    }


    //login 
    public function login(Request $request) {
        $fields = $request->validate([
           
            'courriel'=> 'required',
            'mot_de_passe' => 'required',
        
        ]);

        $usager = Usager::where('courriel', $fields['courriel'])->first();

        if(is_null($usager)) {
            $response = [
                'msg' => 'usager Not Found'
                
            ];
            return response($response, 400);

        }

        //check password
        if(!Hash::check($fields['mot_de_passe'], $usager->mot_de_passe)) {
            $response = [
                'msg' => 'wrong password'
                
            ];
            return response($response, 400);

        }

        

        $token = $usager->createToken('SOME_HASH')->plainTextToken;

        $response = [
            'usager' => $usager,
            'token' => $token
        ];

        return response($response, 200);
    }


    public function profile(Request $request) {
        return $request->user();
    }




    public function logout(Request $request){
    auth()->user()->tokens()->delete();

    $response = [
        'msg' => 'Logged out successfully.'
    ];

    return response($response, 200);
}

}
