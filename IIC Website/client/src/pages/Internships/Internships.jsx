import React, { useEffect, useMemo, useState } from "react";
import "./Internships.css";

const API_URL = import.meta.env.VITE_API_URL;

function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function Internships() {
  const [openId, setOpenId] = useState(null);

  const [me, setMe] = useState(null);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const limit = 12;

  const [q, setQ] = useState("");
  const [locationType, setLocationType] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [applyLoadingId, setApplyLoadingId] = useState(null);
  const [appliedIds, setAppliedIds] = useState(() => new Set());

  const isStudent = me?.role === "student";

  async function apiGet(path) {
    const res = await fetch(`${API_URL}${path}`, { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Request failed: ${path}`);
    return data;
  }

  async function loadMe() {
    try {
      const r = await apiGet("/api/auth/me");
      setMe(r.user || null);
    } catch (e) {
      setMe(null); 
    }
  }

  async function loadInternships() {
    setLoading(true);
    setErr("");

    try {
      const qs = new URLSearchParams();
      qs.set("page", String(page));
      qs.set("limit", String(limit));
      if (q.trim()) qs.set("q", q.trim());
      if (locationType) qs.set("locationType", locationType);

      const r = await apiGet(`/api/internships?${qs.toString()}`);
      setItems(r.internships || []);
      setTotal(Number(r.total || 0));
    } catch (e) {
      setErr(e?.message || "Failed to load internships");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  async function apply(internshipId) {
    if (!isStudent) {
      alert("Please login as Student to apply.");
      return;
    }

    if (appliedIds.has(internshipId)) return;

    setApplyLoadingId(internshipId);
    try {
      const res = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internshipId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to apply");

      setAppliedIds((prev) => new Set([...prev, internshipId]));
      alert("Applied successfully!");
    } catch (e) {
      alert(e?.message || "Failed to apply");
    } finally {
      setApplyLoadingId(null);
    }
  }

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / limit));
  }, [total, limit]);

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    loadInternships();
  }, [page, locationType]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      loadInternships();
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="internships-page">
      <section className="internships-hero">
        <h1 className="section-title">Internships</h1>
        <p className="section-description">
          Browse the latest opportunities posted by organisations.
        </p>
      </section>

      <section className="internships-actions">
        <div className="actions-container">
          <input
            className="internships-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title/company/skill…"
          />

          <select
            className="internships-filter"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option value="">All modes</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <button className="internships-refresh" onClick={loadInternships} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        <div className="internships-meta">
          {err ? <div className="internships-error">{err}</div> : null}
          <div className="internships-count">
            Showing {items.length} of {total}
          </div>
        </div>
      </section>

      <section className="internships-list-section">
        {loading ? (
          <div className="internships-loading">Loading internships…</div>
        ) : items.length === 0 ? (
          <div className="internships-empty">No internships found.</div>
        ) : (
          <div className="internships-grid">
            {items.map((internship) => {
              const isOpen = openId === internship._id;
              const applied = appliedIds.has(internship._id);

              return (
                <div key={internship._id} className="internship-card">
                  <div className="internship-image" />

                  <div className="internship-content">
                    {!isOpen ? (
                      <>
                        <h3 className="internship-title">{internship.title}</h3>
                        <p className="internship-company">{internship.companyName}</p>

                        <div className="internship-details">
                          <div className="detail-row">
                            <span className="detail-value">
                              {internship.locationType}
                              {internship.location ? ` • ${internship.location}` : ""}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-value">{internship.duration}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="internship-details-replaced">
                        <div className="replaced-section">
                          <h4>Description</h4>
                          <p className="replaced-desc">
                            {internship.description || "No description available."}
                          </p>
                        </div>
                        <div className="replaced-section">
                          <h4>Stipend</h4>
                          <p className="replaced-desc">{internship.stipend || "Not specified"}</p>
                        </div>
                        <div className="replaced-section">
                          <h4>Last date to apply</h4>
                          <p className="replaced-desc">
                            {formatDate(internship.lastDateToApply) || "Not specified"}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="internship-card-actions">
                      <button
                        className="more-info-btn"
                        onClick={() => setOpenId(isOpen ? null : internship._id)}
                      >
                        {isOpen ? "View Less" : "View More"}
                      </button>

                      {internship.applicationLink ? (
                        <a
                          className="apply-btn apply-btn-outline"
                          href={internship.applicationLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Apply (External)
                        </a>
                      ) : (
                        <button
                          className="apply-btn"
                          onClick={() => apply(internship._id)}
                          disabled={!isStudent || applied || applyLoadingId === internship._id}
                          title={!isStudent ? "Login as Student to apply" : ""}
                        >
                          {applyLoadingId === internship._id
                            ? "Applying…"
                            : applied
                              ? "Applied"
                              : "Apply"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="internships-pagination">
        <button
          className="internships-page-btn"
          disabled={page <= 1 || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <div className="internships-page-info">
          Page {page} / {totalPages}
        </div>
        <button
          className="internships-page-btn"
          disabled={page >= totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </section>
    </div>
  );
}