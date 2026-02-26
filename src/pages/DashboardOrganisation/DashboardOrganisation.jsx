import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardOrganisation.css";

const DashboardOrganisation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: "" });
  const [deleting, setDeleting] = useState(false);

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

        // Fetch internships
        const internshipsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/internships`,
          {
            credentials: "include",
            cache: "no-cache",
          }
        );

        if (internshipsResponse.ok) {
          const internshipsData = await internshipsResponse.json();
          setInternships(internshipsData.internships || []);
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

  const openDeleteModal = (internship) => {
    setDeleteModal({ show: true, id: internship._id, name: internship.profile });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, id: null, name: "" });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/internships/${deleteModal.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setInternships(internships.filter((i) => i._id !== deleteModal.id));
        closeDeleteModal();
      } else {
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting internship:", error);
      closeDeleteModal();
    } finally {
      setDeleting(false);
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "live":
        return <span className="status-badge status-live">Live</span>;
      case "under_review":
        return <span className="status-badge status-review">Under Review</span>;
      case "closed":
        return <span className="status-badge status-closed">Closed</span>;
      case "draft":
        return <span className="status-badge status-draft">Draft</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
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

        {/* Posted Internships Section */}
        <div className="internships-section">
          <div className="section-header">
            <h2>Posted Internships</h2>
            <button 
              className="post-internship-btn"
              onClick={() => navigate("/post-internship")}
            >
              + Post New Internship
            </button>
          </div>

          {internships.length === 0 ? (
            <div className="no-internships">
              <p>You haven't posted any internships yet.</p>
              <button 
                className="post-first-btn"
                onClick={() => navigate("/post-internship")}
              >
                Post Your First Internship
              </button>
            </div>
          ) : (
            <div className="internships-table-container">
              <table className="internships-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Status</th>
                    <th>Applications</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map((internship) => (
                    <tr key={internship._id}>
                      <td>
                        <div className="profile-cell">
                          <div className="profile-name">{internship.profile}</div>
                          <div className="profile-meta">
                            {internship.mode} • {internship.duration}
                          </div>
                        </div>
                      </td>
                      <td>{getStatusDisplay(internship.status)}</td>
                      <td className="applications-count">
                        {internship.applicationsCount || 0}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn edit-btn"
                            onClick={() => navigate(`/edit-internship/${internship._id}`)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => openDeleteModal(internship)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{internships.length}</h3>
              <p>Posted Internships</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{internships.reduce((sum, i) => sum + (i.applicationsCount || 0), 0)}</h3>
              <p>Applications Received</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{internships.filter(i => i.status === "live").length}</h3>
              <p>Active Internships</p>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="modal-overlay" onClick={closeDeleteModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">🗑️</div>
              <h3 className="modal-title">Delete Internship</h3>
              <p className="modal-message">
                Are you sure you want to delete <strong>{deleteModal.name}</strong>? This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button className="modal-cancel-btn" onClick={closeDeleteModal} disabled={deleting}>
                  Cancel
                </button>
                <button className="modal-delete-btn" onClick={confirmDelete} disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

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
