// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    navigate("/report");
  };

  return (
    <div className="login-container">
      <h2>Citizen Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <label>Password</label>
        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
