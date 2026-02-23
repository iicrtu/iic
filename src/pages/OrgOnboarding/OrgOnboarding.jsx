import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgOnboarding.css";

const OrgOnboarding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSkip = () => {
    alert("Organisation onboarding skipped! You can complete your profile later.");
    navigate("/dashboard/organisation");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // For now, just show alert and redirect
    setTimeout(() => {
      alert("Organisation profile saved successfully!");
      navigate("/dashboard/organisation");
    }, 1000);
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <h1 className="onboarding-title">Complete Your Organisation Profile</h1>
        <p className="onboarding-subtitle">
          Help us know more about your organization.
        </p>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name</label>
            <input type="text" placeholder="Enter organization name" required />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input type="url" placeholder="https://example.com" />
          </div>

          <div className="form-group">
            <label>Contact Person</label>
            <input type="text" placeholder="Contact person name" required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="+91 1234567890" required />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea rows="3" placeholder="Organization address" required></textarea>
          </div>

          <div className="form-group">
            <label>About</label>
            <textarea rows="4" placeholder="Tell us about your organization" required></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="skip-btn" onClick={handleSkip}>
              Skip for Now
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrgOnboarding;
