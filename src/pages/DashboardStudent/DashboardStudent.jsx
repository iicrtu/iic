import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardStudent.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

const DashboardStudent = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewResume, setPreviewResume] = useState(null);
  const [applications, setApplications] = useState([]);
  const [expandedApp, setExpandedApp] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      try {
        const [studentResponse, appsResponse] = await Promise.all([
          fetch(`${API}/api/student/profile`, {
            credentials: "include",
            cache: "no-cache",
          }),
          fetch(`${API}/api/applications/mine`, {
            credentials: "include",
            cache: "no-cache",
          }),
        ]);

        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setStudent(studentData.student);
        }

        if (appsResponse.ok) {
          const appsData = await appsResponse.json();
          setApplications(appsData.applications || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, isAuthenticated]);

  const handleEditProfile = () => {
    navigate("/onboarding/student?section=1");
  };

  const handleManageResumes = () => {
    navigate("/onboarding/student?section=2");
  };

  const getDomainFromUrl = (url) => {
    try {
      const hostname = new URL(url).hostname;
      if (hostname.includes("drive.google")) return "Google Drive";
      if (hostname.includes("docs.google")) return "Google Docs";
      if (hostname.includes("dropbox")) return "Dropbox";
      if (hostname.includes("github")) return "GitHub";
      if (hostname.includes("linkedin")) return "LinkedIn";
      if (hostname.includes("notion")) return "Notion";
      return hostname.replace("www.", "");
    } catch {
      return "Link";
    }
  };

  const getEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);

      // Google Drive file: /file/d/{id}/view → /file/d/{id}/preview
      if (parsed.hostname.includes("drive.google.com")) {
        const fileMatch = url.match(/\/file\/d\/([^/]+)/);
        if (fileMatch) {
          return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
        }
        // Shared link with ?id= param
        const idParam = parsed.searchParams.get("id");
        if (idParam) {
          return `https://drive.google.com/file/d/${idParam}/preview`;
        }
      }

      // Google Docs/Sheets/Slides: .../edit or .../view → .../preview
      if (parsed.hostname.includes("docs.google.com")) {
        return url.replace(/\/(edit|view)(\?.*)?$/, "/preview");
      }

      // Dropbox: dl=0 → raw=1 for direct embed
      if (parsed.hostname.includes("dropbox.com")) {
        return url.replace("dl=0", "raw=1").replace("www.dropbox.com", "dl.dropboxusercontent.com");
      }

      return url;
    } catch {
      return url;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (!student || !student.onboardingCompleted) {
    return (
      <div className="dashboard-student">
        <div className="dashboard-container">
          <h1>Welcome, {user?.name}!</h1>
          <div className="incomplete-profile">
            <h2>📋 Complete Your Profile</h2>
            <p>Please complete your student profile to get started.</p>
            <button
              className="complete-btn"
              onClick={() => navigate("/onboarding/student")}
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-student">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>

        {/* Personal Details Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Personal Details</h2>
          </div>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Full Name</label>
              <p>{student.fullName}</p>
            </div>
            <div className="profile-item">
              <label>Course</label>
              <p>{student.course}</p>
            </div>
            <div className="profile-item">
              <label>Branch</label>
              <p>{student.branch}</p>
            </div>
            <div className="profile-item">
              <label>Year</label>
              <p>{student.year}</p>
            </div>
            <div className="profile-item">
              <label>C.R No.</label>
              <p>{student.crNumber}</p>
            </div>
            <div className="profile-item">
              <label>U.R No.</label>
              <p>{student.urNumber}</p>
            </div>
            <div className="profile-item">
              <label>Phone (WhatsApp)</label>
              <p>{student.phone}</p>
            </div>
            <div className="profile-item">
              <label>Professional Email</label>
              <p>{student.email}</p>
            </div>
          </div>
        </div>

        {/* Resumes Section */}
        <div className="resumes-section">
          <div className="section-header">
            <h2>My Resumes</h2>
            <button
              className="edit-resume-btn"
              onClick={handleManageResumes}
            >
              Manage Resumes
            </button>
          </div>

          {(!student.resumes || student.resumes.length === 0) ? (
            <div className="no-resumes">
              <div className="no-resumes-icon">📄</div>
              <h3>No Resumes Added</h3>
              <p>Add your resumes to quickly apply for internships.</p>
              <button
                className="add-resume-cta"
                onClick={handleManageResumes}
              >
                Add Resumes
              </button>
            </div>
          ) : (
            <div className="resumes-table-container">
              <table className="resumes-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Resume Name</th>
                    <th>Source</th>
                    <th>Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {student.resumes.map((resume, index) => (
                    <tr key={index}>
                      <td className="resume-index">{index + 1}</td>
                      <td>
                        <div className="resume-name-cell">
                          <span className="resume-file-icon">📄</span>
                          {resume.name}
                        </div>
                      </td>
                      <td>
                        <span className="source-badge">
                          {getDomainFromUrl(resume.link)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="preview-link"
                          onClick={() => setPreviewResume(resume)}
                        >
                          Preview 👁
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <h3>{student.resumes?.length || 0}</h3>
              <p>Resumes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{applications.length}</h3>
              <p>Applications Sent</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{applications.filter((a) => a.status === "approved").length}</h3>
              <p>Approved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎉</div>
            <div className="stat-info">
              <h3>{applications.filter((a) => a.status === "selected").length}</h3>
              <p>Selected</p>
            </div>
          </div>
        </div>

        {/* My Applications Section */}
        <div className="applications-section">
          <div className="section-header">
            <h2>My Applications</h2>
          </div>

          {applications.length === 0 ? (
            <div className="no-applications">
              <p>You haven't applied to any internships yet.</p>
              <button
                className="browse-cta"
                onClick={() => navigate("/internships")}
              >
                Browse Internships
              </button>
            </div>
          ) : (
            <div className="applications-table-container">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Organization</th>
                    <th>Status</th>
                    <th>Applied</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <React.Fragment key={app._id}>
                      <tr>
                        <td className="app-role">
                          {app.internship?.profile || "—"}
                        </td>
                        <td>
                          {app.organization?.organizationName || "—"}
                        </td>
                        <td>
                          <span className={`app-badge app-badge-${app.status}`}>
                            {app.status === "pending_admin"
                              ? "Pending"
                              : app.status === "approved"
                              ? "Approved"
                              : app.status === "selected"
                              ? "Selected"
                              : "Rejected"}
                          </span>
                        </td>
                        <td className="app-date">
                          {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td>
                          {(app.status === "rejected" || app.status === "selected") && (
                            <button
                              className="expand-btn"
                              onClick={() =>
                                setExpandedApp(
                                  expandedApp === app._id ? null : app._id
                                )
                              }
                            >
                              {expandedApp === app._id ? "▲" : "▼"}
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedApp === app._id && app.status === "rejected" && (
                        <tr className="expanded-row">
                          <td colSpan={5}>
                            <div className="expanded-content rejected-reason">
                              <strong>Rejection Reason:</strong>{" "}
                              {app.rejectionReason || "No reason provided"}
                            </div>
                          </td>
                        </tr>
                      )}
                      {expandedApp === app._id && app.status === "selected" && (
                        <tr className="expanded-row">
                          <td colSpan={5}>
                            <div className="expanded-content selected-info">
                              <strong>🎉 Congratulations!</strong> You've been
                              selected. The organization will reach out to you
                              soon.
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Resume Preview Modal */}
        {previewResume && (
          <div className="preview-modal-overlay" onClick={() => setPreviewResume(null)}>
            <div className="preview-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="preview-modal-header">
                <div className="preview-modal-title">
                  <span className="resume-file-icon">📄</span>
                  <h3>{previewResume.name}</h3>
                  <span className="source-badge">{getDomainFromUrl(previewResume.link)}</span>
                </div>
                <div className="preview-modal-actions">
                  <a
                    href={previewResume.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-external-btn"
                  >
                    Open in new tab ↗
                  </a>
                  <button className="preview-close-btn" onClick={() => setPreviewResume(null)}>
                    ✕
                  </button>
                </div>
              </div>
              <div className="preview-modal-body">
                <iframe
                  src={getEmbedUrl(previewResume.link)}
                  title={previewResume.name}
                  className="preview-iframe"
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStudent;
