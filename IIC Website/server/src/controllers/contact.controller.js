import { z } from "zod";
import { ContactMessage } from "../models/ContactMessage.js";

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000)
});

export async function submitContact(req, res, next) {
  try {
    const parsed = contactSchema.parse(req.body);

    const doc = await ContactMessage.create(parsed);

    res.status(201).json({
      ok: true,
      message: "Message received",
      id: doc._id
    });
  } catch (err) {
    next(err);
  }
}