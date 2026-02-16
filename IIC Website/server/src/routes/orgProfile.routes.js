import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

export const orgProfileRouter = Router();

function isValidUrl(url) {
  if (!url) return true; 
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeUrl(url) {
  const v = String(url || "").trim();
  if (!v) return "";
  if (!/^https?:\/\//i.test(v)) return `https://${v}`;
  return v;
}

orgProfileRouter.get("/me", requireAuth, requireRole("organisation"), async (req, res) => {
  try {
    return res.json({
      ok: true,
      orgProfileCompleted: Boolean(req.user.orgProfileCompleted),
      orgProfile: req.user.orgProfile || {},
    });
  } catch (e) {
    console.error("[org-profile] get /me failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

orgProfileRouter.post("/me", requireAuth, requireRole("organisation"), async (req, res) => {
  try {
    const { orgName, website, contactPerson, phone, address, about } = req.body || {};

    if (!orgName || !contactPerson || !phone) {
      return res.status(400).json({
        ok: false,
        error: "orgName, contactPerson, and phone are required",
      });
    }

    const normalizedWebsite = normalizeUrl(website);
    if (!isValidUrl(normalizedWebsite)) {
      return res.status(400).json({ ok: false, error: "website must be a valid URL" });
    }

    req.user.orgProfile = {
      orgName: String(orgName).trim(),
      website: normalizedWebsite,
      contactPerson: String(contactPerson).trim(),
      phone: String(phone).trim(),
      address: String(address || "").trim(),
      about: String(about || "").trim(),
    };

    req.user.orgProfileCompleted = true;
    await req.user.save();

    return res.json({
      ok: true,
      orgProfileCompleted: true,
      orgProfile: req.user.orgProfile,
    });
  } catch (e) {
    console.error("[org-profile] post /me failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});