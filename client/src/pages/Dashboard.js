import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

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

  
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Session expired. Please log in again.");
      return null;
    }
    return token;
  };

  
  useEffect(() => {
    const fetchIncidents = async () => {
      const token = getToken();
      if (!token) {
        navigate("/login"); 
        return;
      }

      try {
        const response = await fetch(`${API_URL}/incidents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIncidents(data);
        } else if (response.status === 401 || response.status === 403) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token"); 
          navigate("/login");
        } else {
          throw new Error("Failed to fetch incidents.");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchIncidents();
  }, [navigate]);

  
  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/incidents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(incident),
      });

      if (response.ok) {
        const data = await response.json();
        setIncidents([...incidents, data]); 
        setIncident({ title: "", description: "", location: "", date: "" });
      } else if (response.status === 401 || response.status === 403) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        throw new Error("Failed to submit incident.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={incident.title}
          onChange={handleChange}
          placeholder="Incident Title"
          required
        />
        <textarea
          name="description"
          value={incident.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="location"
          value={incident.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="date"
          name="date"
          value={incident.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Incident</button>
      </form>

      <h2>Reported Incidents</h2>
      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul>
          {incidents.map((inc) => (
            <li key={inc.id || inc.title + inc.date}>
              <strong>{inc.title}</strong> - {inc.location} ({inc.date})
              <p>{inc.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
