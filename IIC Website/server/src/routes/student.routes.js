import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { Application } from "../models/Application.js";

export const studentRouter = Router();

studentRouter.get("/summary", requireAuth, requireRole("student"), async (req, res) => {
  const studentId = req.user._id;

  const total = await Application.countDocuments({ student: studentId });
  const pending = await Application.countDocuments({ student: studentId, status: "pending" });
  const shortlisted = await Application.countDocuments({ student: studentId, status: "shortlisted" });
  const selected = await Application.countDocuments({ student: studentId, status: "selected" });

  res.json({
    ok: true,
    summary: { total, pending, shortlisted, selected }
  });
});

studentRouter.get("/applications", requireAuth, requireRole("student"), async (req, res) => {
  const studentId = req.user._id;

  const applications = await Application.find({ student: studentId })
    .sort({ createdAt: -1 })
    .populate("internship")
    .lean();

  res.json({ ok: true, applications });
});