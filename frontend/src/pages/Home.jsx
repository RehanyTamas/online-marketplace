import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const fetchItems = () => {
  return fetch(`http://127.0.0.1:8000/api/items`).then((res) => res.json());
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchItems()
      .then((items) => {
        setLoading(false);
        setItems(items);
      });
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

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
              <th>Info</th>
              <th>Delete</th>
              <th />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <Link to={`/item/${item.id}`}>
                  <button type="button">Info</button>
                </Link>

                <td>
                  <button type="button" >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
