import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Create this file for custom styles

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    quantity: 1,
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/api/items');
    setItems(res.data);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/items/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/items', form);
    }
    setForm({ name: '', description: '', quantity: 1, status: 'Active' });
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
  <div className="container">
    <div className="content">
      <h1>MERN CRUD App</h1>

      <div className="form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Item Name" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button onClick={handleSubmit}>{editingId ? "Update" : "Add"} Item</button>
      </div>

      <ul className="item-list">
        {items.map(item => (
          <li key={item._id} className="item">
            <div>
              <strong>{item.name}</strong> – {item.description} (Qty: {item.quantity}) [{item.status}]
            </div>
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default App;
