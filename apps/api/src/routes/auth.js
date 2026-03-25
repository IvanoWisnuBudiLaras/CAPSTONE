// @ts-check
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { LoginSchema, RegisterSchema } from "@repo/shared";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

const router = Router();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "dev_secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "dev_refresh_secret";
const IS_PROD = process.env.NODE_ENV === "production";

// Use this helper to send a cookie properly
const setTokens = (res, user) => {
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
};

router.post("/register", async (req, res) => {
  try {
    const result = RegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.flatten(),
      });
    }

    const { email, password, name } = result.data;
    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await db
      .insert(users)
      .values({ email, password: hashedPassword, name, role: "user" }) 
      .returning();

    setTokens(res, newUser);
    res.status(201).json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });

  } catch (error) {
    // Dev-friendly error handling for uniqueness constraints
    if (error.code === "23505") { // Postgres unique_violation code
      return res.status(409).json({
        success: false,
        message: "Conflict: Email address is already registered.",
        devError: IS_PROD ? undefined : error.message,
      });
    }
    
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      devError: IS_PROD ? undefined : error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.flatten(),
      });
    }

    const { email, password } = result.data;

    const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = userList[0];

    // NOTE: This assumes the users table has a password field, which we need to make sure exists.
    const hash = user?.password ?? "$2a$12$invalidhashfortimingsafety0000000000000";
    const valid = await bcrypt.compare(password, hash);

    if (!user || !valid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    setTokens(res, user);
    res.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      devError: IS_PROD ? undefined : error.message 
    });
  }
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) {
    return res.status(401).json({ success: false, message: "No refresh token" });
  }

  try {
    const payload = /** @type {{ id: string }} */ (jwt.verify(token, REFRESH_SECRET));

    const userList = await db.select().from(users).where(eq(users.id, payload.id)).limit(1);
    const user = userList[0];

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ success: true, message: "Token refreshed" });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
});

router.post("/logout", (_, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ success: true, message: "Logged out" });
});

export default router;
