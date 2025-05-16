// src/pages/ReportIssue.jsx
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReportIssue.css";

export default function ReportIssue() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    phone: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/issues/report", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Issue reported successfully!");
      setForm({ title: "", description: "", category: "", phone: "" });
    } catch (error) {
      console.error("Issue reporting error:", error.response?.data || error.message);
      alert("Error reporting the issue. Please try again.");
    }
  };

  return (
    <div className="report-container">
      <h2>Report a Civic Issue</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        <label>Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Pothole">Pothole</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Garbage">Garbage</option>
          <option value="Street Light">Street Light</option>
        </select>

        <label>Phone Number</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          pattern="[0-9]{10}"
          placeholder="Enter 10-digit mobile number"
          required
        />

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}
