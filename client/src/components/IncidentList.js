import React, { useEffect, useState } from "react";
import { api } from './services/api'; 

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/incidents`)
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}/incidents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(() => setIncidents(incidents.filter((incident) => incident.id !== id)))
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

export default IncidentList;
