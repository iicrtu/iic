import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./StudentOnboarding.css";

const BRANCHES = [
  "AE",
  "CE",
  "Ch.E",
  "CSE",
  "EE",
  "ECE",
  "EIC",
  "IT",
  "ME",
  "PE",
  "PIC",
  "PCE",
  "Other",
];

const COURSES = ["BTech", "BBA", "MBA", "MTech"];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const StudentOnboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSection, setCurrentSection] = useState(
    parseInt(searchParams.get("section")) === 2 ? 2 : 1
  );
  const [isEditing, setIsEditing] = useState(false);

  // Personal Details
  const [fullName, setFullName] = useState("");
  const [branch, setBranch] = useState("Computer Science");
  const [crNumber, setCrNumber] = useState("");
  const [urNumber, setUrNumber] = useState("");
  const [year, setYear] = useState("1st Year");
  const [course, setCourse] = useState("BTech");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Resumes
  const [resumes, setResumes] = useState([{ name: "", link: "" }]);

  // Fetch existing data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/student/profile`,
          {
            credentials: "include",
            cache: "no-cache",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.student) {
            const s = data.student;

            if (s.onboardingCompleted) {
              setIsEditing(true);
            }

            setFullName(s.fullName || "");
            setBranch(s.branch || "Computer Science");
            setCrNumber(s.crNumber || "");
            setUrNumber(s.urNumber || "");
            setYear(s.year || "1st Year");
            setCourse(s.course || "BTech");
            setPhone(s.phone || "");
            setEmail(s.email || "");

            if (s.resumes && s.resumes.length > 0) {
              setResumes(s.resumes.map((r) => ({ name: r.name, link: r.link })));
            }
          }
        }
      } catch (error) {
        // silently fail — profile may not exist yet
      }
    };

    fetchProfile();
  }, []);

  const handleUrNumberChange = (e) => {
    setUrNumber(e.target.value.toUpperCase());
  };

  // Resume handlers
  const addResume = () => {
    if (resumes.length >= 15) {
      setError("Maximum 15 resumes allowed");
      return;
    }
    setResumes([...resumes, { name: "", link: "" }]);
  };

  const removeResume = (index) => {
    if (resumes.length <= 1) return;
    setResumes(resumes.filter((_, i) => i !== index));
  };

  const updateResume = (index, field, value) => {
    const updated = [...resumes];
    updated[index][field] = value;
    setResumes(updated);
  };

  // Validation
  const validateSection1 = () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!branch) {
      setError("Please select a branch");
      return false;
    }
    if (!crNumber.trim()) {
      setError("C.R Number is required");
      return false;
    }
    if (!urNumber.trim()) {
      setError("U.R Number is required");
      return false;
    }
    if (!year) {
      setError("Please select your year");
      return false;
    }
    if (!course) {
      setError("Please select your course");
      return false;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    const phoneClean = phone.replace(/\s+/g, "");
    if (!/^\d{10}$/.test(phoneClean)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!email.trim()) {
      setError("Professional email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateSection2 = () => {
    // Filter out completely empty rows
    const filledResumes = resumes.filter(
      (r) => r.name.trim() || r.link.trim()
    );

    // Check that partially filled rows are complete
    for (const r of filledResumes) {
      if (!r.name.trim()) {
        setError("Each resume must have a name");
        return false;
      }
      if (!r.link.trim()) {
        setError("Each resume must have a link");
        return false;
      }
      // Basic URL validation
      try {
        new URL(r.link);
      } catch {
        setError(`"${r.name}" has an invalid URL. Please enter a valid link.`);
        return false;
      }
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

    if (!validateSection2()) return;

    setLoading(true);

    // Filter out empty resume rows
    const filledResumes = resumes.filter(
      (r) => r.name.trim() && r.link.trim()
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/student/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullName,
            branch,
            crNumber,
            urNumber,
            year,
            course,
            phone,
            email,
            resumes: filledResumes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to save profile");
        setLoading(false);
        return;
      }

      navigate("/dashboard/student");
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <h1 className="onboarding-title">
          {isEditing ? "Edit Your Student Profile" : "Complete Your Student Profile"}
        </h1>
        <p className="onboarding-subtitle">
          {isEditing
            ? "Update your information below."
            : "Help us know more about you to get started."}
        </p>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div
            className={`progress-step ${currentSection >= 1 ? "active" : ""} ${
              currentSection > 1 ? "completed" : ""
            }`}
          >
            <div className="step-number">
              {currentSection > 1 ? "✓" : "1"}
            </div>
            <span className="step-label">Personal Details</span>
          </div>
          <div className={`progress-line ${currentSection > 1 ? "active" : ""}`}></div>
          <div
            className={`progress-step ${currentSection >= 2 ? "active" : ""}`}
          >
            <div className="step-number">2</div>
            <span className="step-label">Resumes</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="onboarding-form" onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          {currentSection === 1 && (
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">👤</span>
                Personal Details
              </h2>

              <div className="form-group">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Course <span className="required">*</span>
                  </label>
                  <select value={course} onChange={(e) => setCourse(e.target.value)}>
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Branch <span className="required">*</span>
                  </label>
                  <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    C.R No. <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2x/xxx"
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    U.R No. <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 23EUCCS0XX"
                    value={urNumber}
                    onChange={handleUrNumberChange}
                  />
                  <small className="form-hint">Auto-capitalized</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Year <span className="required">*</span>
                  </label>
                  <select value={year} onChange={(e) => setYear(e.target.value)}>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Phone (WhatsApp preferred) <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Professional Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g., yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small className="form-hint">
                  A professional email for recruiters to reach you
                </small>
              </div>
            </div>
          )}

          {/* Section 2: Resumes */}
          {currentSection === 2 && (
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📄</span>
                Resumes
              </h2>
              <p className="section-description">
                Add links to your resumes (Google Drive, Dropbox, etc.). Give each a descriptive name.
              </p>

              <div className="resume-list">
                {resumes.map((resume, index) => (
                  <div key={`${resume.name}-${index}`} className="resume-row">
                    <div className="resume-number">{index + 1}</div>
                    <div className="resume-fields">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Resume name (e.g., SDE Resume)"
                          value={resume.name}
                          onChange={(e) =>
                            updateResume(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="url"
                          placeholder="Paste link here (e.g., https://drive.google.com/...)"
                          value={resume.link}
                          onChange={(e) =>
                            updateResume(index, "link", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    {resumes.length > 1 && (
                      <button
                        type="button"
                        className="remove-resume-btn"
                        onClick={() => removeResume(index)}
                        title="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {resumes.length < 15 && (
                <button
                  type="button"
                  className="add-resume-btn"
                  onClick={addResume}
                >
                  + Add Another Resume
                </button>
              )}

              <small className="form-hint resume-hint">
                {resumes.length}/15 resume slots used. You can leave this section empty and add later.
              </small>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            {currentSection > 1 ? (
              <button type="button" className="back-btn" onClick={handleBack}>
                ← Back
              </button>
            ) : (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>
            )}

            {currentSection < 2 ? (
              <button
                key="next-btn"
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button
                key="submit-btn"
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Profile"
                  : "Complete Profile"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentOnboarding;
