import React, { useState } from "react";
import "./Contact.css";
import instagramIcon from "../../assets/instagram-icon.png";
import linkedinIcon from "../../assets/linkedin-icon.png";
import {
  CONTACT_SECTION,
  CONTACT_INFO,
  CONTACT_FORM,
  SOCIAL_SECTION,
} from "../../constants/contactConstants";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" }); // type: "ok" | "err"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "err", text: CONTACT_FORM.errorMessage });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus({ type: "ok", text: CONTACT_FORM.successMessage });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "err",
        text: err?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <h2 className="section-title">{CONTACT_SECTION.title}</h2>
      <p className="section-description">{CONTACT_SECTION.description}</p>

      <div className="contact-container">
        <div className="contact-left-column">
          <div className="contact-info">
            <h3 className="contact-subtitle">{CONTACT_INFO.subtitle}</h3>
            <p className="contact-text">{CONTACT_INFO.text}</p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"></div>
                <div className="contact-info-content">
                  <span className="contact-label">{CONTACT_INFO.email.label}</span>
                  <span className="contact-value">{CONTACT_INFO.email.value}</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"></div>
                <div className="contact-info-content">
                  <span className="contact-label">{CONTACT_INFO.phone.label}</span>
                  <span className="contact-value">{CONTACT_INFO.phone.value}</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"></div>
                <div className="contact-info-content">
                  <span className="contact-label">{CONTACT_INFO.location.label}</span>
                  <span className="contact-value">{CONTACT_INFO.location.value}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3 className="contact-subtitle">{SOCIAL_SECTION.subtitle}</h3>
            <p className="contact-text">{SOCIAL_SECTION.text}</p>

            <div className="social-links">
              {SOCIAL_SECTION.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={index === 0 ? instagramIcon : linkedinIcon}
                    alt={link.alt}
                  />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h3 className="contact-subtitle">{CONTACT_FORM.subtitle}</h3>
          <p className="contact-text">{CONTACT_FORM.text}</p>

          {status.text ? (
            <div
              className={`contact-status ${
                status.type === "ok" ? "contact-status-ok" : "contact-status-err"
              }`}
            >
              {status.text}
            </div>
          ) : null}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{CONTACT_FORM.placeholders.name}</label>
              <input
                type="text"
                name="name"
                placeholder={`Your ${CONTACT_FORM.placeholders.name}`}
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{CONTACT_FORM.placeholders.email}</label>
              <input
                type="email"
                name="email"
                placeholder={CONTACT_FORM.placeholders.email}
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                placeholder={CONTACT_FORM.placeholders.message}
                className="form-textarea"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              ></textarea>
            </div>

            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? "SENDING..." : CONTACT_FORM.buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;