import { ZodError } from "zod";

export function notFound(req, res) {
  res.status(404).json({ ok: false, error: "Not found", path: req.path });
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      error: "Validation error",
      details: err.errors
    });
  }

  console.error("[error]", err);
  res.status(500).json({ ok: false, error: "Internal server error" });
}