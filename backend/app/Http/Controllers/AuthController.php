<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function test(){
        return 'test';
    }

    public function register(RegisterRequest $request){

        $hashPassword = Hash::make($request->input("password"));

        $user = User::create([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => $hashPassword,
        ]);


        return \response($user,Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Bad creds',
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 200);

    }

    public function  logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => "Logged out",
        ];
    }

}
