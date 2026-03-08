// @ts-check
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // We assume the use of standard Postgres connection string from Supabase
    url: process.env.DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
});
