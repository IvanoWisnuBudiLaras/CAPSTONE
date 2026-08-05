import 'dotenv/config';
import https from 'https';

const BASE = 'https://' + process.env.SUPABASE_URL.replace('https://','');
const PUB = process.env.SUPABASE_ANON_KEY;
const SR  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const API = 'http://localhost:5000';

function loginForm(email,pw){
  return new Promise(res=>{
    const data=new URLSearchParams({email,password:pw}).toString();
    const h={'Content-Type':'application/x-www-form-urlencoded','apikey':PUB,'Authorization':'Bearer '+PUB,'Content-Length':Buffer.byteLength(data)};
    const q=https.request(BASE+'/auth/v1/token?grant_type=password',{method:'POST',headers:h,timeout:12000},r=>{let b='';r.on('data',c=>b+=c);r.on('end',()=>{let j;try{j=JSON.parse(b);}catch{j=b.substring(0,160);}res({status:r.statusCode,body:j});});});
    q.on('error',e=>res({status:'ERR',body:e.message}));q.on('timeout',()=>{q.destroy();res({status:'TO',body:''});});q.write(data);q.end();
  });
}
const R = {}; // feature -> {ok,detail}
function mark(k, ok, detail) { R[k]={ok,detail}; }

function supabaseCall(method,path,body,token){
  return new Promise(res=>{
    const data = body ? JSON.stringify(body) : '';
    const key = token||PUB;
    const h = {'Content-Type':'application/json',apikey:key,Authorization:'Bearer '+key};
    if(data)h['Content-Length']=Buffer.byteLength(data);
    const q=https.request(BASE+path,{method,headers:h,timeout:12000},r=>{let b='';r.on('data',c=>b+=c);r.on('end',()=>{let j;try{j=JSON.parse(b);}catch{j=b.substring(0,160);}res({status:r.statusCode,body:j});});});
    q.on('error',e=>{});q.on('timeout',()=>{q.destroy();});
    if(data)q.write(data);q.end();
  });
}
function api(path,method,token,bodyObj){
  return new Promise(async res=>{
    const opts={method,headers:{'Content-Type':'application/json',Authorization:'Bearer '+token,apikey:PUB}};
    if(bodyObj)opts.body=JSON.stringify(bodyObj);
    try{ const r=await fetch(API+path,opts); const t=await r.text(); let j=null;try{j=JSON.parse(t);}catch{} res({status:r.status,body:j||t.substring(0,160)}); }catch(e){res({status:'ERR',body:e.message});}
  });
}

console.log('=== KOMPREHENSIVE FEATURE READINESS TEST (real JWT) ===\n');

// 0) Create confirmed user via admin (service_role) + login via supabase-js SDK (encoding jamin benar)
const { createClient } = await import('@supabase/supabase-js');
const email='capstone.feature+' + Date.now() + '@gmail.com', pw='Test1234!';
let r = await supabaseCall('POST','/auth/v1/admin/users',{email,password:pw,email_confirm:true,user_metadata:{full_name:'Feature User'},role:'authenticated'},SR);
mark('auth:admin_create_confirmed_user', r.status===200, r.status+' uid='+ (r.body.id||'?').substring(0,8));
const cli = createClient(BASE, PUB, { auth:{persistSession:false} });
const li = await cli.auth.signInWithPassword({ email, password:pw });
const token = li.data?.session?.access_token;
mark('auth:real_login_password_grant', !!token, token? 'ES256 token ✓ (via supabase-js)':'GAGAL '+(li.error?.message||''));
if(!token){ console.log('Login gagal — hentikan. '+ JSON.stringify(li.error)); process.exit(0); }

// 1) profiles
r = await api('/api/profiles','POST',token,{full_name:'Feature User', monthly_income:5000000});
mark('profile:POST_create', r.status===201, r.status);
r = await api('/api/profiles/me','GET',token);
mark('profile:GET_me', r.status===200, r.status);
r = await api('/api/profiles/me','PUT',token,{full_name:'Feature Updated'});
mark('profile:PUT_update', r.status===200, r.status + ' ' + (JSON.stringify(r.body).substring(0,60)));

// 2) categories — 3 allocation types
const cats={};
for(const at of ['pribadi','keluarga','tabungan']){
  r = await api('/api/categories','POST',token,{name:'Kat '+at,allocation_type:at,color:'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'),icon:'tag'});
  cats[at] = r.body?.data?.id;
  mark('category:POST_'+at, r.status===201, r.status+' id='+ (r.body?.data?.id||'?').substring(0,8));
}
r = await api('/api/categories','GET',token);
mark('category:GET_list', r.status===200, 'count='+ (r.body?.data?.length||0));
const catId = cats['pribadi'];
r = await api('/api/categories/'+catId,'PUT',token,{name:'Kat Pribadi Updated'});
mark('category:PUT', r.status===200, r.status);
r = await api('/api/categories/'+catId,'DELETE',token);
mark('category:DELETE', r.status===200, r.status);

// 3) allocations — 3 rules, 40/30/30 = 100
const rules=[{allocation_type:'pribadi',percentage:40,target_category_id:cats['pribadi']||null},
              {allocation_type:'keluarga',percentage:30,target_category_id:cats['keluarga']||null},
              {allocation_type:'tabungan',percentage:30,target_category_id:cats['tabungan']||null}];
r = await api('/api/allocations','POST',token,{rules});
mark('allocation:POST_3rules_100pct', r.status===201, r.status);
r = await api('/api/allocations','GET',token);
mark('allocation:GET_list', r.status===200, 'count='+ (r.body?.data?.length||0));
r = await api('/api/allocations/preview','POST',token,{salary_amount:10000000});
mark('allocation:POST_preview', r.status===200, JSON.stringify(r.body).substring(0,120));

// 4) transactions
r = await api('/api/transactions','POST',token,{type:'income',allocation_type:'pribadi',amount:10000000,category_id:null,transaction_date:new Date().toISOString().split('T')[0],context_note:'Gaji bulanan'});
const incomeId=r.body?.data?.id;
mark('transaction:POST_income', r.status===201, r.status);
r = await api('/api/transactions','POST',token,{type:'expense',allocation_type:'keluarga',amount:250000,category_id:cats['keluarga'],transaction_date:new Date().toISOString().split('T')[0],context_note:'Belanja'} );
mark('transaction:POST_expense', r.status===201, r.status);
r = await api('/api/transactions/bulk','POST',token,{salary_amount:8000000});
mark('transaction:POST_bulk_salarysplit', r.status===201, r.status + ' entries=' + (r.body?.data?.length||0));
r = await api('/api/transactions','GET',token);
mark('transaction:GET_list', r.status===200, 'count='+ (r.body?.data?.length||0));
r = await api('/api/transactions?allocation_type=pribadi','GET',token);
mark('transaction:GET_filter_allocation', r.status===200, 'count='+ (r.body?.data?.length||0));
r = await api('/api/transactions/'+incomeId,'PUT',token,{context_note:'Gaji di-update'});
mark('transaction:PUT', r.status===200, r.status);
r = await api('/api/transactions/'+incomeId,'DELETE',token);
mark('transaction:DELETE', r.status===200, r.status);

// 5) budgets
r = await api('/api/budgets','POST',token,{category_id:cats['keluarga'],limit_amount:1000000,period_month:new Date().getMonth()+1,period_year:new Date().getFullYear()});
const budId=r.body?.data?.id;
mark('budget:POST', r.status===201, r.status);
r = await api('/api/budgets','GET',token);
mark('budget:GET_list', r.status===200, 'count='+ (r.body?.data?.length||0));
r = await api('/api/budgets/'+budId,'PUT',token,{limit_amount:1500000});
mark('budget:PUT', r.status===200, r.status);

// 6) dashboard
const now=new Date();const m=now.getMonth()+1;const y=now.getFullYear();
r = await api('/api/dashboard/summary?month='+m+'&year='+y,'GET',token);
mark('dashboard:GET_summary', r.status===200, JSON.stringify(r.body?.data).substring(0,90));
r = await api('/api/dashboard/insight?month='+m+'&year='+y,'GET',token);
mark('dashboard:GET_insight', r.status===200, 'insights='+ (r.body?.data?.length||0));
r = await api('/api/dashboard/budgets?month='+m+'&year='+y,'GET',token);
mark('dashboard:GET_budgets', r.status===200, 'count='+ (r.body?.data?.length||0));

// 7) auth guard
r = await api('/api/profiles/me','GET','no-token-actually-401');
mark('auth:GATE_rejects_no_token', r.status===401, r.status);

// 8) cleanup budget delete
r = await api('/api/budgets/'+budId,'DELETE',token);
mark('budget:DELETE', r.status===200, r.status);

console.log('\n=== FEATURE READINESS MATRIX ===');
let allOk=true;
for(const k of Object.keys(R)){const x=R[k];if(!x.ok)allOk=false;console.log((x.ok?'✅':'❌')+' '+(x.ok?'OK ':'FAIL ')+k+'  ['+x.detail+']');}
console.log('\n=== ' + (allOk?'✅ SEMUA FITUR READY — deployment ready':'⚠️ ADA FITUR YANG GAGAL') + ' ===');
