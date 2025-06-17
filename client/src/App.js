import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import RegisterLogin from "./components/RegisterLogin";
import IncidentList from "./components/IncidentList";
import SubmitIncident from "./components/SubmitIncident";
import Header from "./components/header";
import Dashboard from "./pages/Dashboard";
import ChatAssistant from "./components/ChatAssistant";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/login" element={<RegisterLogin />} />
          <Route path="/incidents" element={<IncidentList />} />
          <Route path="/submit" element={<SubmitIncident />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatAssistant />} />
        </Routes>
      </main>
    </>
  );
}


export default App;
