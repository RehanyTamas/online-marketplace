import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import {BiSolidErrorCircle} from "react-icons/bi";

const fetchItem = (id) => {
    return fetch(`http://127.0.0.1:8000/api/items/${id}`).then((res) => res.json());
};

const EditItem = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errorVisibility, setErrorVisibility] = useState('invisible')
    const [successVisibility, setSuccessVisibility] = useState('invisible')

    const [token,setToken] = useState(null);
    useEffect(() =>{
        setToken( localStorage.getItem('userToken'));
    },[token])

    useEffect(() => {
        fetchItem(id)
            .then((item) => {
                setLoading(false);
                setItem(item);
                setItemName(item.name);
                setDescription(item.description);
                setPrice(item.price);
            });
    }, []);


    const HandleEditItem = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' +token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: itemName, description: description, price:price })
        };

        fetch('http://127.0.0.1:8000/api/itemsUserItems/' + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setSuccessVisibility('visible');
                setTimeout(() => {
                    setSuccessVisibility('invisible');
                    navigate('/sales')
                    window.location.reload();
                }, 1500);
            })
            .catch(error => {
                setErrorVisibility('visible')
                setTimeout(() => {
                    setErrorVisibility('invisible')
                }, 2500);
            })

    };

    if (loading) {
        return <h1>Loading</h1>;
    }

    return (
        <div className=''>
            <div className={`absolute inset-0 flex items-center justify-center bottom-96 -top-64 ${errorVisibility}`}>
                <div className=' bg-red-400 w-1/3 p-4 rounded-xl ' >
                    <p className='text-white flex items-center flex  justify-center  gap-2'><BiSolidErrorCircle /> Something went wrong, try again.</p>
                </div>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center bottom-96 -top-64 ${successVisibility}`}>
                <div className=' bg-green-400 w-1/3 p-4 rounded-xl ' >
                    <p className='text-white flex items-center flex  justify-center  gap-2'><BiSolidErrorCircle /> Success</p>
                </div>
            </div>

            <form class="bg-grey-lighter min-h-screen flex flex-col" onSubmit={HandleEditItem}>
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Edit Item</h1>
                        <input
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Name"
                            id="itemName"
                            name="itemName"
                            value= {itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Description"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="price"
                            placeholder="Price"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            class="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1">Edit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditItem
