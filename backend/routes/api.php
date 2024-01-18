<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\TransactionController;
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
//Route::resource('items', 'ItemsController');

Route::get('items', [ItemsController::class, 'index']);
Route::get('items/{id}', [ItemsController::class, 'show']);


Route::middleware('auth:sanctum')->get('/users', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
    //All secure URL's
    Route::get('itemsUserItems', [ItemsController::class, 'showUserItems']);
    Route::post('itemsUserItems', [ItemsController::class, 'store']);
    Route::put('itemsUserItems/{id}', [ItemsController::class, 'update']);
    Route::delete('itemsUserItems/{id}', [ItemsController::class, 'destroy']);
    Route::post('purchase', [TransactionController::class, 'purchase']);
    Route::get('itemsBought', [TransactionController::class, 'itemsInCart']);
    Route::post('purchase/invoice', [InvoiceController::class, 'makeInvoice']);
    Route::post('logout', [AuthController::class, 'logout']);
});

//Route::get('test', [AuthController::class, 'test']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
