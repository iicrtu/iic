import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgOnboarding.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrgOnboarding() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        orgName: "",
        website: "",
        contactPerson: "",
        phone: "",
        address: "",
        about: ""
    });
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // if already completed, skip
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/org-profile/me`, {
                    credentials: "include"
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.error || "Failed to load profile");

                if (data.orgProfileCompleted) {
                    navigate("/dashboard/org");
                    return;
                }

                setForm((prev) => ({ ...prev, ...(data.orgProfile || {}) }));
            } catch (e) {
                // not logged in / not org -> back to login
                navigate("/login");
            } finally {
                setPageLoading(false);
            }
        })();
    }, [navigate]);

    const onChange = (key) => (e) => {
        setForm((p) => ({ ...p, [key]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/org-profile/me`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Failed to save details");

            navigate("/org/internships/new");
        } catch (e2) {
            setError(e2.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="oo-wrap">Loading…</div>;

    return (
        <div className="oo-wrap">
            <div className="oo-card">
                <h1 className="oo-title">Organisation Details</h1>
                <p className="oo-subtitle">
                    Please fill these details to continue to your dashboard.
                </p>

                {error ? <div className="oo-error">{error}</div> : null}

                <form onSubmit={onSubmit} className="oo-form">
                    <div className="oo-grid">
                        <label className="oo-field">
                            <span>Organisation Name *</span>
                            <input value={form.orgName} onChange={onChange("orgName")} required />
                        </label>

                        <label className="oo-field">
                            <span>Website</span>
                            <input value={form.website} onChange={onChange("website")} placeholder="https://..." />
                        </label>

                        <label className="oo-field">
                            <span>Contact Person *</span>
                            <input value={form.contactPerson} onChange={onChange("contactPerson")} required />
                        </label>

                        <label className="oo-field">
                            <span>Phone *</span>
                            <input value={form.phone} onChange={onChange("phone")} required />
                        </label>
                    </div>

                    <label className="oo-field">
                        <span>Address</span>
                        <input value={form.address} onChange={onChange("address")} />
                    </label>

                    <label className="oo-field">
                        <span>About</span>
                        <textarea value={form.about} onChange={onChange("about")} rows={4} />
                    </label>

                    <button className="oo-btn" type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save & Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
}