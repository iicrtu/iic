import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const RequireAdmin = ({ children }) => {
  const [status, setStatus] = useState("loading"); // loading | authed | denied

  useEffect(() => {
    fetch(`${API}/api/admin/verify`, { credentials: "include" })
      .then((res) => setStatus(res.ok ? "authed" : "denied"))
      .catch(() => setStatus("denied"));
  }, []);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 80px)" }}>
        <p style={{ fontFamily: "Roboto, sans-serif", fontSize: 15, color: "rgba(0,0,0,0.5)" }}>Verifying…</p>
      </div>
    );
  }

  if (status === "denied") return <Navigate to="/admin" replace />;

  return children;
};

export default RequireAdmin;
