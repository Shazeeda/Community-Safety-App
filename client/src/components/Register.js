import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
      });

      alert(response.data.message);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
