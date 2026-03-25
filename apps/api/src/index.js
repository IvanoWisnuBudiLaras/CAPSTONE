// @ts-check
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { applySecurityMiddleware } from "./middleware/security.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import transactionRouter from "./routes/transactions.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(
   cors({
      origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
      credentials: true,
   }),
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
applySecurityMiddleware(app);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRouter);

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`🚀 API → http://localhost:${PORT}`));
