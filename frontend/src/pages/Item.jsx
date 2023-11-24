import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from 'react-router-dom';

const fetchItem = (id) => {
  return fetch(`http://127.0.0.1:8000/api/items/${id}`).then((res) => res.json());
};

const Item = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  //const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchItem(id)
      .then((item) => {
        setLoading(false);
        setItem(item);
      });
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

    const handleAddToCart = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("userToken");
        console.log('Token:', token);
        console.log('itemId:', item.id);

        if (!token) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemIds: [item.id] }) // Sending item ID directly without an array
        };

        fetch('http://127.0.0.1:8000/api/purchase', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item to the cart');
                }
                return response.json();
            })
            .then(data => {

                setTimeout(() => {
                    navigate('/')
                    window.location.reload();
                }, 1500);
            })
            .catch(error => {
                setError('Failed to add item to the cart');
                console.error('Error:', error);
            });
    };



  return (
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
        <div className="text-center">
          <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="text-center">
        <Link to={`/`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to the Main Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Item;
