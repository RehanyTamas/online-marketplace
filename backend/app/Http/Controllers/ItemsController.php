<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Items;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Items::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $itemData = $request->all();
        $itemData['id_user'] = $user->getKey();

        $item = Items::create($itemData);

        return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return Items::find($id);
    }

    public function showUserItems()
    {
        $user = Auth::user();

        $userId = $user->getKey();

        $items = Items::where("id_user", $userId)->get();

        return $items;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $user = Auth::user();

        $userId = $user->getKey();

        $item = Items::find($id);

        if($item["id_user"] == $userId) {
            $item->update($request->all());

        return $item;
        } else {
            return response()->json(["error" => "this item doesnt belong to this user"], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();

        $userId = $user->getKey();

        $item = Items::find($id);

        if($item["id_user"] == $userId) {
            return Items::destroy($id);
        } else {
            return response()->json(["error" => "this item doesnt belong to this user"], 403);
        }
    }

}
