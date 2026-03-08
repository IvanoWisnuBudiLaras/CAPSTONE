// @ts-check
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Missing DATABASE_URL environment variable.");
}

// Disable prefetch as recommended for Supabase
const client = postgres(connectionString || "", { prepare: false });
export const db = drizzle(client);
