// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // Citizen user info
  const [admin, setAdmin] = useState(null); // Admin info
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const register = async (userData) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", userData);
      alert("Registration successful! Please login.");
    } catch (err) {
      alert("Registration failed.");
      console.error(err);
    }
  };

  const login = async (userData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", userData);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  };

  const adminLogin = async (adminData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/adminlogin", adminData);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setAdmin(res.data.admin);
    } catch (err) {
      alert("Admin Login failed.");
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setAdmin(null);
  };

  

  return (
    <AuthContext.Provider value={{ user, admin, token, register, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
