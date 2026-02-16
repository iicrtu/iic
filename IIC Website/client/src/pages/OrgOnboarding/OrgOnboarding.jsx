import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgOnboarding.css";

const API_URL = import.meta.env.VITE_API_URL;

function isValidPhone(v) {
  const x = String(v || "").trim();
  const digits = x.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export default function OrgOnboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    orgName: "",
    website: "",
    contactPerson: "",
    phone: "",
    address: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    if (loading) return false;
    if (!String(form.orgName).trim()) return false;
    if (!String(form.contactPerson).trim()) return false;
    if (!String(form.phone).trim()) return false;
    if (!isValidPhone(form.phone)) return false;
    if (String(form.orgName).trim().length < 2) return false;
    return true;
  }, [form, loading]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/org-profile/me`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Failed to load profile");

        if (!alive) return;

        if (data.orgProfileCompleted) {
          navigate("/dashboard/org");
          return;
        }

        setForm((prev) => ({ ...prev, ...(data.orgProfile || {}) }));
      } catch (_e) {
        navigate("/login");
      } finally {
        if (alive) setPageLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [navigate, API_URL]);

  const onChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        orgName: String(form.orgName).trim(),
        website: String(form.website || "").trim(),
        contactPerson: String(form.contactPerson).trim(),
        phone: String(form.phone).trim(),
        address: String(form.address || "").trim(),
        about: String(form.about || "").trim(),
      };

      const res = await fetch(`${API_URL}/api/org-profile/me`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to save details");

      // After org onboarding, go to create internship (your chosen flow)
      navigate("/org/internships/new");
    } catch (e2) {
      setError(e2?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <div className="oo-wrap">Loading…</div>;

  return (
    <div className="oo-wrap">
      <div className="oo-card">
        <h1 className="oo-title">Organisation Details</h1>
        <p className="oo-subtitle">Please fill these details to continue.</p>

        {error ? <div className="oo-error">{error}</div> : null}

        <form onSubmit={onSubmit} className="oo-form">
          <div className="oo-grid">
            <label className="oo-field">
              <span>Organisation Name *</span>
              <input
                value={form.orgName}
                onChange={onChange("orgName")}
                required
                maxLength={120}
                placeholder="e.g. ABC Innovations Pvt Ltd"
              />
            </label>

            <label className="oo-field">
              <span>Website</span>
              <input
                value={form.website}
                onChange={onChange("website")}
                placeholder="example.com or https://example.com"
                maxLength={200}
              />
              <small className="oo-hint">Tip: you can enter just example.com</small>
            </label>

            <label className="oo-field">
              <span>Contact Person *</span>
              <input
                value={form.contactPerson}
                onChange={onChange("contactPerson")}
                required
                maxLength={80}
                placeholder="Full name"
              />
            </label>

            <label className="oo-field">
              <span>Phone *</span>
              <input
                value={form.phone}
                onChange={onChange("phone")}
                required
                maxLength={20}
                placeholder="e.g. 9876543210"
              />
              {!isValidPhone(form.phone) && form.phone ? (
                <small className="oo-hint oo-hint-warn">Enter a valid phone number</small>
              ) : (
                <small className="oo-hint">10–15 digits recommended</small>
              )}
            </label>
          </div>

          <label className="oo-field">
            <span>Address</span>
            <input value={form.address} onChange={onChange("address")} maxLength={200} />
          </label>

          <label className="oo-field">
            <span>About</span>
            <textarea value={form.about} onChange={onChange("about")} rows={4} maxLength={1000} />
          </label>

          <button className="oo-btn" type="submit" disabled={!canSubmit}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}