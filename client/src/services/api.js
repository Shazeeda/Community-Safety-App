import React, { useState } from "react";
import RegisterLogin from "../components/RegisterLogin";
import SubmitIncident from "../components/SubmitIncident";
import IncidentList from "../components/IncidentList";


const API_URL = 'http://localhost:3001';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  export const api = {
    get: async (endpoint) => {
      const res = await fetch(`${API_URL}${endpoint}`);
      return res.json();
    },
    post: async (endpoint, data) => {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    delete: async (endpoint) => {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      return res.json();
    },
    
  };
  
  export default api;
