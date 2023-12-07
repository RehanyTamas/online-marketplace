<?php

namespace App\Http\Controllers;

use App\Models\Items;
use Barryvdh\Snappy\Facades\SnappyPdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
//use Knp\Snappy\Pdf;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function makeInvoice(Request $request): Response
    {
        $user = Auth::user();
        if($user){

            //Get data form request
            $requestData =  $request->json()->all();

            //Fill customer data to array


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
            //$html = view('invoice', $data)->render();
            //$pdf = SnappyPDF::loadHTML($html);

            //$pdf->download('invoice.pdf');

            // Download the PDF
            /*$pdf = SnappyPDF::loadView('invoice', $data);
            return $pdf->download('invoice.pdf');*/

           /* $html = View::make('invoice',$data)->render();
            $pdf = SnappyPDF::loadHTML($html);*/



            $pdf = Pdf::loadView('invoice', $data);
            return $pdf->download('invoice.pdf');

            //return $pdf->download('invoice.pdf');

            //return response(['message' => 'OK']);
        }

        return response([
            'message' => 'Bad creds',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_UNAUTHORIZED);
    }
}
