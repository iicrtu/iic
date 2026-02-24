import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const existingRole = searchParams.get("existing_role");
    
    if (errorParam === "invalid_student_email") {
      setError("⚠️ Students must use their RTU email (@rtu.ac.in) to sign in.");
    } else if (errorParam === "role_conflict") {
      const roleText = existingRole === "student" ? "Student" : "Organisation";
      setError(`⚠️ This account is already registered as ${roleText}. Please login with the same role.`);
    }
  }, [searchParams]);

  const handleContinue = async () => {
    if (!role) return;

    setLoading(true);
    setError("");

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      // Ignore logout errors during login
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
            onClick={() => {
              setRole("student");
              setError("");
            }}
            disabled={loading}
          >
            I'm a Student
            <span className="role-hint">Apply for internships (RTU email required)</span>
          </button>

          <button
            type="button"
            className={`role-btn ${role === "organisation" ? "active" : ""}`}
            onClick={() => {
              setRole("organisation");
              setError("");
            }}
            disabled={loading}
          >
            I'm an Organisation
            <span className="role-hint">Post internships & hire</span>
          </button>
        </div>

        {role === "student" && !loading && (
          <div className="student-warning">
            <strong>✓ RTU Students:</strong> Google will only show your RTU email (@rtu.ac.in) for login.
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

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
