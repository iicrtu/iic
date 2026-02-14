import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function RequireOrgOnboarding({ children }) {
  const [state, setState] = useState({ loading: true, allowed: false });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/org-profile/me`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Unauthorized");

        setState({
          loading: false,
          allowed: Boolean(data.orgProfileCompleted),
        });
      } catch {
        setState({ loading: false, allowed: false });
      }
    })();
  }, []);

  if (state.loading) return <div style={{ padding: 20 }}>Loading…</div>;

  if (!state.allowed) return <Navigate to="/onboarding/organisation" replace />;

  return children;
}