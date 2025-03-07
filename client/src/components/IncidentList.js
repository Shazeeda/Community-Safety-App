import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

const fetchIncidents = async () => {
  return [
    { id: 1, description: "Suspicious activity near park" },
    { id: 2, description: "Missing cell phone" },
  ];
};

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/incidents`)
      .then((response) => setIncidents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/incidents/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() =>
        setIncidents(incidents.filter((incident) => incident.id !== id))
      )
      .catch((error) => alert("Not authorized to delete this incident"));
  };

  return (
    <div>
      <h2>Reported Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            {incident.description} - {incident.location}
            <button onClick={() => handleDelete(incident.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const deleteIncident = (id) => {
  axios
    .delete(`${API_URL}/incidents/${id}`)
    .then(() => {
      alert("Incident deleted successfully");
      window.location.reload();
    })
    .catch((error) => console.error(error));
};

export default IncidentList;
