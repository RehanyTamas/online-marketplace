<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .invoice {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
        }
        .header {
            text-align: center;
        }
        .billing-details {
            margin-top: 20px;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .invoice-table th, .invoice-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .total {
            margin-top: 20px;
            text-align: right;
        }
    </style>
</head>
<body>
<div class="invoice">
    <div class="header">
        <h2>Invoice</h2>
        <p>Invoice Date: {{ now()->format('Y-m-d') }}</p>
    </div>

    <div class="billing-details">
        <h3>Billing Details</h3>
        <p>Name: {{ $customerName }}</p>
        <p>Email: {{ $customerEmail }}</p>
        <p>Address: {{ $customerAddress }}</p>
    </div>

    <table class="invoice-table">
        <thead>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        @foreach ($items as $item)
            <tr>
                <td>{{ $item['product'] }}</td>
                <td>{{ $item['price'] }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div class="total">
        <p><strong>Total:</strong> {{ $totalAmount }}</p>
    </div>
</div>
</body>
</html>
