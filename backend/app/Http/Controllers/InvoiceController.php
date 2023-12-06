<?php

namespace App\Http\Controllers;

use App\Models\Items;
use Barryvdh\Snappy\Facades\SnappyPdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function makeInvoice(Request $request): Response
    {

        //Get data form request
        $requestData =  $request->json()->all();

        //Fill customer data to array
        $user = Auth::user();

        $customerName = $user['username'];
        $customerEmail = $user['email'];
        $customerAddress = $requestData['deliveryAddress'];

        //Fill item data
        $items = [];
        if (isset($requestData['itemIds']) && is_array($requestData['itemIds'])) {
            foreach ($requestData['itemIds'] as $itemId) {
                $item = Items::find($itemId);
                $items[] = ['product' => $item['name'], 'price' => $item['price']];
            }
        }
        //Calculate total cost
            $totalAmount = array_sum(array_column($items, 'price'));


        //Compile data
            $data = [
                'customerName' => $customerName,
                'customerEmail' => $customerEmail,
                'customerAddress' => $customerAddress,
                'items' => $items,
                'totalAmount' => $totalAmount,
            ];

        $html = view('invoice', $data)->render();

        // Generate PDF
        $pdf = SnappyPDF::loadHTML($html);

        // Download the PDF
        return $pdf->download('invoice.pdf');

    }
}
