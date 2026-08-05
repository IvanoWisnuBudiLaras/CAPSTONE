import 'dotenv/config';
import https from 'https';
const SR = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BASE='https://' + (process.env.SUPABASE_URL||'https://bpouxgzzbydzqowbmbof.supabase.co').replace('https://','');
function call(m,p,b){return new Promise(r=>{const d=b?JSON.stringify(b):'';const h={'Content-Type':'application/json','apikey':SR,'Authorization':'Bearer '+SR};if(d)h['Content-Length']=Buffer.byteLength(d);const q=https.request(BASE+p,{method:m,headers:h,timeout:14000},res=>{let s='';res.on('data',c=>s+=c);res.on('end',()=>{let j;try{j=JSON.parse(s);}catch{j=s};r({status:res.statusCode,raw:s,body:j});});});q.on('error',e=>r({status:'ERR',body:e.message}));q.on('timeout',()=>{q.destroy();r({status:'TO',body:''});});if(d)q.write(d);q.end();});}
const c = await call('GET','/auth/v1/admin/config');
console.log('GET /auth/v1/admin/config -> HTTP', c.status);
console.log('raw:', c.raw ? c.raw.substring(0,600) : '(empty)');
let cfg = c.body || {};
if (typeof cfg==='object') {
  console.log('keys:', Object.keys(cfg).join(', '));
  console.log('confirm-ish keys:', Object.keys(cfg).filter(k=>/confirm|email|signup|secure/i.test(k)));
}
// Try PATCH variants
let patched=false,N=Object.keys(cfg);
const variants=[
  {email_confirm:false,ConfirmEmail:false,Secure:false},
  {EmailConfirm:false,ConfirmEmail:false,DisableSignup:false},
];
for(const v of variants){
  const p=await call('PATCH','/auth/v1/admin/config',v);
  console.log('PATCH',JSON.stringify(v).substring(0,60),'->',p.status, String(p.body).substring(0,120));
  if(p.status===200){patched=true;break;}
}
console.log('\nCONFIG_TOGGLE_OK=' + patched);
