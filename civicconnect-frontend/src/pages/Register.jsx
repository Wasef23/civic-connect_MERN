// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="register-container">
      <h2>Citizen Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
