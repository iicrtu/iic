import { Router } from "express";
import { Internship } from "../models/Internship.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

export const internshipsRouter = Router();

internshipsRouter.post("/", requireAuth, requireRole("organisation"), async (req, res) => {
  const b = req.body || {};

  const required = ["title", "companyName", "locationType", "duration", "description"];
  for (const key of required) {
    if (!b[key] || String(b[key]).trim() === "") {
      return res.status(400).json({ ok: false, error: `${key} is required` });
    }
  }
  if (!["remote", "on-site", "hybrid"].includes(b.locationType)) {
    return res.status(400).json({ ok: false, error: "locationType must be remote/on-site/hybrid" });
  }

  const skills =
    Array.isArray(b.skills) ? b.skills : String(b.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const internship = await Internship.create({
    createdBy: req.user._id,
    title: String(b.title).trim(),
    companyName: String(b.companyName).trim(),
    locationType: b.locationType,
    location: String(b.location || "").trim(),
    duration: String(b.duration).trim(),
    stipend: String(b.stipend || "").trim(),
    openings: Number(b.openings || 1),
    startDate: String(b.startDate || "").trim(),
    lastDateToApply: String(b.lastDateToApply || "").trim(),
    skills,
    description: String(b.description).trim(),
    responsibilities: String(b.responsibilities || "").trim(),
    eligibility: String(b.eligibility || "").trim(),
    applicationLink: String(b.applicationLink || "").trim(),
    status: "open"
  });

  res.status(201).json({ ok: true, internship });
});

internshipsRouter.get("/", async (_req, res) => {
  const internships = await Internship.find({ status: "open" })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  res.json({ ok: true, internships });
});

internshipsRouter.get("/mine", requireAuth, requireRole("organisation"), async (req, res) => {
  const internships = await Internship.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 })
    .lean();

  res.json({ ok: true, internships });
});