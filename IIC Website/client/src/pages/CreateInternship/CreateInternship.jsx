import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateInternship.css";

const API_URL = import.meta.env.VITE_API_URL;

const Section = ({ title, hint, children }) => (
  <div className="gf-section">
    <div className="gf-section-head">
      <h2 className="gf-section-title">{title}</h2>
      {hint ? <p className="gf-section-hint">{hint}</p> : null}
    </div>
    <div className="gf-section-body">{children}</div>
  </div>
);

const Field = ({ label, required, children }) => (
  <label className="gf-field">
    <span className="gf-label">
      {label} {required ? <span className="gf-required">*</span> : null}
    </span>
    {children}
  </label>
);

export default function CreateInternship() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    title: "",
    companyName: "",
    locationType: "remote",
    location: "",
    duration: "",
    stipend: "",
    openings: 1,
    startDate: "",
    lastDateToApply: "",
    skills: "",
    description: "",
    responsibilities: "",
    eligibility: "",
    applicationLink: ""
  });

  const isLocationDisabled = useMemo(() => form.locationType === "remote", [form.locationType]);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    if (!form.title.trim()) return "Internship Title is required";
    if (!form.companyName.trim()) return "Company/Organisation Name is required";
    if (!["remote", "on-site", "hybrid"].includes(form.locationType)) return "Invalid location type";
    if (!form.duration.trim()) return "Duration is required";
    if (!form.description.trim()) return "Description is required";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const msg = validate();
    if (msg) return setErr(msg);

    setLoading(true);
    try {
      const payload = {
        ...form,
        openings: Number(form.openings || 1),
       
      };

      const res = await fetch(`${API_URL}/api/internships`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create internship");

      navigate("/dashboard/org");
    } catch (e2) {
      setErr(e2.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gf-wrap">
      <div className="gf-top">
        <div className="gf-topbar" />
        <div className="gf-header">
          <h1 className="gf-title">Create Internship</h1>
          <p className="gf-subtitle">Fill the details below to publish an internship.</p>
        </div>
      </div>

      <form className="gf-form" onSubmit={onSubmit}>
        {err ? <div className="gf-error">{err}</div> : null}

        <Section title="Basic Details" hint="These details will be visible to students.">
          <Field label="Internship Title" required>
            <input value={form.title} onChange={set("title")} placeholder="e.g., Frontend Developer Intern" />
          </Field>

          <Field label="Company/Organisation Name" required>
            <input value={form.companyName} onChange={set("companyName")} placeholder="e.g., IIC / ABC Pvt Ltd" />
          </Field>
        </Section>

        <Section title="Work Mode & Location" hint="Remote internships can keep location empty.">
          <div className="gf-row">
            <Field label="Location Type" required>
              <select value={form.locationType} onChange={set("locationType")}>
                <option value="remote">Remote</option>
                <option value="on-site">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </Field>

            <Field label="Location (City)">
              <input
                value={form.location}
                onChange={set("location")}
                placeholder={isLocationDisabled ? "Not required for Remote" : "e.g., Jaipur"}
                disabled={isLocationDisabled}
              />
            </Field>
          </div>
        </Section>

        <Section title="Duration, Stipend & Openings">
          <div className="gf-row">
            <Field label="Duration" required>
              <input value={form.duration} onChange={set("duration")} placeholder="e.g., 8 weeks / 3 months" />
            </Field>

            <Field label="Stipend">
              <input value={form.stipend} onChange={set("stipend")} placeholder="e.g., ₹10,000/month or Unpaid" />
            </Field>

            <Field label="Openings">
              <input
                type="number"
                min="1"
                value={form.openings}
                onChange={set("openings")}
              />
            </Field>
          </div>

          <div className="gf-row">
            <Field label="Start Date">
              <input type="date" value={form.startDate} onChange={set("startDate")} />
            </Field>
            <Field label="Last Date to Apply">
              <input type="date" value={form.lastDateToApply} onChange={set("lastDateToApply")} />
            </Field>
          </div>
        </Section>

        <Section title="Skills & Description" hint="Use clear and short points.">
          <Field label="Skills (comma separated)">
            <input value={form.skills} onChange={set("skills")} placeholder="e.g., React, Node.js, MongoDB" />
          </Field>

          <Field label="Internship Description" required>
            <textarea
              rows={5}
              value={form.description}
              onChange={set("description")}
              placeholder="Write a clear description of the internship."
            />
          </Field>

          <Field label="Responsibilities">
            <textarea
              rows={4}
              value={form.responsibilities}
              onChange={set("responsibilities")}
              placeholder="What will the intern do?"
            />
          </Field>

          <Field label="Eligibility">
            <textarea
              rows={4}
              value={form.eligibility}
              onChange={set("eligibility")}
              placeholder="Who can apply?"
            />
          </Field>
        </Section>

        <Section title="Application">
          <Field label="Application Link (optional)">
            <input
              value={form.applicationLink}
              onChange={set("applicationLink")}
              placeholder="Optional external link (Google Form etc.)"
            />
          </Field>
        </Section>

        <div className="gf-actions">
          <button className="gf-btn" type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Internship"}
          </button>

          <button
            className="gf-btn gf-btn-outline"
            type="button"
            disabled={loading}
            onClick={() => navigate("/dashboard/org")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}