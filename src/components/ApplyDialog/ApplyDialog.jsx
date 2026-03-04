import React, { useState } from "react";
import "./ApplyDialog.css";
import { useStudentProfile } from "../../hooks/useApi";

const API = import.meta.env.VITE_API_URL;

const ApplyDialog = ({ internship, onClose }) => {
  const { data: student, isLoading: loading } = useStudentProfile(true);
  const resumes = student?.resumes || [];
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ── submit application ──────────────────────────────── */
  const handleSubmit = async () => {
    if (selectedIdx === null) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/applications`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          internshipId: internship._id,
          resumeIndex: selectedIdx,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(onClose, 1800);
    } catch {
      setError("Network error — please try again");
      setSubmitting(false);
    }
  };

  /* ── get readable domain from URL ────────────────────── */
  const getDomain = (url) => {
    try {
      const h = new URL(url).hostname;
      if (h.includes("drive.google")) return "Google Drive";
      if (h.includes("docs.google")) return "Google Docs";
      if (h.includes("github")) return "GitHub";
      if (h.includes("linkedin")) return "LinkedIn";
      if (h.includes("notion")) return "Notion";
      return h.replace("www.", "");
    } catch {
      return "Link";
    }
  };

  /* ── render ──────────────────────────────────────────── */
  return (
    <div className="apply-overlay" onClick={onClose}>
      <div className="apply-dialog" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="apply-header">
          <h2 className="apply-title">
            Apply — {internship.profile}
          </h2>
          <button className="apply-close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="apply-org">
          {internship.organization?.organizationName || ""}
        </p>

        {/* body */}
        {loading ? (
          <p className="apply-status">Loading your resumes…</p>
        ) : success ? (
          <p className="apply-status apply-success">
            ✓ Application submitted successfully!
          </p>
        ) : resumes.length === 0 ? (
          <div className="apply-empty">
            <p>You haven't uploaded any resumes yet.</p>
            <a href="/onboarding/student?section=2" className="apply-link">
              Go to profile → Manage Resumes
            </a>
          </div>
        ) : (
          <>
            <p className="apply-label">Select a resume to submit:</p>

            <div className="apply-resumes">
              {resumes.map((r, idx) => (
                <label
                  key={idx}
                  className={`apply-resume-card ${selectedIdx === idx ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="resume"
                    className="apply-radio"
                    checked={selectedIdx === idx}
                    onChange={() => setSelectedIdx(idx)}
                  />
                  <div className="apply-resume-info">
                    <span className="apply-resume-name">{r.name}</span>
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apply-resume-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {getDomain(r.link)}  ↗
                    </a>
                  </div>
                </label>
              ))}
            </div>

            {error && <p className="apply-error">{error}</p>}

            <button
              className="apply-submit"
              disabled={selectedIdx === null || submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting…" : "Confirm Application"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyDialog;
