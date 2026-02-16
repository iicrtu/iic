import { Router } from "express";
import { Internship } from "../models/Internship.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

export const internshipsRouter = Router();

function parseSkills(skills) {
  if (Array.isArray(skills)) {
    return skills.map((s) => String(s).trim()).filter(Boolean);
  }
  return String(skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toInt(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

internshipsRouter.post("/", requireAuth, requireRole("organisation"), async (req, res) => {
  try {
    const b = req.body || {};

    const required = ["title", "companyName", "locationType", "duration", "description"];
    for (const key of required) {
      if (!b[key] || String(b[key]).trim() === "") {
        return res.status(400).json({ ok: false, error: `${key} is required` });
      }
    }

    const locationType = String(b.locationType || "").trim();
    if (!["remote", "on-site", "hybrid"].includes(locationType)) {
      return res.status(400).json({
        ok: false,
        error: "locationType must be remote/on-site/hybrid",
      });
    }

    const internship = await Internship.create({
      createdBy: req.user._id,

      title: String(b.title).trim(),
      companyName: String(b.companyName).trim(),

      locationType,
      location: String(b.location || "").trim(),

      duration: String(b.duration).trim(),
      stipend: String(b.stipend || "").trim(),

      openings: toInt(b.openings, 1),

      startDate: parseDate(b.startDate),
      lastDateToApply: parseDate(b.lastDateToApply),

      skills: parseSkills(b.skills),

      description: String(b.description).trim(),
      responsibilities: String(b.responsibilities || "").trim(),
      eligibility: String(b.eligibility || "").trim(),

      applicationLink: String(b.applicationLink || "").trim(),

      status: "open",
    });

    return res.status(201).json({ ok: true, internship });
  } catch (e) {
    console.error("[internships] create failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

internshipsRouter.get("/", async (req, res) => {
  try {
    const page = clamp(Number(req.query.page || 1), 1, 100000);
    const limit = clamp(Number(req.query.limit || 20), 1, 50);
    const skip = (page - 1) * limit;

    const q = String(req.query.q || "").trim();
    const locationType = String(req.query.locationType || "").trim();

    const filter = { status: "open" };

    if (locationType && ["remote", "on-site", "hybrid"].includes(locationType)) {
      filter.locationType = locationType;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { companyName: { $regex: q, $options: "i" } },
        { skills: { $in: [new RegExp(q, "i")] } },
      ];
    }

    const [total, internships] = await Promise.all([
      Internship.countDocuments(filter),
      Internship.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    return res.json({ ok: true, page, limit, total, internships });
  } catch (e) {
    console.error("[internships] list failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

internshipsRouter.get("/mine", requireAuth, requireRole("organisation"), async (req, res) => {
  try {
    const page = clamp(Number(req.query.page || 1), 1, 100000);
    const limit = clamp(Number(req.query.limit || 20), 1, 50);
    const skip = (page - 1) * limit;

    const status = String(req.query.status || "").trim();

    const filter = { createdBy: req.user._id };
    if (status && ["open", "closed"].includes(status)) {
      filter.status = status;
    }

    const [total, internships] = await Promise.all([
      Internship.countDocuments(filter),
      Internship.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    return res.json({ ok: true, page, limit, total, internships });
  } catch (e) {
    console.error("[internships] mine failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

internshipsRouter.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).lean();
    if (!internship) {
      return res.status(404).json({ ok: false, error: "Internship not found" });
    }

    if (internship.status !== "open") {
      return res.status(404).json({ ok: false, error: "Internship not found" });
    }

    return res.json({ ok: true, internship });
  } catch (e) {
    console.error("[internships] details failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

internshipsRouter.patch("/:id/status", requireAuth, requireRole("organisation"), async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["open", "closed"].includes(status)) {
      return res.status(400).json({ ok: false, error: "status must be open/closed" });
    }

    const internship = await Internship.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ ok: false, error: "Internship not found" });
    }

    internship.status = status;
    await internship.save();

    return res.json({ ok: true, internship });
  } catch (e) {
    console.error("[internships] status update failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

internshipsRouter.get(
  "/_debug/all",
  requireAuth,
  requireRole("organisation"),
  async (req, res) => {
    try {
      const internships = await Internship.find({ createdBy: req.user._id })
        .sort({ createdAt: -1 })
        .lean();

      return res.json({ ok: true, count: internships.length, internships });
    } catch (e) {
      console.error("[internships] debug failed:", e);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }
);