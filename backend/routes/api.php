<?php

use App\Models\Items;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::resource('items', 'ItemsController');

Route::get('/items', [ItemsController::class, 'index']);
Route::post('/items', [ItemsController::class, 'store']);
Route::get('/items/{id}', [ItemsController::class, 'show']);
Route::put('/items/{id}', [ItemsController::class, 'update']);
Route::delete('/items/{id}', [ItemsController::class, 'delete']);

Route::get('test', [AuthController::class, 'test']);
Route::post('register', [AuthController::class, 'register']);
