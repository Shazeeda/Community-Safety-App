import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

const SubmitIncident = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API_URL}/incidents/submit`,
        { description, location },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
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
