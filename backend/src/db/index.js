import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.js'
import 'dotenv/config'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured. Set it in backend/.env before starting the server.')
}

const client = postgres(databaseUrl, {
  ssl: 'require',
  max: 10,
})

export const db = drizzle(client, { schema })
