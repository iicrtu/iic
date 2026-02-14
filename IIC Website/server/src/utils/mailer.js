import nodemailer from "nodemailer";

let cachedTransporter = null;

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP env vars. Required: SMTP_HOST, SMTP_USER, SMTP_PASS (and optionally SMTP_PORT, SMTP_SECURE, FROM_EMAIL)"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },

    tls: {
      rejectUnauthorized:
        String(process.env.SMTP_REJECT_UNAUTHORIZED || "true") === "true",
    },
  });
}

export function createTransporter() {
  if (!cachedTransporter) cachedTransporter = buildTransporter();
  return cachedTransporter;
}

export async function sendMail({ to, subject, html }) {
  const transporter = createTransporter();

  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (process.env.NODE_ENV !== "production" && process.env.SMTP_VERIFY === "true") {
    await transporter.verify();
  }

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}