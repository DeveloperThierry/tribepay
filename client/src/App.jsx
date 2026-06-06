import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddService from './pages/AddService';
import ServiceDetails from './pages/ServiceDetails';
import './App.css';

const baseUrl = import.meta.env.VITE_API_URL || '';
const API_URL = baseUrl + '/api';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <h1>TribePay 💸</h1>
          <div>
            <Link to="/" className="btn btn-secondary" style={{marginRight: '10px'}}>Dashboard</Link>
            <Link to="/add" className="btn btn-primary">+ Add Service</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard apiUrl={API_URL} />} />
          <Route path="/add" element={<AddService apiUrl={API_URL} />} />
          <Route path="/service/:id" element={<ServiceDetails apiUrl={API_URL} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
