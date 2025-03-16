import React, { useState } from "react";
import { api } from "../services/api";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const SubmitIncident = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/incidents/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.status === 403) {
        alert("You need to be logged in to submit an incident.");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Incident submitted successfully!");
    } catch (error) {
      alert(error.message);
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
