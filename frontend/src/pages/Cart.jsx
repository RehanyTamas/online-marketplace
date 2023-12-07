import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [items, setItems] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');

        //console.log('User Token from Local Storage:', userToken);

        if (userToken) {
            //console.log('Token set:', userToken);
            fetchItemsBought(userToken);
        } else {
            //console.error('User token not found in local storage');
        }
    }, []);

    function fetchItemsBought(token) {
        const out = 'Bearer ' + token;
        console.log('Authorization Header:', out);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': out,
            },
        };

        fetch('http://127.0.0.1:8000/api/itemsBought', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data);
                setItems(data);
            })
            .catch(err => console.error(err));
    }

    const handleInvoice = (event) => {
        event.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const out = 'Bearer ' + userToken;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': out },
            body: JSON.stringify({
                legalName: legalName,
                deliveryAddress: address,
                paymentOption: paymentOption,
                creditCard: creditCard,
                expirationDate: expirationDate,
                cvv:cvv,
                items:items,
            })
        };

        fetch('http://127.0.0.1:8000/api/purchase/invoice', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob();
            })
            .then(data => {
                setTimeout(() => {
                    let downloadUrl = window.URL.createObjectURL(data);
                    let a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = "invoice.pdf";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a); // Cleanup
                    window.URL.revokeObjectURL(downloadUrl); // Cleanup
                    navigate('/')
                }, 1500);
            })
            .catch(error => {
                setTimeout(() => {
                }, 2500);
            })

    };

    const [legalName, setLegalName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentOption, setPaymentOption] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        // Enable or disable the submit button based on the category selection
        setIsSubmitDisabled(paymentOption === '' || (paymentOption === 'card' && (!creditCard || !expirationDate || !cvv)) || !legalName || !address);
    }, [paymentOption, creditCard, expirationDate, cvv, address, legalName]);

return (
    <div>
        <div className="max-w-screen-md mx-auto bg-white shadow-md p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Your cart</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th />
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Add Item</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleInvoice(e); }}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        className="block border border-grey-light w-1/3 p-3 rounded mb-4"
                        placeholder="Name"
                        type="name"
                        id="name"
                        name="name"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Delivery Address</label>
                    <input
                        className="block border border-grey-light w-1/3 p-3 rounded mb-4"
                        placeholder="Address"
                        type="address"
                        id="address"
                        name="address"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 w-1/3">
                    <label className="block text-sm font-medium text-gray-600 w-1/3">Category</label>
                    <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full">
                        <option value="">Select a payment method</option>
                        <option value="cash">Collect on delivery</option>
                        <option value="card">Online</option>
                    </select>
                </div>
                {paymentOption === 'card' && (
                    <div>
                        <div className="mb-4 w-1/3">
                            <label className="block text-sm font-medium text-gray-600">Credit Card</label>
                            <input type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label className="block text-sm font-medium text-gray-600">Expiration Date</label>
                            <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label className="block text-sm font-medium text-gray-600">CVV</label>
                            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                        </div>
                    </div>
                )}
                <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitDisabled}>Print Invoice</button>
            </form>
        </div>
    </div>
);
};

export default Cart;