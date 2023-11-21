<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Items;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{

        public function store(int $id)
    {
        $transactionData = [];

        $user = Auth::user();
        $transactionData['id_buyer'] = $user['id']; //or getKey()

        $item = Items::find($id);
        $transactionData['name'] = $item->name;
        $transactionData['description'] = $item->description;
        $transactionData['price'] = $item->price;
        $transactionData['id_seller'] = $item->id_user;

        $transactionItem = Transaction::create($transactionData);

        if($transactionItem && $item->id_user !== $user['id']){
            Items::destroy($id);
            return response()->json($transactionItem);
        } else {
            return response()->json(["error" => "Something went wrong with the transaction"], 500);
        }
    }

}
