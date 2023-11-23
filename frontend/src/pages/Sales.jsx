import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const fetchItems = (token) => {
    const out = 'Bearer ' +token;
    console.log(out)
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': out,
        }

    };
    return fetch('http://127.0.0.1:8000/api/itemsUserItems', requestOptions)
        .then(response => response.json())

};
/*const fetchItems = () => {
    return fetch(`http://127.0.0.1:8000/api/items`).then((res) => res.json());
};*/
const Sales = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('userToken'));

    },[])

    useEffect(() => {
        if(token != null){
            fetchItems(token)
                .then((items) => {
                    setLoading(false);
                    setItems(items);
                });
        }
    }, [token]);

    if (loading) {
        return <h1 className='text-blue-600'>Loading</h1>;
    }
    console.log(items);
    return (
        <div>
            <div className="max-w-screen-md mx-auto bg-white shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Item List</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
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
                                <Link to={`/sales/edititem/${item.id}`}>
                                    <button type="button">Edit</button>
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/sales/deleteitem/${item.id}`}>
                                    <button type="button">X</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <Link to={`/sales/newitem`}>
                                <button type="button">+ New</button>
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sales