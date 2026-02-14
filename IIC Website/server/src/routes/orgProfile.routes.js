import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

export const orgProfileRouter = Router();

orgProfileRouter.get("/me", requireAuth, requireRole("organisation"), (req, res) => {
  res.json({
    ok: true,
    orgProfileCompleted: req.user.orgProfileCompleted,
    orgProfile: req.user.orgProfile || {}
  });
});

orgProfileRouter.post(
  "/me",
  requireAuth,
  requireRole("organisation"),
  async (req, res) => {
    const { orgName, website, contactPerson, phone, address, about } = req.body || {};

    if (!orgName || !contactPerson || !phone) {
      return res.status(400).json({
        ok: false,
        error: "orgName, contactPerson, and phone are required"
      });
    }

    req.user.orgProfile = {
      orgName: String(orgName).trim(),
      website: String(website || "").trim(),
      contactPerson: String(contactPerson).trim(),
      phone: String(phone).trim(),
      address: String(address || "").trim(),
      about: String(about || "").trim()
    };

    req.user.orgProfileCompleted = true;
    await req.user.save();

    res.json({ ok: true });
  }
);