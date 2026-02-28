// @ts-check
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { applySecurityMiddleware } from "./middleware/security.js";
import { authenticate, authorize } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
applySecurityMiddleware(app);

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.get("/api/users", authenticate, authorize("admin"), (req, res) => {
  res.json({ success: true, data: [] });
});

app.listen(PORT, () => console.log(`🚀 API → http://localhost:${PORT}`));