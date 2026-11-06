/**
 * Recette sécurisée des Awards.
 * node scripts/awards-recipe.mjs               → lecture seule
 * node scripts/awards-recipe.mjs --write-test  → crée 1 bulletin TEST exclu
 * Aucun secret ni donnée nominative n'est affiché.
 */
import { loadEnvFile } from 'node:process';
const base=process.env.AWARDS_BASE_URL || 'http://127.0.0.1:3002';
try { loadEnvFile('.env.local'); } catch { /* Variables héritées autorisées. */ }
const password=process.env.AWARDS_ADMIN_PASSWORD;
if(!password){console.error('AWARDS_ADMIN_PASSWORD absent');process.exitCode=1;}
else{
 try{
  const url=base+'/api/awards/admin';
  const login=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'login',password})});
  if(!login.ok)throw Error('Connexion admin refusée : '+login.status);
  const cookie=login.headers.get('set-cookie')?.split(';')[0];
  if(!cookie)throw Error('Cookie admin manquant');
  const headers={Cookie:cookie};
  const get=async()=>{const r=await fetch(url,{headers});if(!r.ok)throw Error('Lecture admin : '+r.status);return r.json()};
  const before=await get();
  console.log('État initial',JSON.stringify({categories:before.categories?.length,candidats:before.candidates?.length,bulletins:before.ballots?.length,ouverts:before.open}));
  const r=await fetch(url+'/recette',{headers}); console.log('Route recette',r.status,r.ok?'OK':'REFUS');
   if(process.argv.includes('--write-test')){
   const candidate=before.candidates.find(c=>c.active);
   if(!candidate)throw Error('Aucun candidat actif pour créer un bulletin test');
   const testReference='ESSAI'+Date.now().toString(36).slice(-8);
   const result=await fetch(url,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({action:'test-vote',candidateId:candidate.id,testReference})});
   const body=await result.json();
   if(!result.ok||!body.ballotId)throw Error('Création test : '+result.status+' '+(body.error||''));
   const after=await get();
   const ballot=after.ballots.find(b=>b.id===body.ballotId);
   const choices=after.votes.filter(v=>v.ballot_id===body.ballotId);
   const valid=ballot?.is_test===true&&ballot.excluded===true&&choices.length===1;
   console.log('Bulletin test',JSON.stringify({enregistre:!!ballot,marqueTest:ballot?.is_test,exclu:ballot?.excluded,votes:choices.length,verifie:valid}));
   if(!valid)process.exitCode=1;
   const csv=await fetch(url+'?export=csv',{headers});
   const content=await csv.text();
   const exported=csv.ok&&content.includes(body.ballotId)&&content.slice(0,240).includes('Test');
   console.log('Export CSV',JSON.stringify({statut:csv.status,contientBulletin:content.includes(body.ballotId),colonneTest:content.slice(0,240).includes('Test'),verifie:exported}));
   if(!exported)process.exitCode=1;
  }
 }catch(error){console.error('Recette impossible :',error instanceof Error?error.message:'Erreur');process.exitCode=1;}
}
