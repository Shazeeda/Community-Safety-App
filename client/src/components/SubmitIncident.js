import React, { useState } from "react";
import { api } from '../services/api';  
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';


const SubmitIncident = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ description, location }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Incident submitted successfully");
    } catch (error) {
      alert("Submission failed");
    }
  };

  return (
    <div>
      <h2>Submit Incident</h2>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitIncident;
