// @ts-check
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must not exceed 100 characters" }),
}).strict();



export const UserSchema = z.object({
  id: z
    .string({ error: "ID is required" })
    .uuid({ message: "Invalid UUID format" }),
  name: z
    .string({ error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(255, { message: "Name must not exceed 255 characters" })
    .trim(),
  email: z
    .string({ error: "Email is required" })
    .email({ message: "Invalid email format" }),
  role: z.enum(["admin", "user"], {
    error: "Role must be either 'admin' or 'user'",
  }),
}).strict();

export const RegisterSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(255, { message: "Name must not exceed 255 characters" })
    .trim(),
  email: z
    .string({ error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must not exceed 100 characters" }),
  role: z.enum(["admin", "user"], {
    error: "Role must be either 'admin' or 'user'",
  }).optional().default("user"),
}).strict();

export const TransactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    error: "Type must be either 'income' or 'expense'",
  }),
  category: z
    .string({ error: "Category is required" })
    .min(1, { message: "Category cannot be empty" })
    .trim(),
  allocation_type: z
    .string({ error: "Allocation type is required" })
    .min(1, { message: "Allocation type cannot be empty" })
    .trim(),
  amount: z
    .number({ error: "Amount must be a number" })
    .positive({ message: "Amount must be greater than 0" }),
  date: z
    .string({ error: "Date is required" })
    .datetime({ message: "Invalid date format (ISO 8601 required)" }),
  description: z.string().optional().default(""),
}).strict();