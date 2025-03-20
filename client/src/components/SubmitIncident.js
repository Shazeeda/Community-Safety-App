import React, { useState } from "react";
// import { api } from "../services/api";

const API_URL = "http://localhost:3000";

const SubmitIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You need to be logged in to submit an incident.");
        return;
      }

      const response = await fetch(`${API_URL}/incidents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, location, date }),
      });

      const data = await response.json();

      if (response.status === 403) {
        setError("Invalid token. Please log in again.");
        localStorage.removeItem("token");
        return;
      }

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
