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
      <div className="ProductsTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>
              
                <button type="button">Update</button>
              
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
