import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./AdminDashboard.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const API = import.meta.env.VITE_API_URL;

/* ─── Rejection modal ──────────────────────────────────── */
const RejectModal = ({ title, onConfirm, onCancel, loading }) => {
  const [reason, setReason] = useState("");
  return (
    <div className="adm-modal-overlay" onClick={onCancel}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="adm-modal-title">{title}</h3>
        <textarea
          className="adm-modal-textarea"
          placeholder="Reason for rejection (required)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          autoFocus
        />
        <div className="adm-modal-actions">
          <button className="adm-btn adm-btn-cancel" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="adm-btn adm-btn-reject"
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim() || loading}
          >
            {loading ? "Rejecting…" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Pagination ───────────────────────────────────────── */
const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="adm-pagination">
      <button className="adm-page-btn" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        ← Prev
      </button>
      <span className="adm-page-info">
        Page {page} of {totalPages}
      </span>
      <button className="adm-page-btn" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next →
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════ */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("internships");

  /* ── Internships state ──────────────────────────────── */
  const [internships, setInternships] = useState([]);
  const [intStatus, setIntStatus] = useState("under_review");
  const [intPage, setIntPage] = useState(1);
  const [intTotalPages, setIntTotalPages] = useState(1);
  const [intLoading, setIntLoading] = useState(false);

  /* ── Applications state ─────────────────────────────── */
  const [applications, setApplications] = useState([]);
  const [appStatus, setAppStatus] = useState("pending_admin");
  const [appPage, setAppPage] = useState(1);
  const [appTotalPages, setAppTotalPages] = useState(1);
  const [appLoading, setAppLoading] = useState(false);

  /* ── Reject modal ───────────────────────────────────── */
  const [rejectModal, setRejectModal] = useState(null); // { type, id, title }
  const [rejecting, setRejecting] = useState(false);

  /* ── Announcements state ────────────────────────────── */
  const [announcements, setAnnouncements] = useState([]);
  const [annLoading, setAnnLoading] = useState(false);
  const [annForm, setAnnForm] = useState(null); // null = closed, {} = open
  const [annSaving, setAnnSaving] = useState(false);

  /* ── Fetch helpers ──────────────────────────────────── */
  const fetchInternships = useCallback(async () => {
    setIntLoading(true);
    try {
      const qs = intStatus === "all" ? "" : `status=${intStatus}&`;
      const res = await fetch(
        `${API}/api/admin/internships?${qs}page=${intPage}&limit=10`,
        { credentials: "include" }
      );
      if (res.status === 401) return navigate("/admin", { replace: true });
      const data = await res.json();
      setInternships(data.data || []);
      setIntTotalPages(data.pagination?.totalPages || 1);
    } catch {
      toast.error("Failed to load internships");
    } finally {
      setIntLoading(false);
    }
  }, [intStatus, intPage, navigate]);

  const fetchApplications = useCallback(async () => {
    setAppLoading(true);
    try {
      const qs = appStatus === "all" ? "" : `status=${appStatus}&`;
      const res = await fetch(
        `${API}/api/admin/applications?${qs}page=${appPage}&limit=10`,
        { credentials: "include" }
      );
      if (res.status === 401) return navigate("/admin", { replace: true });
      const data = await res.json();
      setApplications(data.data || []);
      setAppTotalPages(data.pagination?.totalPages || 1);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setAppLoading(false);
    }
  }, [appStatus, appPage, navigate]);

  useEffect(() => {
    if (tab === "internships") fetchInternships();
  }, [tab, fetchInternships]);

  useEffect(() => {
    if (tab === "applications") fetchApplications();
  }, [tab, fetchApplications]);

  /* ── Announcements fetch + actions ──────────────────── */
  const fetchAnnouncements = useCallback(async () => {
    setAnnLoading(true);
    try {
      const res = await fetch(`${API}/api/announcements/all`, { credentials: "include" });
      if (res.status === 401) return navigate("/admin", { replace: true });
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch {
      toast.error("Failed to load announcements");
    } finally {
      setAnnLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (tab === "announcements") fetchAnnouncements();
  }, [tab, fetchAnnouncements]);

  const openAnnForm = (existing = null) => {
    if (existing) {
      setAnnForm({
        _id: existing._id,
        title: existing.title,
        year: existing.year,
        description: existing.description,
        posted: existing.posted ? existing.posted.slice(0, 10) : "",
        deadline: existing.deadline ? existing.deadline.slice(0, 10) : "",
        applyLink: existing.applyLink || "",
      });
    } else {
      setAnnForm({ title: "", year: "", description: "", posted: "", deadline: "", applyLink: "" });
    }
  };

  const saveAnnouncement = async () => {
    if (!annForm.title.trim() || !annForm.year.trim() || !annForm.description.trim() || !annForm.deadline) {
      return toast.error("Title, year, description and deadline are required");
    }
    setAnnSaving(true);
    const isEdit = !!annForm._id;
    const url = isEdit
      ? `${API}/api/announcements/${annForm._id}`
      : `${API}/api/announcements`;
    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: annForm.title,
          year: annForm.year,
          description: annForm.description,
          posted: annForm.posted || undefined,
          deadline: annForm.deadline,
          applyLink: annForm.applyLink,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed");
      }
      toast.success(isEdit ? "Announcement updated" : "Announcement created");
      setAnnForm(null);
      fetchAnnouncements();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAnnSaving(false);
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(`${API}/api/announcements/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      toast.success("Announcement deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  /* ── Actions ────────────────────────────────────────── */
  const approveInternship = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/internships/${id}/approve`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setInternships((prev) => prev.filter((i) => i._id !== id));
      toast.success("Internship approved");
    } catch {
      toast.error("Failed to approve internship");
    }
  };

  const approveApplication = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/applications/${id}/approve`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setApplications((prev) => prev.filter((a) => a._id !== id));
      toast.success("Application approved");
    } catch {
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async (reason) => {
    if (!rejectModal) return;
    setRejecting(true);
    const { type, id } = rejectModal;
    const url =
      type === "internship"
        ? `${API}/api/admin/internships/${id}/reject`
        : `${API}/api/admin/applications/${id}/reject`;
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rejectionReason: reason }),
      });
      if (!res.ok) throw new Error();
      if (type === "internship") {
        setInternships((prev) => prev.filter((i) => i._id !== id));
      } else {
        setApplications((prev) => prev.filter((a) => a._id !== id));
      }
      toast.success(`${type === "internship" ? "Internship" : "Application"} rejected`);
      setRejectModal(null);
    } catch {
      toast.error("Failed to reject");
    } finally {
      setRejecting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/admin/logout`, { method: "POST", credentials: "include" });
    } catch { /* ignore */ }
    navigate("/admin", { replace: true });
  };

  /* ── Render ─────────────────────────────────────────── */
  return (
    <div className="adm-page">
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="adm-topbar">
        <h1 className="adm-topbar-title">Admin Dashboard</h1>
        <button className="adm-btn adm-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ── Tab bar + filters ──────────────────────────── */}
      <div className="adm-nav">
        <div className="adm-tabs">
          <button
            className={`adm-tab ${tab === "internships" ? "active" : ""}`}
            onClick={() => { setTab("internships"); setIntPage(1); }}
          >
            Internships
          </button>
          <button
            className={`adm-tab ${tab === "applications" ? "active" : ""}`}
            onClick={() => { setTab("applications"); setAppPage(1); }}
          >
            Applications
          </button>
          <button
            className={`adm-tab ${tab === "announcements" ? "active" : ""}`}
            onClick={() => setTab("announcements")}
          >
            Announcements
          </button>
        </div>

        <div className="adm-filters">
          {tab === "internships" && (
            <select
              className="adm-select"
              value={intStatus}
              onChange={(e) => { setIntStatus(e.target.value); setIntPage(1); }}
            >
              <option value="under_review">Under Review</option>
              <option value="posted">Posted</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          )}
          {tab === "applications" && (
            <select
              className="adm-select"
              value={appStatus}
              onChange={(e) => { setAppStatus(e.target.value); setAppPage(1); }}
            >
              <option value="pending_admin">Pending Admin</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          )}
        </div>
      </div>

      {/* ── Internships tab ────────────────────────────── */}
      {tab === "internships" && (
        <div className="adm-content">
          {intLoading ? (
            <LoadingSpinner />
          ) : internships.length === 0 ? (
            <p className="adm-empty">No internships found.</p>
          ) : (
            <>
              <div className="adm-cards">
                {internships.map((i) => (
                  <div className="adm-card" key={i._id}>
                    <div className="adm-card-header">
                      <h3 className="adm-card-title">{i.profile}</h3>
                      <span className={`adm-badge adm-badge-${i.status}`}>{i.status.replace("_", " ")}</span>
                    </div>
                    <p className="adm-card-org">{i.organization?.organizationName || "—"}</p>

                    <div className="adm-card-meta">
                      <span>{i.mode}</span>
                      {i.location && <span>📍 {i.location}</span>}
                      <span>💰 {i.stipend}</span>
                      <span>👥 {i.openings} opening{i.openings !== 1 ? "s" : ""}</span>
                    </div>

                    {i.skills?.length > 0 && (
                      <div className="adm-card-skills">
                        {i.skills.map((s, idx) => (
                          <span className="adm-skill" key={idx}>{s}</span>
                        ))}
                      </div>
                    )}

                    {i.description && (
                      <p className="adm-card-desc">
                        {i.description.length > 180
                          ? i.description.slice(0, 180) + "…"
                          : i.description}
                      </p>
                    )}

                    {intStatus === "under_review" && (
                      <div className="adm-card-actions">
                        <button className="adm-btn adm-btn-approve" onClick={() => approveInternship(i._id)}>
                          Approve
                        </button>
                        <button
                          className="adm-btn adm-btn-reject"
                          onClick={() => setRejectModal({ type: "internship", id: i._id, title: `Reject "${i.profile}"` })}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Pagination page={intPage} totalPages={intTotalPages} onPageChange={setIntPage} />
            </>
          )}
        </div>
      )}

      {/* ── Applications tab ───────────────────────────── */}
      {tab === "applications" && (
        <div className="adm-content">
          {appLoading ? (
            <LoadingSpinner />
          ) : applications.length === 0 ? (
            <p className="adm-empty">No applications found.</p>
          ) : (
            <>
              <div className="adm-cards">
                {applications.map((a) => (
                  <div className="adm-card" key={a._id}>
                    <div className="adm-card-header">
                      <h3 className="adm-card-title">{a.student?.fullName || "—"}</h3>
                      <span className={`adm-badge adm-badge-${a.status}`}>{a.status.replace("_", " ")}</span>
                    </div>

                    <div className="adm-card-meta">
                      {a.student?.crNumber && <span>CR: {a.student.crNumber}</span>}
                      {a.student?.branch && <span>{a.student.branch}</span>}
                    </div>

                    <div className="adm-card-meta">
                      <span>🏢 {a.organization?.organizationName || "—"}</span>
                      <span>💼 {a.internship?.profile || "—"}</span>
                    </div>

                    {a.resume?.link && (
                      <a
                        className="adm-resume-link"
                        href={a.resume.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 {a.resume.name || "View Resume"}
                      </a>
                    )}

                    {appStatus === "pending_admin" && (
                      <div className="adm-card-actions">
                        <button className="adm-btn adm-btn-approve" onClick={() => approveApplication(a._id)}>
                          Approve
                        </button>
                        <button
                          className="adm-btn adm-btn-reject"
                          onClick={() =>
                            setRejectModal({
                              type: "application",
                              id: a._id,
                              title: `Reject ${a.student?.fullName || "application"}`,
                            })
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Pagination page={appPage} totalPages={appTotalPages} onPageChange={setAppPage} />
            </>
          )}
        </div>
      )}

      {/* ── Announcements tab ──────────────────────────── */}
      {tab === "announcements" && (
        <div className="adm-content">
          <div className="adm-ann-toolbar">
            <button className="adm-btn adm-btn-approve" onClick={() => openAnnForm()}>
              + New Announcement
            </button>
          </div>

          {annLoading ? (
            <LoadingSpinner />
          ) : announcements.length === 0 ? (
            <p className="adm-empty">No announcements yet.</p>
          ) : (
            <div className="adm-cards">
              {announcements.map((a) => (
                <div className="adm-card" key={a._id}>
                  <div className="adm-card-header">
                    <h3 className="adm-card-title">{a.title}</h3>
                    <span className="adm-badge adm-badge-posted">{a.year}</span>
                  </div>

                  <p className="adm-card-desc">{a.description.length > 180 ? a.description.slice(0, 180) + "…" : a.description}</p>

                  <div className="adm-card-meta">
                    <span>📅 Posted: {new Date(a.posted).toLocaleDateString()}</span>
                    <span>⏰ Deadline: {new Date(a.deadline).toLocaleDateString()}</span>
                  </div>

                  {a.applyLink && (
                    <a className="adm-resume-link" href={a.applyLink} target="_blank" rel="noopener noreferrer">
                      🔗 Apply Link
                    </a>
                  )}

                  <div className="adm-card-actions">
                    <button className="adm-btn adm-btn-approve" onClick={() => openAnnForm(a)}>
                      Edit
                    </button>
                    <button className="adm-btn adm-btn-reject" onClick={() => deleteAnnouncement(a._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Announcement form modal ────────────────────── */}
      {annForm && (
        <div className="adm-modal-overlay" onClick={() => setAnnForm(null)}>
          <div className="adm-modal adm-modal-wide" onClick={(e) => e.stopPropagation()}>
            <h3 className="adm-modal-title">{annForm._id ? "Edit Announcement" : "New Announcement"}</h3>

            <div className="adm-form-grid">
              <div className="adm-form-field">
                <label>Title *</label>
                <input
                  type="text"
                  className="adm-input"
                  value={annForm.title}
                  onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                  placeholder="e.g. Summer Internship Program"
                />
              </div>
              <div className="adm-form-field">
                <label>Year / Target *</label>
                <input
                  type="text"
                  className="adm-input"
                  value={annForm.year}
                  onChange={(e) => setAnnForm({ ...annForm, year: e.target.value })}
                  placeholder="e.g. 1st Year, All Years"
                />
              </div>
              <div className="adm-form-field adm-form-full">
                <label>Description *</label>
                <textarea
                  className="adm-modal-textarea"
                  value={annForm.description}
                  onChange={(e) => setAnnForm({ ...annForm, description: e.target.value })}
                  rows={3}
                  placeholder="Announcement details…"
                />
              </div>
              <div className="adm-form-field">
                <label>Posted Date</label>
                <input
                  type="date"
                  className="adm-input"
                  value={annForm.posted}
                  onChange={(e) => setAnnForm({ ...annForm, posted: e.target.value })}
                />
              </div>
              <div className="adm-form-field">
                <label>Deadline *</label>
                <input
                  type="date"
                  className="adm-input"
                  value={annForm.deadline}
                  onChange={(e) => setAnnForm({ ...annForm, deadline: e.target.value })}
                />
              </div>
              <div className="adm-form-field adm-form-full">
                <label>Apply Link</label>
                <input
                  type="url"
                  className="adm-input"
                  value={annForm.applyLink}
                  onChange={(e) => setAnnForm({ ...annForm, applyLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-cancel" onClick={() => setAnnForm(null)} disabled={annSaving}>
                Cancel
              </button>
              <button className="adm-btn adm-btn-approve" onClick={saveAnnouncement} disabled={annSaving}>
                {annSaving ? "Saving…" : annForm._id ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject modal ───────────────────────────────── */}
      {rejectModal && (
        <RejectModal
          title={rejectModal.title}
          onConfirm={handleReject}
          onCancel={() => setRejectModal(null)}
          loading={rejecting}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
