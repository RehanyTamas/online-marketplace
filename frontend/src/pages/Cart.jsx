import React, { useState, useEffect } from 'react';

const Cart = () => {

    const [items, setItems] = useState([]);

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
    </div>
);
};

export default Cart;