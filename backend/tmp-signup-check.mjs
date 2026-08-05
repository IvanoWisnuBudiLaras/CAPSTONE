import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const email = 'test.user.' + Date.now() + '@mail.com';
const password = 'TestPass123!';

const { data, error } = await client.auth.signUp({ email, password, options: { data: { full_name: 'Test User' } } });
console.log(JSON.stringify({ email, user: !!data?.user, session: !!data?.session, error: error?.message || null }, null, 2));
