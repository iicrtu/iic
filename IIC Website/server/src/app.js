import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";

import { initPassport } from "./config/passport.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { contactRouter } from "./routes/contact.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { orgProfileRouter } from "./routes/orgProfile.routes.js";
import { orgRouter } from "./routes/org.routes.js";
import { internshipsRouter } from "./routes/internships.routes.js";
import { studentRouter } from "./routes/student.routes.js";
import { applicationsRouter } from "./routes/applications.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  initPassport();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true 
    })
  );

  app.get("/", (_req, res) => res.json({ ok: true, service: "iic-backend" }));

  app.use("/api/auth", authRouter);
  app.use("/api/health", healthRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api/org-profile", orgProfileRouter);
  app.use("/api/org", orgRouter);
  app.use("/api/internships", internshipsRouter);
  app.use("/api/student", studentRouter);
  app.use("/api/applications", applicationsRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}