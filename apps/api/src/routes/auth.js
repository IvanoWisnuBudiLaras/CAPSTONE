// @ts-check
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginSchema } from "@repo/shared";

const router = Router();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "dev_secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "dev_refresh_secret";
const IS_PROD = process.env.NODE_ENV === "production";

const users = [
  {
    id: "1",
    email: "admin@example.com",
    password: await bcrypt.hash("password123", 12),
    role: "admin",
    name: "Admin",
  },
];

router.post("/login", async (req, res) => {
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: result.error.flatten(),
    });
  }

  const { email, password } = result.data;
  const user = users.find((u) => u.email === email);

  const hash = user?.password ?? "$2a$12$invalidhashfortimingsafety0000000000000";
  const valid = await bcrypt.compare(password, hash);

  if (!user || !valid) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
});

router.post("/logout", (_, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ success: true, message: "Logged out" });
});

export default router;