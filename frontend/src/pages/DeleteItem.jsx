import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import {BiSolidErrorCircle} from "react-icons/bi";

const fetchItem = (id) => {
    return fetch(`http://127.0.0.1:8000/api/items/${id}`).then((res) => res.json());
};

const DeleteItem = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
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
            });
    }, []);

    const HandleDeleteItem = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' +token,
                'Content-Type': 'application/json'
            }
        };

        fetch('http://127.0.0.1:8000/api/itemsUserItems/'  + id, requestOptions)
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
        <div className="">
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

            <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
                <img className="w-full" src="https://via.placeholder.com/350x200" alt="Placeholder" />
                <div className="px-6 py-4">
                    <div className="font-bold text-center text-orange-400 text-xl mb-2">{item.name}</div>
                    <p className="text-center text-orange-400 text-base">
                        {item.description}
                    </p>
                </div>
                <div className="columns-2 px-6 py-4">
                    <div className="font-bold text-orange-500 text-xl text-center mb-2">${item.price}</div>

                </div>
                <div className="text-center">
                    <div className="font-bold text-orange-500 text-xl text-center mb-2">
                        <span>Are your sure you want to delete this item from your catalogue?</span>
                    </div>
                    <div className="text-center">
                        <button onClick={HandleDeleteItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Yes
                        </button>
                        <Link to={'/sales'}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                No
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem
