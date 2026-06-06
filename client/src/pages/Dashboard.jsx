import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ apiUrl }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/services`)
      .then(res => res.json())
      .then(data => setServices(data));
  }, [apiUrl]);

  return (
    <div>
      <h2>Your Tribe's Services</h2>
      {services.length === 0 ? <p>No services shared yet. Add one!</p> : (
        services.map(service => (
          <div key={service.id} className="card">
            <div>
              <h3>{service.name}</h3>
              <p>Cost: {service.monthly_cost} / month</p>
            </div>
            <Link to={`/service/${service.id}`} className="btn btn-secondary">View Shares</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;