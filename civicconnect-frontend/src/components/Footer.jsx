// src/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        &copy; {new Date().getFullYear()} CivicConnect. All rights reserved.
      </div>
    </footer>
  );
}
