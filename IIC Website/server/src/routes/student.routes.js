import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { Application } from "../models/Application.js";

export const studentRouter = Router();

studentRouter.get("/me", requireAuth, requireRole("student"), async (req, res) => {
  try {
    const u = req.user;

    const studentProfile = u.studentProfile || {
      college: u.college || "",
      course: u.course || "",
      year: u.year || "",
      skills: u.skills || [],
      resumeUrl: u.resumeUrl || "",
      phone: u.phone || "",
    };

    return res.json({
      ok: true,
      studentProfile,
      user: {
        id: u._id,
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        role: u.role,
      },
    });
  } catch (e) {
    console.error("[student] me failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

studentRouter.get("/summary", requireAuth, requireRole("student"), async (req, res) => {
  try {
    const studentId = req.user._id;

    const [totalApplications, pending, shortlisted, selected, rejected] = await Promise.all([
      Application.countDocuments({ student: studentId }),
      Application.countDocuments({ student: studentId, status: "pending" }),
      Application.countDocuments({ student: studentId, status: "shortlisted" }),
      Application.countDocuments({ student: studentId, status: "selected" }),
      Application.countDocuments({ student: studentId, status: "rejected" }),
    ]);

    return res.json({
      ok: true,
      summary: { totalApplications, pending, shortlisted, selected, rejected },
    });
  } catch (e) {
    console.error("[student] summary failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

studentRouter.get("/applications", requireAuth, requireRole("student"), async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(50, Math.max(1, Number(req.query.limit || 20)));
    const skip = (page - 1) * limit;

    const filter = { student: req.user._id };

    const [total, applications] = await Promise.all([
      Application.countDocuments(filter),
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("internship")
        .lean(),
    ]);

    return res.json({ ok: true, page, limit, total, applications });
  } catch (e) {
    console.error("[student] applications failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});