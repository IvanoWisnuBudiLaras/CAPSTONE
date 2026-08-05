import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bpouxgzzbydzqowbmbof.supabase.co',
  'sb_publishable_15NxZ7yI0lMcOYDtT0O0DA_ov3YrsUL'
)

const email = 'capstone.browse+' + Date.now() + '@gmail.com'
const pw = 'Test1234!'
console.log('=== supabase-js signup/login test (publishable key, like browser) ===\n')

console.log('[1] signUp')
const su = await supabase.auth.signUp({ email, password: pw, options: { data: { full_name: 'Browser Test' } } })
if (su.error) { console.log('  ERROR:', su.error.message, '| code:', su.error.code) }
else {
  console.log('  OK | user_id:', su.data?.user?.id?.substring(0,12))
  console.log('  session returned:', !!su.data?.session, '← kuncinya: email-confirm ON = false')
}

console.log('\n[2] signInWithPassword (login)')
const si = await supabase.auth.signInWithPassword({ email, password: pw })
if (si.error) { console.log('  ERROR:', si.error.message, '| code:', si.error.code) }
else {
  console.log('  OK | session:', !!si.data?.session)
  const at = si.data?.session?.access_token
  console.log('  access_token (es256):', at ? at.substring(0, 34) + '...' : 'none')
  if (at) {
    const payload = Buffer.from(at.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString().substring(0,160)
    console.log('  JWT payload:', payload)
  }
}

// admin toggle check
const SR = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwb3V4Z3p6YnlkenFvd2JtYm9mIiwicm9lIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzg1ODQ1NjM1LCJleHAiOjIxMDE0MjE2MzV9.BWHC_Jn6vlFwP40Qtb6aOb51i4oeHg9ffsv1l79Si94'
console.log('\n[3] GET /auth/v1/admin/config via service_role (coba toggle email-confirm)')
import('https').then(async https=>{
  await new Promise(r=>{const q=https.request('https://bpouxgzzbydzqowbmbof.supabase.co/auth/v1/admin/config',{method:'GET',headers:{apikey:SR,Authorization:'Bearer '+SR},timeout:10000},res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>{console.log('  HTTP',res.statusCode,JSON.stringify(b).substring(0,160));r();});});q.on('error',()=>{console.log('  ERR');r();});q.end();});
})
process.exit(0)
