import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api.js";

const RegisterLogin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
  
      alert(response.data.message); 
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed");
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default RegisterLogin;
