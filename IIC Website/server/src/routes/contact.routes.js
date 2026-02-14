import { Router } from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { sendMail } from "../utils/mailer.js";

export const contactRouter = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

contactRouter.post("/", async (req, res) => {
  try {
    console.log("[contact] body:", req.body);

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        error: "name, email and message are required",
      });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }
    if (String(message).trim().length < 5) {
      return res.status(400).json({ ok: false, error: "Message too short" });
    }

    const doc = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      ip:
        req.headers["x-forwarded-for"]?.toString()?.split(",")[0]?.trim() ||
        req.socket?.remoteAddress ||
        "",
      userAgent: req.headers["user-agent"] || "",
    });

    if (process.env.ADMIN_NOTIFY_EMAIL) {
      try {
        await sendMail({
          to: process.env.ADMIN_NOTIFY_EMAIL,
          subject: `New Contact Message: ${doc.name}`,
          html: `
            <h3>New Contact Message</h3>
            <p><b>Name:</b> ${doc.name}</p>
            <p><b>Email:</b> ${doc.email}</p>
            <p><b>Message:</b><br/>${doc.message.replace(/\n/g, "<br/>")}</p>
            <hr/>
            <p><small>Saved in DB: ${doc._id}</small></p>
          `,
        });
      } catch (e) {
        console.error("[contact] admin email failed:", e?.message || e);
      }
    }

    return res.status(201).json({ ok: true, message: "Message received" });
  } catch (e) {
    console.error("[contact] failed:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});