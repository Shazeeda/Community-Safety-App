import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
import Register from './components/Register';
import RegisterLogin from './components/RegisterLogin';
import IncidentList from './components/IncidentList';
import SubmitIncident from './components/SubmitIncident';
import Header from './components/header';
import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    
    <BrowserRouter>
    <Header/>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/incidents" element={<IncidentList />} />
        <Route path="/submit" element={<SubmitIncident />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
