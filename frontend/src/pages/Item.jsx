import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const fetchItem = (id) => {
  return fetch(`http://127.0.0.1:8000/api/item/${id}`).then((res) => res.json());
};

const Item = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);

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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy It
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

export default Item
