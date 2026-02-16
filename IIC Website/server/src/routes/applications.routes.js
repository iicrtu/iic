import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { Application } from "../models/Application.js";
import { Internship } from "../models/Internship.js";

export const applicationsRouter = Router();

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

applicationsRouter.post("/", requireAuth, requireRole("student"), async (req, res) => {
  try {
    const studentId = req.user._id;
    const { internshipId } = req.body || {};

    if (!internshipId) {
      return res.status(400).json({ ok: false, error: "internshipId is required" });
    }

    const internship = await Internship.findById(internshipId).lean();
    if (!internship || internship.status !== "open") {
      return res.status(404).json({ ok: false, error: "Internship not found" });
    }

    if (internship.lastDateToApply instanceof Date) {
      if (!Number.isNaN(internship.lastDateToApply.getTime())) {
        if (new Date() > internship.lastDateToApply) {
          return res.status(400).json({ ok: false, error: "Application deadline has passed" });
        }
      }
    }

    const app = await Application.create({
      student: studentId,
      internship: internshipId,
      status: "pending",
    });

    return res.status(201).json({ ok: true, application: app });
  } catch (e) {
    if (e?.code === 11000) {
      return res.status(409).json({ ok: false, error: "Already applied" });
    }
    console.error("[applications] create failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

applicationsRouter.get("/mine", requireAuth, requireRole("student"), async (req, res) => {
  try {
    const page = clamp(Number(req.query.page || 1), 1, 100000);
    const limit = clamp(Number(req.query.limit || 20), 1, 50);
    const skip = (page - 1) * limit;

    const status = String(req.query.status || "").trim();
    const filter = { student: req.user._id };
    if (status && ["pending", "shortlisted", "rejected", "selected"].includes(status)) {
      filter.status = status;
    }

    const [total, applications] = await Promise.all([
      Application.countDocuments(filter),
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("internship", "title companyName locationType location duration stipend status createdAt")
        .lean(),
    ]);

    return res.json({ ok: true, page, limit, total, applications });
  } catch (e) {
    console.error("[applications] mine failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

applicationsRouter.get(
  "/internship/:internshipId",
  requireAuth,
  requireRole("organisation"),
  async (req, res) => {
    try {
      const internshipId = req.params.internshipId;

      const page = clamp(Number(req.query.page || 1), 1, 100000);
      const limit = clamp(Number(req.query.limit || 20), 1, 50);
      const skip = (page - 1) * limit;

      const status = String(req.query.status || "").trim();
      const q = String(req.query.q || "").trim();

      const internship = await Internship.findOne({
        _id: internshipId,
        createdBy: req.user._id,
      })
        .select("title companyName locationType location duration stipend status createdAt")
        .lean();

      if (!internship) {
        return res.status(404).json({ ok: false, error: "Internship not found" });
      }

      const filter = { internship: internshipId };
      if (status && ["pending", "shortlisted", "rejected", "selected"].includes(status)) {
        filter.status = status;
      }

      const [total, appsPage] = await Promise.all([
        Application.countDocuments(filter),
        Application.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate("student", "name email avatar")
          .lean(),
      ]);

      const applications = q
        ? appsPage.filter((a) => {
            const name = String(a?.student?.name || "").toLowerCase();
            const email = String(a?.student?.email || "").toLowerCase();
            return name.includes(q.toLowerCase()) || email.includes(q.toLowerCase());
          })
        : appsPage;

      return res.json({ ok: true, internship, page, limit, total, applications });
    } catch (e) {
      console.error("[applications] by internship failed:", e);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }
);

applicationsRouter.patch(
  "/:id/status",
  requireAuth,
  requireRole("organisation"),
  async (req, res) => {
    try {
      const { status } = req.body || {};
      if (!["pending", "shortlisted", "rejected", "selected"].includes(status)) {
        return res.status(400).json({ ok: false, error: "Invalid status" });
      }

      const app = await Application.findById(req.params.id);
      if (!app) return res.status(404).json({ ok: false, error: "Application not found" });

      const internship = await Internship.findOne({
        _id: app.internship,
        createdBy: req.user._id,
      })
        .select("_id")
        .lean();

      if (!internship) {
        return res.status(403).json({ ok: false, error: "Forbidden" });
      }

      app.status = status;
      await app.save();

      const updated = await Application.findById(app._id)
        .populate("student", "name email avatar")
        .populate("internship", "title companyName")
        .lean();

      return res.json({ ok: true, application: updated });
    } catch (e) {
      console.error("[applications] status update failed:", e);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }
);