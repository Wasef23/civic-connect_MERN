// src/pages/AdminLogin.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminLogin(formData);
    navigate("/dashboard");
  };

  return (
    <div className="adminlogin-container">
      <h2>Administrator Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <label>Password</label>
        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
}
