import React, { useState, useEffect, useRef } from "react";
import "./Internships.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ApplyDialog from "../../components/ApplyDialog/ApplyDialog";
import {
  INTERNSHIPS_HERO,
  ACTION_BUTTONS,
  STATS,
} from "../../constants/internshipsConstants";
import { useAuth } from "../../context/AuthContext";
import { usePublicInternships } from "../../hooks/useApi";

/* ── helpers ────────────────────────────────────────────── */
function getPageSize() {
  return window.innerWidth > 1024 ? 24 : 10;
}

function locationLabel(i) {
  if (i.mode === "Remote") return "Remote";
  return i.location || i.mode;
}

/* ── main component ─────────────────────────────────────── */
const Internships = () => {
  /* viewport-dependent page size */
  const [pageSize, setPageSize] = useState(getPageSize);
  const [page, setPage] = useState(1);

  /* filters */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("");

  /* data via react-query */
  const { data, isLoading: loading } = usePublicInternships({
    page,
    limit: pageSize,
    search: debouncedSearch || undefined,
    mode: modeFilter || undefined,
  });
  const internships = data?.internships || [];
  const totalPages = data?.totalPages || 1;

  /* auth state from context */
  const { user } = useAuth();

  /* UI state */
  const [openId, setOpenId] = useState(null); // card slider
  const [applyInternship, setApplyInternship] = useState(null); // ApplyDialog
  const [tooltip, setTooltip] = useState(null); // login tooltip card id

  const debounceRef = useRef(null);

  /* ── resize listener ─────────────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      const next = getPageSize();
      setPageSize((prev) => {
        if (prev !== next) {
          setPage(1);
          return next;
        }
        return prev;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── debounce search ─────────────────────────────────── */
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  /* ── handlers ────────────────────────────────────────── */
  const handleApply = (internship) => {
    if (!user || user.role !== "student") {
      setTooltip(internship._id);
      setTimeout(() => setTooltip(null), 2500);
      return;
    }
    setApplyInternship(internship);
  };

  /* ── render ──────────────────────────────────────────── */
  return (
    <div className="internships-page">
      {/* Hero */}
      <section className="internships-hero">
        <h1 className="section-title">{INTERNSHIPS_HERO.title}</h1>
        <p className="section-description">{INTERNSHIPS_HERO.description}</p>
      </section>

      {/* Action Buttons */}
      <section className="internships-actions">
        <div className="actions-container">
          {ACTION_BUTTONS.map((button, i) => (
            <button key={i} className={`action-btn ${button.type}`}>
              {button.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="internships-stats">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card-internship">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-text">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search + filter bar */}
      <section className="internships-toolbar">
        <input
          type="text"
          className="internships-search"
          placeholder="Search by role, skill, keyword…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="internships-mode-filter"
          value={modeFilter}
          onChange={(e) => {
            setModeFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Modes</option>
          <option value="Office">Office</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </section>

      {/* Cards */}
      <section className="internships-list-section">
        {loading ? (
          <LoadingSpinner />
        ) : internships.length === 0 ? (
          <p className="internships-empty">No internships found.</p>
        ) : (
          <>
            <div className="internships-grid">
              {internships.map((i) => (
                <div key={i._id} className="internship-card">
                  <div className="internship-content">
                    {openId === i._id ? (
                      /* ── expanded (slider) view ── */
                      <div className="internship-details-replaced">
                        <div className="replaced-section">
                          <h4>Description</h4>
                          <p className="replaced-desc">
                            {i.description || "No description available."}
                          </p>
                        </div>
                        <div className="replaced-section">
                          <h4>Stipend</h4>
                          <p className="replaced-desc">
                            {'\u20B9' + i.stipend || "Not specified"}
                          </p>
                        </div>
                        <div className="replaced-section">
                          <h4>Openings</h4>
                          <p className="replaced-desc">
                            {i.openings} {i.openings === 1 ? "opening" : "openings"}
                          </p>
                        </div>
                        <div className="replaced-section">
                          <h4>Skills Required</h4>
                          <div className="replaced-skills">
                            {(i.skills || []).map((s, idx) => (
                              <span key={idx} className="skill-chip">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ── default card view ── */
                      <>
                        <h3 className="internship-title">{i.profile}</h3>
                        <p className="internship-company">
                          {i.organization?.organizationName || "—"}
                        </p>

                        <div className="internship-details">
                          <div className="detail-row">
                            <span className="detail-value">
                              {locationLabel(i)}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-value">{i.duration}</span>
                          </div>
                        </div>

                        {/* skill tags (max 4 visible) */}
                        {i.skills && i.skills.length > 0 && (
                          <div className="internship-skills">
                            {i.skills.slice(0, 4).map((s, idx) => (
                              <span key={idx} className="skill-chip">
                                {s}
                              </span>
                            ))}
                            {i.skills.length > 4 && (
                              <span className="skill-chip skill-more">
                                +{i.skills.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* ── card buttons ── */}
                    <div className="internship-card-btns">
                      <button
                        className="view-more-btn"
                        onClick={() =>
                          setOpenId(openId === i._id ? null : i._id)
                        }
                      >
                        {openId === i._id ? "View Less" : "View More"}
                      </button>

                      <div className="apply-wrapper">
                        <button
                          className="apply-now-btn"
                          onClick={() => handleApply(i)}
                        >
                          Apply Now
                        </button>
                        {tooltip === i._id && (
                          <span className="apply-tooltip">
                            Login as student to apply
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="internships-pagination">
                <button
                  className="pagination-btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </button>
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Apply Dialog */}
      {applyInternship && (
        <ApplyDialog
          internship={applyInternship}
          onClose={() => setApplyInternship(null)}
        />
      )}
    </div>
  );
};

export default Internships;