import React, { useEffect, useState } from "react";
import api from '../services/api';



const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await api.get('/incidents');

        if (!response || !Array.isArray(response)) {
          throw new Error("Unexpected response format");
        }

        setIncidents(response);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/incidents/${id}`);
      setIncidents((prevIncidents) => prevIncidents.filter(i => i.id !== id));
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  return (
    <div>
      <h2>Reported Incidents</h2>
      {loading ? (
        <p>Loading incidents...</p>
      ) : incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              {incident.description} - {incident.location}
              <button onClick={() => handleDelete(incident.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;
