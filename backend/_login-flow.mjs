import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {auth:{persistSession:false}});
const email='lt'+Date.now()+'@gmail.com', pw='Test1234!';
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('ANON_KEY startsWith:', String(process.env.SUPABASE_ANON_KEY).substring(0,20));
console.log('\n[1] signUp (publishable anon key)');
const su=await supabase.auth.signUp({email,password:pw,options:{data:{full_name:'LF User'}}});
console.log('  ', su.error? (su.error.code||'')+' '+su.error.message : 'OK id='+su.data.user.id.substring(0,9)+' | session='+!!su.data.session);
console.log('  email_confirmed_at:', su.data?.user?.email_confirmed_at || '(null/belum)');
console.log('\n[2] signInWithPassword (login — apakah masih dikunci email confirm?)');
const si=await supabase.auth.signInWithPassword({email,password:pw});
console.log('  ', si.error? (si.error.code||'')+' '+si.error.message : 'OK session='+!!si.data?.session+' token='+(si.data?.session?.access_token?.substring(0,32)||'')+'...');
if(si.data?.session?.access_token){
  const t=si.data.session.access_token;
  const res=await fetch('http://localhost:5000/api/profiles/me',{headers:{Authorization:'Bearer '+t,'apikey':process.env.SUPABASE_ANON_KEY}});
  const txt=await res.text();
  console.log('\n[3] backend GET /profiles/me (REAL token):', res.status, txt.substring(0,160));
  console.log('\n=> REAL AUTH FULLY LIVE' );
}else{
  console.log('\n=> email-confirmation gate masih ON (Supabase default). Signup OK, login butuh konfirmasi email.');
}
process.exit(0);
