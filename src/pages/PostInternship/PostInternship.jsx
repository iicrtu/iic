import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import "./PostInternship.css";

const WORK_MODES = ["Office", "Remote", "Hybrid"];

const PostInternship = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form fields
  const [profile, setProfile] = useState("");
  const [mode, setMode] = useState("Office");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [openings, setOpenings] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");

  // Fetch internship data if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchInternship();
    }
  }, [id]);

  const fetchInternship = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/internships/${id}`,
        {
          credentials: "include",
          cache: "no-cache",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const internship = data.internship;

        setProfile(internship.profile);
        setMode(internship.mode);
        setLocation(internship.location || "");
        setDuration(internship.duration);
        setStipend(internship.stipend);
        setOpenings(internship.openings.toString());
        setSkills(internship.skills || []);
        setSkillsInput((internship.skills || []).join(", "));
        setDescription(internship.description);
      } else {
        setError("Failed to load internship details");
      }
    } catch (error) {
      setError("An error occurred while loading internship");
    }
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);
    const skillsArray = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setSkills(skillsArray);
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    setSkillsInput(newSkills.join(", "));
  };

  const validateSection1 = () => {
    if (!profile.trim()) {
      setError("Profile/Role is required");
      return false;
    }
    if (!mode) {
      setError("Work mode is required");
      return false;
    }
    if (mode !== "Remote" && !location.trim()) {
      setError("Location is required for Office and Hybrid modes");
      return false;
    }
    return true;
  };

  const validateSection2 = () => {
    if (!duration.trim()) {
      setError("Duration is required");
      return false;
    }
    if (!stipend.trim()) {
      setError("Stipend is required");
      return false;
    }
    if (!openings || parseInt(openings) < 1) {
      setError("Number of openings must be at least 1");
      return false;
    }
    return true;
  };

  const validateSection3 = () => {
    if (skills.length === 0) {
      setError("At least one skill is required");
      return false;
    }
    if (!description.trim()) {
      setError("Description is required");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (currentSection === 1 && validateSection1()) {
      setCurrentSection(2);
    } else if (currentSection === 2 && validateSection2()) {
      setCurrentSection(3);
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateSection3()) return;

    setLoading(true);

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/internships/${id}`
        : `${import.meta.env.VITE_API_URL}/api/internships`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          profile,
          mode,
          location: mode === "Remote" ? "" : location,
          duration,
          stipend,
          openings: parseInt(openings),
          skills,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to save internship");
        setLoading(false);
        return;
      }

      // Invalidate cached internship list so dashboard shows fresh data
      queryClient.invalidateQueries({ queryKey: ["orgInternships"] });

      if (isEditing) {
        navigate("/dashboard/organisation");
      } else {
        setSubmitSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="post-internship-page">
      {submitSuccess ? (
        <div className="post-internship-card post-success-card">
          <div className="post-success-icon">✅</div>
          <h2 className="post-internship-title post-success-title">
            Submitted for Review
          </h2>
          <p className="post-success-text">
            Your internship has been submitted for admin review.<br />
            You'll be notified once it's approved and goes live.
          </p>
          <button
            className="next-btn post-success-btn"
            onClick={() => navigate("/dashboard/organisation")}
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
      <div className="post-internship-card">
        <h1 className="post-internship-title">
          {isEditing ? "Edit Internship" : "Post New Internship"}
        </h1>
        <p className="post-internship-subtitle">
          {isEditing
            ? "Update the internship details below."
            : "Fill in the details to create a new internship opportunity."}
        </p>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${currentSection >= 1 ? "active" : ""} ${currentSection > 1 ? "completed" : ""}`}>
            <div className="step-number">{currentSection > 1 ? "✓" : "1"}</div>
            <span className="step-label">Role & Location</span>
          </div>
          <div className={`progress-line ${currentSection > 1 ? "active" : ""}`}></div>
          <div className={`progress-step ${currentSection >= 2 ? "active" : ""} ${currentSection > 2 ? "completed" : ""}`}>
            <div className="step-number">{currentSection > 2 ? "✓" : "2"}</div>
            <span className="step-label">Compensation</span>
          </div>
          <div className={`progress-line ${currentSection > 2 ? "active" : ""}`}></div>
          <div className={`progress-step ${currentSection >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <span className="step-label">Skills & Details</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="internship-form" onSubmit={handleSubmit}>
          {/* Section 1: Role & Location */}
          {currentSection === 1 && (
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">💼</span>
                Role & Location
              </h2>

              <div className="form-group">
                <label>
                  Profile / Role <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Full Stack Developer, UI/UX Designer"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  disabled={isEditing}
                />
                <small className="form-hint">
                  {isEditing
                    ? "Profile / Role cannot be changed after posting"
                    : "The title candidates will see when browsing internships"}
                </small>
              </div>

              <div className="form-group">
                <label>
                  Work Mode <span className="required">*</span>
                </label>
                <div className="mode-selector">
                  {WORK_MODES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`mode-option ${mode === m ? "selected" : ""}`}
                      onClick={() => setMode(m)}
                    >
                      <span className="mode-icon">
                        {m === "Office" ? "🏢" : m === "Remote" ? "🏠" : "🔄"}
                      </span>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {mode !== "Remote" && (
                <div className="form-group">
                  <label>
                    Location <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Jaipur, Rajasthan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Section 2: Duration & Compensation */}
          {currentSection === 2 && (
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">💰</span>
                Duration & Compensation
              </h2>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Duration <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3 months, 6 months"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={isEditing}
                  />
                  {isEditing && (
                    <small className="form-hint">Duration cannot be changed after posting</small>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Stipend <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ₹10,000/month, Unpaid"
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    disabled={isEditing}
                  />
                  {isEditing && (
                    <small className="form-hint">Stipend cannot be changed after posting</small>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Number of Openings <span className="required">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g., 5"
                  value={openings}
                  onChange={(e) => setOpenings(e.target.value)}
                />
                <small className="form-hint">
                  How many candidates are you looking to hire?
                </small>
              </div>
            </div>
          )}

          {/* Section 3: Skills & Description */}
          {currentSection === 3 && (
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">🛠️</span>
                Skills & Description
              </h2>

              <div className="form-group">
                <label>
                  Skills Required <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Type skills separated by commas (e.g., React, Node.js, MongoDB)"
                  value={skillsInput}
                  onChange={handleSkillsChange}
                />
                {skills.length > 0 && (
                  <div className="skills-tags">
                    {skills.map((skill, index) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                        <button
                          type="button"
                          className="remove-skill"
                          onClick={() => removeSkill(index)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <small className="form-hint">
                  {skills.length} skill{skills.length !== 1 ? "s" : ""} added
                </small>
              </div>

              <div className="form-group">
                <label>
                  Description <span className="required">*</span>
                </label>
                <textarea
                  rows="8"
                  placeholder="Describe the internship role, day-to-day responsibilities, what the intern will learn, and any requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <small className="form-hint">
                  A detailed description helps attract the right candidates
                </small>
              </div>
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
                onClick={() => navigate("/dashboard/organisation")}
                disabled={loading}
              >
                Cancel
              </button>
            )}

            {currentSection < 3 ? (
              <button key="next-btn" type="button" className="next-btn" onClick={handleNext}>
                Next →
              </button>
            ) : (
              <button key="submit-btn" type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Internship"
                  : "Post Internship"}
              </button>
            )}
          </div>
        </form>
      </div>
      )}
    </div>
  );
};

export default PostInternship;
