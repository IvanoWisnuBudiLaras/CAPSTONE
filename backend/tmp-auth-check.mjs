import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;
const client = createClient(url, key);

const { data: { session }, error } = await client.auth.getSession();
console.log(JSON.stringify({ url, hasKey: !!key, hasSession: !!session, error: error?.message || null }, null, 2));
