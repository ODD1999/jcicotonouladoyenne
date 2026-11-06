/**
 * Configure ONLY the Vercel Preview environment for Awards acceptance testing.
 * Read local env privately. Never print secrets or pass them as command arguments.
 */
import {loadEnvFile} from 'node:process';
import {spawnSync} from 'node:child_process';

try { loadEnvFile('.env.local'); } catch { /* external environment is also supported */ }
const password=process.env.AWARDS_ADMIN_PASSWORD;
if(!password){console.error('AWARDS_ADMIN_PASSWORD absent : aucune configuration Preview appliquée.');process.exitCode=1;}
else{
 const cli=['--yes','vercel@latest','env','add'];
 for(const [name,value,type] of [
  ['AWARDS_ADMIN_PASSWORD',password,'--sensitive'],
  ['AWARDS_RECETTE_ENABLED','true','--no-sensitive']
 ]){
  const result=spawnSync('npx',[...cli,name,'--environment','preview',type,'--force','--yes'],{
   input:value+'\n',encoding:'utf8',timeout:100000,maxBuffer:1024*1024
  });
  if(result.status!==0){
   console.error(name+': échec (code '+String(result.status)+').');
   console.error((result.stderr||'').replaceAll(value,'[MASKED]').slice(-500));
   process.exitCode=1;
   break;
  }
  console.log(name+': Preview configuré.');
 }
}
 