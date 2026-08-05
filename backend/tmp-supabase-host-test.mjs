import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = 'https://loukyqxgyhhrfmlzidro.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdWt5cXhneWhocmZtbHppZHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NjMwNjIsImV4cCI6MjEwMTMzOTA2Mn0.prcH6jhFo8oRhsioMaodyfBw3OhUFRw8r4fBG_BLJs8';
const client = createClient(url, key);

try {
  const { data: { session }, error } = await client.auth.getSession();
  console.log(JSON.stringify({ ok: !error, session: !!session, error: error?.message || null }, null, 2));
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
