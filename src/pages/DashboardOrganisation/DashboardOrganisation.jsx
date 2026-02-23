import React, { useEffect, useState } from "react";
import "./DashboardOrganisation.css";

const DashboardOrganisation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-organisation">
      <div className="dashboard-container">
        <h1>Welcome, {user.name}!</h1>
        <p>You are logged in as an organisation.</p>
        <div className="signup-message">
          <h2>🎉 Signup Successful!</h2>
          <p>Your organisation account has been created. Dashboard features coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrganisation;
