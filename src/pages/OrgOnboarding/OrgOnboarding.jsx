import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgOnboarding.css";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Consulting",
  "Marketing & Advertising",
  "Real Estate",
  "Hospitality",
  "Retail",
  "Transportation & Logistics",
  "Energy & Utilities",
  "Media & Entertainment",
  "Non-Profit",
  "Government",
  "Agriculture",
  "Construction",
  "Telecommunications",
  "Other",
];

const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const OrgOnboarding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSection, setCurrentSection] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  // Organization Details
  const [organizationName, setOrganizationName] = useState("");
  const [about, setAbout] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [teamSize, setTeamSize] = useState("");

  // Contact Details
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");

  // Fetch user data and check if already completed
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/organization/profile`,
          {
            credentials: "include",
            cache: "no-cache",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.organization) {
            // Pre-fill form with existing data (for both new and existing profiles)
            const org = data.organization;
            
            // Check if this is an edit (profile already completed)
            if (org.onboardingCompleted) {
              setIsEditing(true);
            }
            
            setOrganizationName(org.organizationName || "");
            setAbout(org.about || "");
            setIndustry(org.industry || "Technology");
            setAddress(org.address || "");
            setWebsite(org.website || "");
            setTeamSize(org.teamSize || "");
            setContactName(org.contactPerson?.name || "");
            setContactEmail(org.contactPerson?.email || "");
            setContactMobile(org.contactPerson?.mobile || "");
            setAlternateMobile(org.contactPerson?.alternateMobile || "");
          }
        }
      } catch (error) {
        console.error("Error checking onboarding:", error);
      }
    };

    checkOnboarding();
  }, [navigate]);

  const validateSection1 = () => {
    if (!organizationName.trim()) {
      setError("Organization name is required");
      return false;
    }
    if (!about.trim()) {
      setError("About section is required");
      return false;
    }
    if (!industry) {
      setError("Please select an industry");
      return false;
    }
    if (!address.trim()) {
      setError("Address is required");
      return false;
    }
    return true;
  };

  const validateSection2 = () => {
    if (!contactName.trim()) {
      setError("Contact person name is required");
      return false;
    }
    if (!contactEmail.trim()) {
      setError("Contact email is required");
      return false;
    }
    if (!contactMobile.trim()) {
      setError("Contact mobile number is required");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setError("Please enter a valid email address");
      return false;
    }
    // Basic mobile validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(contactMobile.replace(/\s+/g, ""))) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (validateSection1()) {
      setCurrentSection(2);
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentSection(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateSection2()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/organization/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            organizationName,
            about,
            industry,
            address,
            website: website.trim() || undefined,
            teamSize: teamSize || undefined,
            contactPerson: {
              name: contactName,
              email: contactEmail,
              mobile: contactMobile,
              alternateMobile: alternateMobile.trim() || undefined,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to save profile");
        setLoading(false);
        return;
      }

      // Success - redirect to dashboard
      navigate("/dashboard/organisation");
    } catch (error) {
      console.error("Onboarding error:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <h1 className="onboarding-title">
          {isEditing ? "Edit Your Organisation Profile" : "Complete Your Organisation Profile"}
        </h1>
        <p className="onboarding-subtitle">
          {isEditing 
            ? "Update your organization information below." 
            : "Help us know more about your organization to get started."}
        </p>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${currentSection >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-label">Organization Details</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentSection >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Contact Details</div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="onboarding-form" onSubmit={handleSubmit}>
          {/* Section 1: Organization Details */}
          {currentSection === 1 && (
            <div className="form-section">
              <h2 className="section-title">Organization Details</h2>

              <div className="form-group">
                <label>
                  Organization/Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  About <span className="required">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your organization..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>
                  Industry <span className="required">*</span>
                </label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  Address <span className="required">*</span>
                </label>
                <textarea
                  rows="3"
                  placeholder="Organization address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Team Size</label>
                <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
                  <option value="">Select team size</option>
                  {TEAM_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="next-btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Section 2: Contact Details */}
          {currentSection === 2 && (
            <div className="form-section">
              <h2 className="section-title">Contact Details</h2>

              <div className="form-group">
                <label>
                  Contact Person / HR Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter contact person name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="1234567890"
                  value={contactMobile}
                  onChange={(e) => setContactMobile(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Alternate Mobile Number</label>
                <input
                  type="tel"
                  placeholder="1234567890 (optional)"
                  value={alternateMobile}
                  onChange={(e) => setAlternateMobile(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Saving..." : (isEditing ? "Update Profile" : "Complete Setup")}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrgOnboarding;
