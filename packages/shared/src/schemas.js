// @ts-check
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  role: z.enum(["admin", "user"]),
});