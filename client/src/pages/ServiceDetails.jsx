import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = ({ apiUrl }) => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [newContrib, setNewContrib] = useState({ user_id: '', amount_due: '' });

  useEffect(() => {
    // FIX: Safely unwrap the single service object from an array if needed
    fetch(`${apiUrl}/services/${id}`)
      .then(res => res.json())
      .then(data => {
        const serviceObject = Array.isArray(data) ? data[0] : data;
        setService(serviceObject);
      })
      .catch(err => console.error("Error fetching service:", err));

    fetch(`${apiUrl}/contributions/service/${id}`)
      .then(res => res.json())
      .then(data => setContributions(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching contributions:", err));
  }, [id, apiUrl]);

  // Interaction: Toggle Paid Status smoothly with unified ID management
  const handleToggle = async (contribId, currentStatus) => {
    try {
      const response = await fetch(`${apiUrl}/contributions/${contribId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paid: !currentStatus })
      });
      
      if (!response.ok) throw new Error("Failed to update database record");
      
      const updatedData = await response.json();
      // FIX: Ensure payload object is unwrapped
      const updatedObj = Array.isArray(updatedData) ? updatedData[0] : updatedData;

      setContributions(prev => prev.map(c => {
        const currentId = c.contribution_id || c.id;
        if (currentId === contribId) {
          return { 
            ...c, 
            paid: updatedObj.paid 
          };
        }
        return c;
      }));
    } catch (err) {
      console.error("Toggle execution error:", err);
    }
  };

  const handleAddContributor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/contributions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newContrib, service_id: id })
      });
      
      if (response.ok) {
        const data = await response.json();
        // FIX: Extract single object to prevent appending nested arrays
        const newObj = Array.isArray(data) ? data[0] : data;
        
        setContributions(prev => [...prev, newObj]);
        setNewContrib({ user_id: '', amount_due: '' });
      }
    } catch (err) {
      console.error("Error adding contributor:", err);
    }
  };

  if (!service) return <p>Loading Service Details...</p>;

  return (
    <div className="container">
      <h2>{service.name} Management</h2>
      <div className="card">
        {/* FIX: Displays cleanly now that 'service' is an object, not an array wrapper */}
        <p>Total Monthly Cost: <strong>{service.monthly_cost}</strong></p>
      </div>

      <h3>Add Member Share</h3>
      <form onSubmit={handleAddContributor} className="card">
        <input 
          type="number" 
          placeholder="User ID (1 or 2)" 
          value={newContrib.user_id}
          required 
          onChange={e => setNewContrib({...newContrib, user_id: e.target.value})} 
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Amount Due" 
          value={newContrib.amount_due}
          required 
          onChange={e => setNewContrib({...newContrib, amount_due: e.target.value})} 
        />
        <button type="submit" className="btn btn-primary">Add Contributor</button>
      </form>

      <h3>Contribution Status</h3>
      {contributions.length === 0 ? <p>No contributors added yet.</p> : (
        contributions.map(c => {
          // FIX: Calculate a robust local key fall-back strategy
          const targetId = c.contribution_id || c.id;
          
          return (
            <div key={targetId} className="card">
              <span>{c.username || `User ${c.user_id}`}: <strong>{c.amount_due}</strong></span>
              <button 
                onClick={() => handleToggle(targetId, c.paid)} 
                className={`btn ${c.paid ? 'btn-paid' : 'btn-unpaid'}`}
              >
                {c.paid ? '✅ Paid' : 'Mark as Paid'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ServiceDetails;