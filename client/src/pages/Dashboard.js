import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import Incident from "../components/Incident";

const Dashboard = () => {
  const navigate = useNavigate();
  const [incident, setIncident] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/incidents`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (editMode) {
        await axios.put(`${API_URL}/incidents/${editId}`, incident, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIncidents(
          incidents.map((inc) =>
            inc.id === editId ? { ...inc, ...incident } : inc
          )
        );

        setEditMode(false);
        setEditId(null);
        alert("Incident updated successfully!");
      } else {
        const response = await axios.post(`${API_URL}/incidents`, incident, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIncidents([response.data, ...incidents]);
        alert("Incident reported successfully!");
      }

      setIncident({ title: "", description: "", location: "", date: "" });
    } catch (error) {
      setError(error.response?.data?.error || "Failed to report incident.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this incident?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/incidents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIncidents(incidents.filter((inc) => inc.id !== id));
      alert("Incident deleted successfully!");
    } catch (error) {
      console.error("Error deleting incident:", error);
      setError("Failed to delete incident.");
    }
  };

  const handleEdit = (incident) => {
    setIncident(incident);
    setEditMode(true);
    setEditId(incident.id);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{editMode ? "Edit Incident" : "Report an Incident"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={incident.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={incident.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={incident.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={incident.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {editMode ? "Update Incident" : "Submit Incident"}
        </button>
      </form>

      <h2>Your Reported Incidents</h2>
      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul>
          {incidents.map((inc) => (
            <li key={inc.id}>
              <strong>{inc.title}</strong> - {inc.location} ({inc.date})
              <p>{inc.description}</p>
              <button onClick={() => handleEdit(inc)}>Edit</button>
              <button onClick={() => handleDelete(inc.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
