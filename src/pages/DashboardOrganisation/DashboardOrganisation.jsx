import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardOrganisation.css";

const DashboardOrganisation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: "include",
          cache: "no-cache", // Disable caching
        });

        if (!userResponse.ok) {
          window.location.href = "/login";
          return;
        }

        const userData = await userResponse.json();
        setUser(userData.user);

        // Fetch organization data
        const orgResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/organization/profile`,
          {
            credentials: "include",
            cache: "no-cache", // Disable caching
          }
        );

        if (orgResponse.ok) {
          const orgData = await orgResponse.json();
          setOrganization(orgData.organization);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = () => {
    navigate("/onboarding/organisation");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!organization || !organization.onboardingCompleted) {
    return (
      <div className="dashboard-organisation">
        <div className="dashboard-container">
          <h1>Welcome, {user?.name}!</h1>
          <div className="incomplete-profile">
            <h2>📋 Complete Your Profile</h2>
            <p>Please complete your organization profile to get started.</p>
            <button className="complete-btn" onClick={() => navigate("/onboarding/organisation")}>
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-organisation">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Organization Dashboard</h1>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>

        {/* Organization Details Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Organization Details</h2>
          </div>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Organization Name</label>
              <p>{organization.organizationName}</p>
            </div>
            <div className="profile-item">
              <label>Industry</label>
              <p>{organization.industry}</p>
            </div>
            {organization.teamSize && (
              <div className="profile-item">
                <label>Team Size</label>
                <p>{organization.teamSize}</p>
              </div>
            )}
            {organization.website && (
              <div className="profile-item">
                <label>Website</label>
                <p>
                  <a href={organization.website} target="_blank" rel="noopener noreferrer">
                    {organization.website}
                  </a>
                </p>
              </div>
            )}
            <div className="profile-item full-width">
              <label>About</label>
              <p>{organization.about}</p>
            </div>
            <div className="profile-item full-width">
              <label>Address</label>
              <p>{organization.address}</p>
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Contact Details</h2>
          </div>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Contact Person</label>
              <p>{organization.contactPerson.name}</p>
            </div>
            <div className="profile-item">
              <label>Email</label>
              <p>{organization.contactPerson.email}</p>
            </div>
            <div className="profile-item">
              <label>Mobile Number</label>
              <p>{organization.contactPerson.mobile}</p>
            </div>
            {organization.contactPerson.alternateMobile && (
              <div className="profile-item">
                <label>Alternate Mobile</label>
                <p>{organization.contactPerson.alternateMobile}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Posted Internships</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Applications Received</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Active Internships</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="coming-soon">
          <h3>🚀 Coming Soon</h3>
          <ul>
            <li>Post internship opportunities</li>
            <li>Review student applications</li>
            <li>Manage ongoing internships</li>
            <li>Analytics and insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrganisation;
