import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardOrganisation.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { useOrgProfile, useOrgInternships } from "../../hooks/useApi";

const API = import.meta.env.VITE_API_URL;

const DashboardOrganisation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const queryEnabled = !authLoading && isAuthenticated;
  const { data: organization = null, isLoading: orgLoading } = useOrgProfile(queryEnabled);
  const { data: internshipsData = [], isLoading: intLoading } = useOrgInternships(queryEnabled);
  const loading = orgLoading || intLoading;

  const [internships, setInternships] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: "" });
  const [deleting, setDeleting] = useState(false);

  // Sync react-query data into local state so delete/select/reject mutations work
  React.useEffect(() => {
    setInternships(internshipsData);
  }, [internshipsData]);

  // Applications panel state
  const [appsPanel, setAppsPanel] = useState(null); // { internshipId, internshipName }
  const [panelApps, setPanelApps] = useState([]);
  const [panelLoading, setPanelLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState({ show: false, id: null, name: "" });
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(null); // app id currently loading

  // Redirect if not authenticated (after auth check completes)
  if (!authLoading && !isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

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
    const map = {
      posted: { cls: "status-posted", label: "Posted" },
      under_review: { cls: "status-review", label: "Under Review" },
      rejected: { cls: "status-rejected", label: "Rejected" },
      closed: { cls: "status-closed", label: "Closed" },
      draft: { cls: "status-draft", label: "Draft" },
    };
    const s = map[status] || { cls: "", label: status };
    return <span className={`status-badge ${s.cls}`}>{s.label}</span>;
  };

  /* ── Applications panel helpers ──────────────────────── */
  const openAppsPanel = async (internship) => {
    setAppsPanel({ internshipId: internship._id, internshipName: internship.profile });
    setPanelLoading(true);
    try {
      const res = await fetch(
        `${API}/api/applications/internship/${internship._id}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        setPanelApps(data.applications || []);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setPanelLoading(false);
    }
  };

  const closeAppsPanel = () => {
    setAppsPanel(null);
    setPanelApps([]);
  };

  const handleSelect = async (appId) => {
    setActionLoading(appId);
    try {
      const res = await fetch(`${API}/api/applications/${appId}/select`, {
        method: "PATCH",
        credentials: "include",
      });
      if (res.ok) {
        setPanelApps((prev) =>
          prev.map((a) => (a._id === appId ? { ...a, status: "selected" } : a))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (app) => {
    setRejectModal({ show: true, id: app._id, name: app.student?.fullName || "Student" });
    setRejectReason("");
  };

  const confirmReject = async () => {
    if (!rejectReason.trim()) return;
    setActionLoading(rejectModal.id);
    try {
      const res = await fetch(`${API}/api/applications/${rejectModal.id}/reject`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason }),
      });
      if (res.ok) {
        setPanelApps((prev) =>
          prev.map((a) =>
            a._id === rejectModal.id
              ? { ...a, status: "rejected", rejectedBy: "organization", rejectionReason: rejectReason }
              : a
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
      setRejectModal({ show: false, id: null, name: "" });
    }
  };

  const getAppBadge = (status) => {
    const m = {
      approved: { cls: "orgapp-approved", label: "Approved" },
      selected: { cls: "orgapp-selected", label: "Selected" },
      rejected: { cls: "orgapp-rejected", label: "Rejected" },
    };
    const s = m[status] || { cls: "", label: status };
    return <span className={`orgapp-badge ${s.cls}`}>{s.label}</span>;
  };

  if (authLoading || loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner />
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
                        {internship.status === "posted" && (internship.applicationsCount || 0) > 0 ? (
                          <button
                            className="apps-count-btn"
                            onClick={() => openAppsPanel(internship)}
                          >
                            {internship.applicationsCount} &nbsp;▸
                          </button>
                        ) : (
                          internship.applicationsCount || 0
                        )}
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
              <p>Total Internships</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{internships.filter((i) => i.status === "posted").length}</h3>
              <p>Posted</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{internships.filter((i) => i.status === "under_review").length}</h3>
              <p>Under Review</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{internships.reduce((sum, i) => sum + (i.applicationsCount || 0), 0)}</h3>
              <p>Applications Received</p>
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

        {/* Applications Panel */}
        {appsPanel && (
          <div className="apps-panel-overlay" onClick={closeAppsPanel}>
            <div className="apps-panel" onClick={(e) => e.stopPropagation()}>
              <div className="apps-panel-header">
                <h3>Applications — {appsPanel.internshipName}</h3>
                <button className="apps-panel-close" onClick={closeAppsPanel}>✕</button>
              </div>

              {panelLoading ? (
                <div className="apps-panel-loading"><LoadingSpinner size={80} /></div>
              ) : panelApps.length === 0 ? (
                <div className="apps-panel-empty">No applications yet.</div>
              ) : (
                <div className="apps-panel-list">
                  {panelApps.map((app) => (
                    <div className="app-card" key={app._id}>
                      <div className="app-card-top">
                        <div className="app-card-info">
                          <strong>{app.student?.fullName}</strong>
                          <span className="app-card-meta">
                            {app.student?.branch} • {app.student?.year} Year • {app.student?.course}
                          </span>
                          <span className="app-card-meta">
                            CR: {app.student?.crNumber} &nbsp;|&nbsp; {app.student?.email}
                          </span>
                          {app.resume && (
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="app-card-resume"
                            >
                              📄 View Resume
                            </a>
                          )}
                        </div>
                        <div className="app-card-status">{getAppBadge(app.status)}</div>
                      </div>

                      {app.status === "approved" && (
                        <div className="app-card-actions">
                          <button
                            className="select-btn"
                            disabled={actionLoading === app._id}
                            onClick={() => handleSelect(app._id)}
                          >
                            {actionLoading === app._id ? "…" : "✅ Select"}
                          </button>
                          <button
                            className="reject-btn"
                            disabled={actionLoading === app._id}
                            onClick={() => openRejectModal(app)}
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {app.status === "rejected" && app.rejectionReason && (
                        <p className="app-card-reason">Reason: {app.rejectionReason}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reject Confirmation Modal */}
        {rejectModal.show && (
          <div className="modal-overlay" onClick={() => setRejectModal({ show: false, id: null, name: "" })}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">❌</div>
              <h3 className="modal-title">Reject {rejectModal.name}</h3>
              <textarea
                className="reject-textarea"
                placeholder="Provide a reason for rejection…"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
              <div className="modal-actions">
                <button
                  className="modal-cancel-btn"
                  onClick={() => setRejectModal({ show: false, id: null, name: "" })}
                >
                  Cancel
                </button>
                <button
                  className="modal-delete-btn"
                  onClick={confirmReject}
                  disabled={!rejectReason.trim() || actionLoading}
                >
                  {actionLoading ? "Rejecting…" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOrganisation;
