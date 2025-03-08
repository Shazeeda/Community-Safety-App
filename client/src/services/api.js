import React, { useState } from "react";
import RegisterLogin from "../components/RegisterLogin";
import SubmitIncident from "../src/src/SubmitIncident";
import IncidentList from "../components/IncidentList";
import { api } from './services/api';

const API_URL = 'http://localhost:3001';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div>
      <h1>Community Safety App</h1>
      {!token ? (
        <RegisterLogin setToken={setToken} />
      ) : (
        <>
          <SubmitIncident />
          <IncidentList />
        </>
      )}
    </div>
  );
};

export default App;
