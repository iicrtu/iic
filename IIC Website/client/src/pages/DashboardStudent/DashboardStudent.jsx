import React, { useEffect, useState } from "react";

export default function DashboardStudent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Student Dashboard</h1>
      {user ? <p>Welcome, {user.name}</p> : <p>Loading...</p>}
    </div>
  );
}