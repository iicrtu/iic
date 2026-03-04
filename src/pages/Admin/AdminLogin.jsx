import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./AdminLogin.css";

const API = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast.error(data.error || "Invalid password");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1 className="admin-login-title">Admin Panel</h1>
        <p className="admin-login-subtitle">Enter the admin password to continue.</p>

        <input
          type="password"
          className="admin-login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          disabled={loading}
        />

        <button type="submit" className="admin-login-btn" disabled={!password.trim() || loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
