import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddService = ({ apiUrl }) => {
  const [formData, setFormData] = useState({ name: '', monthly_cost: '', owner_id: 1 });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${apiUrl}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    navigate('/');
  };

  return (
    <div>
      <h2>Add New Subscription</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Service Name (e.g. Netflix)" required 
          onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="number" step="0.01" placeholder="Monthly Cost" required 
          onChange={e => setFormData({...formData, monthly_cost: e.target.value})} />
        <button type="submit" className="btn btn-primary">Create Service</button>
      </form>
    </div>
  );
};

export default AddService;