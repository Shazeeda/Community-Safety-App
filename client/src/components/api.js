import React, { useState } from "react";
import RegisterLogin from "./RegisterLogin";
import SubmitIncident from "../src/src/SubmitIncident";
import IncidentList from "./IncidentList";

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
