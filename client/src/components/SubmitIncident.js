import React, { useState } from "react";

const API_URL = "http://localhost:8000"; 

const SubmitIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      const token = "securetoken123"; 

      const response = await fetch(`${API_URL}/incident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, location, date }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Incident submitted successfully!");

      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Submit Incident</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitIncident;
