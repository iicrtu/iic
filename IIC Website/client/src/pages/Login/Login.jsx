import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!role) return;

    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
    }

    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google?role=${role}`;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Please select how you want to continue.
        </p>

        <div className="role-options">
          <button
            type="button"
            className={`role-btn ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
            disabled={loading}
          >
            I’m a Student
            <span className="role-hint">Apply for internships</span>
          </button>

          <button
            type="button"
            className={`role-btn ${role === "organisation" ? "active" : ""}`}
            onClick={() => setRole("organisation")}
            disabled={loading}
          >
            I’m an Organisation
            <span className="role-hint">Post internships & hire</span>
          </button>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={handleContinue}
          disabled={!role || loading}
        >
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>

        {!role && !loading && (
          <p className="login-note">Select Student or Organisation to continue.</p>
        )}
      </div>
    </div>
  );
};

export default Login;