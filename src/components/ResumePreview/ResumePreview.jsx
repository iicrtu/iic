import React from "react";
import "./ResumePreview.css";

/* ── helpers ──────────────────────────────────────────── */

export const getDomainFromUrl = (url) => {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("drive.google")) return "Google Drive";
    if (hostname.includes("docs.google")) return "Google Docs";
    if (hostname.includes("dropbox")) return "Dropbox";
    if (hostname.includes("github")) return "GitHub";
    if (hostname.includes("linkedin")) return "LinkedIn";
    if (hostname.includes("notion")) return "Notion";
    return hostname.replace("www.", "");
  } catch {
    return "Link";
  }
};

export const getEmbedUrl = (url) => {
  try {
    const parsed = new URL(url);

    // Google Drive file: /file/d/{id}/view → /file/d/{id}/preview
    if (parsed.hostname.includes("drive.google.com")) {
      const fileMatch = url.match(/\/file\/d\/([^/]+)/);
      if (fileMatch) {
        return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
      }
      const idParam = parsed.searchParams.get("id");
      if (idParam) {
        return `https://drive.google.com/file/d/${idParam}/preview`;
      }
    }

    // Google Docs/Sheets/Slides
    if (parsed.hostname.includes("docs.google.com")) {
      return url.replace(/\/(edit|view)(\?.*)?$/, "/preview");
    }

    // Dropbox
    if (parsed.hostname.includes("dropbox.com")) {
      return url
        .replace("dl=0", "raw=1")
        .replace("www.dropbox.com", "dl.dropboxusercontent.com");
    }

    return url;
  } catch {
    return url;
  }
};

/* ── component ────────────────────────────────────────── */

/**
 * Shared resume preview modal.
 *
 * @param {{ name: string, link: string }} resume  – resume object
 * @param {() => void}                     onClose – close handler
 */
const ResumePreview = ({ resume, onClose }) => {
  if (!resume) return null;

  return (
    <div className="rp-overlay" onClick={onClose}>
      <div className="rp-card" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="rp-header">
          <div className="rp-title">
            <span className="rp-icon">📄</span>
            <h3>{resume.name}</h3>
            <span className="rp-source">{getDomainFromUrl(resume.link)}</span>
          </div>
          <div className="rp-actions">
            <a
              href={resume.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rp-open-btn"
            >
              Open in new tab ↗
            </a>
            <button className="rp-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* body */}
        <div className="rp-body">
          <iframe
            src={getEmbedUrl(resume.link)}
            title={resume.name}
            className="rp-iframe"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
