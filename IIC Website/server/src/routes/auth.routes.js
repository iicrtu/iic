import { Router } from "express";
import passport from "passport";
import { signToken } from "../utils/jwt.js";
import { sendMail } from "../utils/mailer.js";
import { welcomeEmail, adminNotifyNewUser } from "../utils/emailTemplates.js";
import { requireAuth } from "../middleware/auth.middleware.js";

export const authRouter = Router();

const ALLOWED_ROLES = ["student", "organisation"];

function isProd() {
  return process.env.NODE_ENV === "production";
}

function cookieOptions({ maxAgeMs }) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
    maxAge: maxAgeMs,
  };
}

function tokenCookieOptions() {
  return cookieOptions({ maxAgeMs: 7 * 24 * 60 * 60 * 1000 });
}

function pendingRoleCookieOptions() {
  return cookieOptions({ maxAgeMs: 10 * 60 * 1000 });
}

authRouter.get("/google", (req, res, next) => {
  try {
    const role = String(req.query.role || "");

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).send("Invalid role. Use student or organisation.");
    }

    res.cookie("pendingRole", role, pendingRoleCookieOptions());

    return passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      prompt: "select_account", 
    })(req, res, next);
  } catch (e) {
    return next(e);
  }
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const pendingRole = req.cookies?.pendingRole;

      if (pendingRole && ALLOWED_ROLES.includes(pendingRole)) {
        user.role = pendingRole;
        await user.save();
      }

      res.clearCookie("pendingRole", {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd(),
      });

      const token = signToken({ userId: user._id });
      res.cookie("token", token, tokenCookieOptions());

      const isNewUser = Boolean(user._isNewUser);
      const sendWelcomeAlways = String(process.env.SEND_WELCOME_ALWAYS || "false") === "true";

      console.log("[auth] google/callback:", {
        isNewUser,
        sendWelcomeAlways,
        email: user.email,
        role: user.role,
        userId: String(user._id),
      });

      if ((isNewUser || sendWelcomeAlways) && user.email) {
        try {
          const welcome = welcomeEmail({ name: user.name, role: user.role });
          await sendMail({
            to: user.email,
            subject: welcome.subject,
            html: welcome.html,
          });
          console.log("[mail] welcome email sent to:", user.email);
        } catch (mailErr) {
          console.error("[mail] welcome email failed:", mailErr?.message || mailErr);
        }

        if (process.env.ADMIN_NOTIFY_EMAIL) {
          try {
            const notify = adminNotifyNewUser({
              name: user.name,
              email: user.email,
              role: user.role,
            });

            await sendMail({
              to: process.env.ADMIN_NOTIFY_EMAIL,
              subject: notify.subject,
              html: notify.html,
            });
            console.log("[mail] admin notified:", process.env.ADMIN_NOTIFY_EMAIL);
          } catch (mailErr) {
            console.error("[mail] admin notify failed:", mailErr?.message || mailErr);
          }
        }
      } else {
        if (!user.email) console.warn("[mail] skipped: user.email missing");
      }

      if (user.role === "organisation") {
        if (!user.orgProfileCompleted) {
          return res.redirect(`${process.env.FRONTEND_URL}/onboarding/organisation`);
        }
        return res.redirect(`${process.env.FRONTEND_URL}/org/internships/new`);
      }

      return res.redirect(`${process.env.FRONTEND_URL}/dashboard/student`);
    } catch (e) {
      return next(e);
    }
  }
);

authRouter.get("/me", requireAuth, (req, res) => {
  const u = req.user;
  res.json({
    ok: true,
    user: {
      id: u._id,
      name: u.name,
      email: u.email,
      avatar: u.avatar,
      role: u.role,
    },
  });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
  });
  res.json({ ok: true });
});