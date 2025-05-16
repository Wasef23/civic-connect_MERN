// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportIssue from "./pages/ReportIssue";
import AdminLogin from "./pages/AdminLogin";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AIAssistant from "./pages/AIAssistant";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AuthorityDashboard />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
