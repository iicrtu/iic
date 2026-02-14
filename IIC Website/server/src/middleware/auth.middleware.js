import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ ok: false, error: "Not authenticated" });

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ ok: false, error: "User not found" });

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: "Invalid/expired token" });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ ok: false, error: "Not authenticated" });
    if (req.user.role !== role) return res.status(403).json({ ok: false, error: "Forbidden" });
    next();
  };
}