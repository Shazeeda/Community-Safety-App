import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Signup from './components/Signup';
import Login from './components/Login';
import IncidentList from './components/IncidentList';
import SubmitIncident from './components/SubmitIncident';
import Header from './components/header';

function App() {
  return (
    
    <BrowserRouter>
    <Header/>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/incidents" element={<IncidentList />} />
        <Route path="/submit" element={<SubmitIncident />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
