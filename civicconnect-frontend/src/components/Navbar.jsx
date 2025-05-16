// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, admin, logout } = useContext(AuthContext);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">CivicConnect</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>

          {/* 🔹 AI Chatbot link - visible to everyone */}
          <Link to="/ai">Ask AI</Link>


          {/* 🔐 Logged-in Citizen */}
          {user && (
            <>
              <Link to="/report">Report Issue</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}

          {/* 🔐 Logged-in Admin */}
          {admin && (
            <>
              <Link to="/dashboard">Authority Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}

          {/* 🧑 Not Logged In */}
          {!user && !admin && (
            <>
              <Link to="/login">Citizen Login</Link>
              <Link to="/register">Citizen Register</Link>
              <Link to="/adminlogin">Admin Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
