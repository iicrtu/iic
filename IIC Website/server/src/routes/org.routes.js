import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { Internship } from "../models/Internship.js";
import { Application } from "../models/Application.js";

export const orgRouter = Router();

orgRouter.get("/summary", requireAuth, requireRole("organisation"), async (req, res) => {
  try {
    const orgId = req.user._id;

    const internships = await Internship.find({ createdBy: orgId }).select("_id status").lean();
    const internshipIds = internships.map((i) => i._id);

    const [totalInternships, openInternships, totalApplications] = await Promise.all([
      Internship.countDocuments({ createdBy: orgId }),
      Internship.countDocuments({ createdBy: orgId, status: "open" }),
      Application.countDocuments({ internship: { $in: internshipIds } }),
    ]);

    return res.json({
      ok: true,
      summary: { totalInternships, openInternships, totalApplications },
    });
  } catch (e) {
    console.error("[org] summary failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});