import 'dotenv/config';
import https from 'https';
const BASE='https://'+process.env.SUPABASE_URL.replace('https://','');
const PUB=process.env.SUPABASE_ANON_KEY; const SR=process.env.SUPABASE_SERVICE_ROLE_KEY;
function postJSON(path,body,key,headers={}) {return new Promise(res=>{const d=JSON.stringify(body||{});const h={'Content-Type':'application/json','apikey':key,'Authorization':'Bearer '+key,'Content-Length':Buffer.byteLength(d),...headers};const q=https.request(BASE+path,{method:'POST',headers:h,timeout:14000},r=>{let b='';r.on('data',c=>b+=c);r.on('end',()=>{let j;try{j=JSON.parse(b);}catch{j=b};res({status:r.statusCode,body:j,raw:b});});});q.on('error',e=>res({status:'ERR',body:e.message}));q.on('timeout',()=>{q.destroy();res({status:'TO',body:''});});if(d)q.write(d);q.end();});}
function postForm(path,bodyobj,key) {return new Promise(res=>{const d=new URLSearchParams(bodyobj).toString();const h={'Content-Type':'application/x-www-form-urlencoded','apikey':key,'Authorization':'Bearer '+key,'Content-Length':Buffer.byteLength(d)};const q=https.request(BASE+path,{method:'POST',headers:h,timeout:14000},r=>{let b='';r.on('data',c=>b+=c);r.on('end',()=>{let j;try{j=JSON.parse(b);}catch{j=b};res({status:r.statusCode,body:j,raw:b});});});q.on('error',e=>res({status:'ERR',body:e.message}));q.on('timeout',()=>{q.destroy();res({status:'TO',body:''});});q.write(d);q.end();});}
const email='dbg'+Date.now()+'@gmail.com', pw='Test1234!';

console.log('[CREATE] POST /auth/v1/admin/users  {email,password,email_confirm:true} (no role)');
const c = await postJSON('/auth/v1/admin/users',{email,password:pw,email_confirm:true,user_metadata:{full_name:'Dbg'}},SR);
console.log('  status',c.status);
console.log('  user.id:', c.body?.id, '| email_confirmed_at:', c.body?.email_confirmed_at, '| confirmed_at:', c.body?.confirmed_at);
console.log('  body snippet:', JSON.stringify(c.body).substring(0,300));

console.log('\n[LOGIN-A] form-encoded  grant_type=query  email+password in body');
const la = await postForm('/auth/v1/token?grant_type=password',{email,password:pw},PUB);
console.log('  status',la.status, '| access_token:', la.body?.access_token? la.body.access_token.substring(0,30)+'...':'NO '+ (la.body?.msg||la.body?.error||''));

console.log('\n[LOGIN-B] JSON body  grant_type IN body');
const lb = await postJSON('/auth/v1/token?grant_type=password',{grant_type:'password',email,password:pw},PUB);
console.log('  status',lb.status, '| access_token:', lb.body?.access_token? lb.body.access_token.substring(0,30)+'...':'NO '+ (lb.body?.msg||lb.body?.error||''));
