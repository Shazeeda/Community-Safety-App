import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
  return (
    <header>
      <h1>Community Safety App</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/report">Report Incident</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;




























