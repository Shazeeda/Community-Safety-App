import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

const Incident = () => {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingIncidentId, setEditingIncidentId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/incidents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncidents(response.data);
    } catch (err) {
      console.error("Error fetching incidents:", err);
      setError("Failed to fetch incidents.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const incidentData = { title, description, location, date };

      if (editMode) {
        await axios.put(
          `${API_URL}/incidents/${editingIncidentId}`,
          incidentData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(`${API_URL}/incidents`, incidentData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      resetForm();
      fetchIncidents();
    } catch (err) {
      console.error("Error submitting incident:", err);
      setError("Failed to submit incident.");
    }
  };

  const deleteIncident = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized - No token provided");
      }

      const response = await fetch(`${API_URL}/incidents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete incident.");
      }

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      console.error("Error deleting incident:", error);
      alert(error.message);
    }
  };

  const handleEdit = (incident) => {
    setTitle(incident.title);
    setDescription(incident.description);
    setLocation(incident.location);
    setDate(incident.date);
    setEditMode(true);
    setEditingIncidentId(incident._id);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setEditMode(false);
    setEditingIncidentId(null);
  };

  return (
    <div>
      <h2>{editMode ? "Edit Incident" : "Report an Incident"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editMode ? "Update" : "Submit"}</button>
        {editMode && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Reported Incidents</h2>
      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              <strong>{incident.title}</strong> - {incident.location} (
              {incident.date})<p>{incident.description}</p>
              <button onClick={() => deleteIncident(incident.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Incident;
