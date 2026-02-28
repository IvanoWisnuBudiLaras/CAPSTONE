// @ts-check
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/** @param {import("express").Express} app */
export function applySecurityMiddleware(app) {
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
}