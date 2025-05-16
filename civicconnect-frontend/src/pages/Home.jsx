// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import civicImage1 from "../assets/civic1.jpg";
import civicImage2 from "../assets/civic2.jpg";
import civicImage3 from "../assets/civic3.jpg";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to CivicConnect</h1>
        <p>
          Empowering citizens to report civic issues and enabling local authorities to respond quickly and efficiently.
        </p>
      </header>
      
      <section className="home-gallery">
        <img src={civicImage1} alt="Civic Issue 1" />
        <img src={civicImage2} alt="Civic Issue 2" />
        <img src={civicImage3} alt="Civic Issue 3" />
      </section>
      
      <section className="home-info">
        <h2>About CivicConnect</h2>
        <p>
          CivicConnect is a platform designed to bridge the gap between citizens and local authorities.
          Whether it's reporting potholes, water leakage, or malfunctioning streetlights, our platform
          ensures every issue is logged, tracked, and resolved efficiently.
        </p>
        <div className="home-links">
          <Link to="/register" className="btn btn-primary">Citizen Register</Link>
          <Link to="/login" className="btn btn-secondary">Citizen Login</Link>
          <Link to="/adminlogin" className="btn btn-tertiary">Admin Login</Link>
        </div>
      </section>
      
      <section className="home-contact">
        <h2>Contact Information</h2>
        <p>
          For further information or assistance, please contact:
        </p>
        <ul>
          <li><strong>Email:</strong> support@civicconnect.gov</li>
          <li><strong>Phone:</strong> +91 (555) 123-4567</li>
          <li><strong>Address:</strong> 123 Civic sajjit er gor er pase Plaza, Capital City, Country</li>
        </ul>
      </section>
    </div>
  );
}
