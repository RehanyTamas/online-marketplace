<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{

        public function purchase(Request $request)
    {
        $requestData =  $request->json()->all();

        if (isset($requestData['itemIds']) && is_array($requestData['itemIds'])) {
            foreach ($requestData['itemIds'] as $itemId){
                $item = Items::find($itemId);
                $user = Auth::user();
            if($item->id_user !== $user['id'])
            {
                $transactionData = [];

                $transactionData['id_buyer'] = $user['id']; //or getKey()

                $transactionData['name'] = $item->name;
                $transactionData['description'] = $item->description;
                $transactionData['price'] = $item->price;
                $transactionData['id_seller'] = $item->id_user;

                $transactionItem = Transaction::create($transactionData);

                Items::destroy($itemId);
            }
            }
                return response()->json(["message" => "Successful purchase."]);
        }
        return response()->json(["error" => "Something went wrong!", 500]);
    }

    public function itemsInCart()
    {
        $user = Auth::user();


        $transactions = $user->purchasedTransactions;

        /*$itemsBought = [];

        foreach ($transactions as $transaction) {
            $itemsBought[] = $transaction->item;
        }*/

        return $transactions;

    }

}
