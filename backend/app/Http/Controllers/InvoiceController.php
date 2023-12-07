<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function makeInvoice(Request $request): Response
    {
        $user = Auth::user();
        if($user){

            //Get data form request
            $requestData =  $request->json()->all();

            $customerName = $requestData['legalName'];
            $customerEmail = $user['email'] ;
            $customerAddress = $requestData['deliveryAddress'];

            //Fill item data
            $items = [];
            if (isset($requestData['items']) && is_array($requestData['items'])) {
                foreach ($requestData['items'] as $item) {
                    $items[] = ['product' => $item['name'], 'price' => $item['price']];
                }
            }

            //Calculate total cost
            $paymentOption = $requestData['paymentOption'];
            $totalAmount = array_sum(array_column($items, 'price'));

            //Compile data
            $data = [
                'customerName' => $customerName,
                'customerEmail' => $customerEmail,
                'customerAddress' => $customerAddress,
                'items' => $items,
                'paymentOption' => $paymentOption,
                'totalAmount' => $totalAmount,
            ];

            // Generate PDF
            $pdf = Pdf::loadView('invoice', $data);
            return $pdf->download('invoice.pdf');
        }

        return response([
            'message' => 'Bad creds',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_UNAUTHORIZED);
    }
}
