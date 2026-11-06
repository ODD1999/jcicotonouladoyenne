import {NextRequest,NextResponse} from 'next/server';
import {schema,authorized,passwordOK,session,recetteEnabled} from '@/lib/awards';
import {AWARDS_CATALOG_2026} from '@/lib/awards-catalog';
import {randomUUID} from 'node:crypto';
import {del} from '@vercel/blob';
export const runtime='nodejs';
const deny=()=>NextResponse.json({error:'Authentification requise'},{status:401});
const check=(r:NextRequest)=>authorized(r.cookies.get('fva_admin')?.value);
export async function GET(req:NextRequest){
 if(!check(req))return deny();
 try{const s=await schema();
  if(req.nextUrl.searchParams.get('preview')==='1'){
   const [categories,candidates]=await Promise.all([
    s`SELECT id,name,description,position FROM fva_categories WHERE id IN (SELECT category_id FROM fva_candidates WHERE active=TRUE) ORDER BY position,id`,
    s`SELECT c.id,c.category_id,c.name,c.title,c.photo FROM fva_candidates c WHERE c.active=TRUE ORDER BY c.id`
   ]);
   return NextResponse.json({categories:categories.map(c=>({...c,id:Number(c.id)})),candidates:candidates.map(c=>({...c,id:Number(c.id),category_id:Number(c.category_id)})),open:true,preview:true},{headers:{'Cache-Control':'no-store'}});
  }
const [categories,candidates,ballots,votes,settings]=await Promise.all([
 s`SELECT * FROM fva_categories ORDER BY position,id`,s`SELECT * FROM fva_candidates ORDER BY id`,s`SELECT * FROM fva_ballots ORDER BY created_at DESC`,s`SELECT * FROM fva_votes`,s`SELECT voting_open FROM fva_settings WHERE id=1`]);
 if(req.nextUrl.searchParams.get('export')==='csv'){
 const cat=new Map(categories.map(x=>[String(x.id),String(x.name)])),cand=new Map(candidates.map(x=>[String(x.id),String(x.name)]));
 const rows=[['Bulletin','Nom','Prénom','Téléphone','Titre','Statut','Organisation','Date','Test','Exclu','Motif','Catégorie','Candidat']];
 for(const b of ballots){const choices=votes.filter(v=>String(v.ballot_id)===String(b.id));for(const v of choices.length?choices:[{category_id:'',candidate_id:''}]){
 rows.push([String(b.id),String(b.last_name),String(b.first_name),String(b.phone),String(b.participant_title||''),String(b.participant_type),String(b.organization),String(b.created_at),String(b.is_test||false),String(b.excluded),String(b.exclusion_reason),cat.get(String(v.category_id))||'',cand.get(String(v.candidate_id))||'']);}}
 const csv='\uFEFF'+rows.map(row=>row.map(c=>'"'+c.replace(/^[=+@\-\t\r]/,"'$&").replace(/"/g,'""')+'"').join(';')).join('\r\n');
 return new NextResponse(csv,{headers:{'Content-Type':'text/csv;charset=utf-8','Content-Disposition':'attachment; filename="full-vibes-awards.csv"','Cache-Control':'no-store'}})}
 return NextResponse.json({categories:categories.map(c=>({...c,id:Number(c.id)})),candidates:candidates.map(c=>({...c,id:Number(c.id),category_id:Number(c.category_id)})),ballots,recetteEnabled:recetteEnabled(),votes:votes.map(v=>({...v,category_id:Number(v.category_id),candidate_id:Number(v.candidate_id)})),open:settings[0]?.voting_open===true},{headers:{'Cache-Control':'no-store'}})}
 catch{return NextResponse.json({error:'Lecture impossible'},{status:500})}
}
export async function POST(req:NextRequest){
 try{const b=await req.json();
 if(b.action==='login'){if(!passwordOK(b.password))return deny();const res=NextResponse.json({success:true});res.cookies.set('fva_admin',session(),{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/api/awards/admin',maxAge:43200});return res}
 if(!check(req))return deny();
 const s=await schema();
 if(['recipe-cleanup','recipe-category','test-vote'].includes(b.action)&&!recetteEnabled())return NextResponse.json({error:'Recette désactivée en production'},{status:403});
  if(b.action==='recipe-cleanup'){
   if(b.confirm!=='SUPPRIMER TEST')return NextResponse.json({error:'Confirmation invalide'},{status:400});
   const origin=req.headers.get('origin');
   if(origin&&origin!==req.nextUrl.origin)return NextResponse.json({error:'Origine non autorisée'},{status:403});
   const [state,counts,photos]=await Promise.all([
    s`SELECT voting_open FROM fva_settings WHERE id=1`,
    s`SELECT (SELECT count(*) FROM fva_categories WHERE is_test=TRUE) AS categories,
       (SELECT count(*) FROM fva_candidates WHERE is_test=TRUE OR category_id IN (SELECT id FROM fva_categories WHERE is_test=TRUE)) AS candidates,
       (SELECT count(*) FROM fva_ballots WHERE is_test=TRUE) AS ballots`,
    s`SELECT DISTINCT c.photo FROM fva_candidates c JOIN fva_categories a ON a.id=c.category_id
       WHERE (a.is_test=TRUE OR c.is_test=TRUE) AND c.photo<>''
       AND NOT EXISTS (SELECT 1 FROM fva_candidates other JOIN fva_categories oc ON oc.id=other.category_id
        WHERE oc.is_test=FALSE AND other.is_test=FALSE AND other.photo=c.photo)`
   ]);
   if(state[0]?.voting_open)return NextResponse.json({error:'Fermez le vote officiel avant le nettoyage.'},{status:409});
   // Transaction unique : protection explicite contre toute suppression de vote officiel.
   await s`DO $clean$
   BEGIN
     IF EXISTS(SELECT 1 FROM fva_settings WHERE id=1 AND voting_open) THEN RAISE EXCEPTION 'Scrutin ouvert'; END IF;
     IF EXISTS(SELECT 1 FROM fva_votes v JOIN fva_categories c ON c.id=v.category_id
       JOIN fva_ballots b ON b.id=v.ballot_id JOIN fva_candidates candidate ON candidate.id=v.candidate_id WHERE (c.is_test=TRUE OR candidate.is_test=TRUE) AND b.is_test=FALSE)
       THEN RAISE EXCEPTION 'Un vote officiel utilise une catégorie de recette'; END IF;
     DELETE FROM fva_votes WHERE ballot_id IN (SELECT id FROM fva_ballots WHERE is_test=TRUE);
     DELETE FROM fva_ballots WHERE is_test=TRUE;
     DELETE FROM fva_candidates WHERE is_test=TRUE OR category_id IN (SELECT id FROM fva_categories WHERE is_test=TRUE);
     DELETE FROM fva_categories WHERE is_test=TRUE;
   END $clean$`;
   let photosDeleted=0,photoErrors=0;
   for(const row of photos){
     try{
       const url=new URL(String(row.photo));
       if(url.hostname.endsWith('.blob.vercel-storage.com')&&url.pathname.includes('/full-vibes-awards/candidates/')){
         if(!process.env.BLOB_READ_WRITE_TOKEN){photoErrors++;continue}
         await del(url.toString(),{token:process.env.BLOB_READ_WRITE_TOKEN});photosDeleted++;
       }
     }catch{photoErrors++}
   }
   return NextResponse.json({success:true,removed:{categories:Number(counts[0].categories),
     candidates:Number(counts[0].candidates),ballots:Number(counts[0].ballots),photosDeleted,photoErrors}});
  }
  if(b.action==='recipe-category'){
   const name=String(b.name||'').trim().slice(0,120);
   const description=String(b.description||'').trim().slice(0,700);
   if(!name)return NextResponse.json({error:'Nom de l’award de recette requis'},{status:400});
   const created=await s`INSERT INTO fva_categories(name,description,position,active,family,selection_mode,is_test)
     VALUES(${name},${description},(SELECT COALESCE(max(position),0)+1 FROM fva_categories),TRUE,'Recette','public',TRUE)
     RETURNING id`;
   return NextResponse.json({success:true,categoryId:Number(created[0].id)});
  }
  if(b.action==='test-vote'){
  // Test persistant mais explicitement hors décompte, même lorsque le scrutin est fermé.
  const candidateId=Number(b.candidateId);
  if(!Number.isSafeInteger(candidateId)||candidateId<=0)return NextResponse.json({error:'Candidat invalide'},{status:400});
  const id=randomUUID();
  const ref=String(b.testReference||'').replace(/[^a-zA-Z0-9]/g,'').slice(0,16) || id.slice(0,8);
  const phone='TEST-'+ref;
  const result=await s`WITH selected AS (
    SELECT id,category_id FROM fva_candidates WHERE id=${candidateId} AND active=TRUE
  ), ballot AS (
    INSERT INTO fva_ballots(id,first_name,last_name,phone,participant_title,participant_type,organization,excluded,exclusion_reason,excluded_at,is_test)
    SELECT ${id}::uuid,'Test','Awards',${phone},'Membre','member','JCI Cotonou La Doyenne',TRUE,'Bulletin de test',now(),TRUE
    WHERE EXISTS(SELECT 1 FROM selected)
    RETURNING id
  ), vote AS (
    INSERT INTO fva_votes(ballot_id,category_id,candidate_id)
    SELECT b.id,c.category_id,c.id FROM ballot b CROSS JOIN selected c RETURNING ballot_id
  ) SELECT (SELECT count(*) FROM vote) AS saved`;
  if(Number(result[0]?.saved)!==1)return NextResponse.json({error:'Candidat indisponible'},{status:409});
  return NextResponse.json({success:true,ballotId:id,reference:ref,test:true});
 }
 if(b.action==='seed-catalog-2026'){
   // Import idempotent : aucun candidat ou bulletin existant n'est écrasé.
   // Le document prévoit un vote des membres uniquement pour les quatre Awards « Full ».
   let created=0;
   for(const item of AWARDS_CATALOG_2026){
     const result=await s`
       INSERT INTO fva_categories(name,description,position,active,family,selection_mode)
       SELECT ${item.name},${item.description},${item.position},${item.mode==='public'},${item.family},${item.mode}
       WHERE NOT EXISTS (SELECT 1 FROM fva_categories WHERE name=${item.name})
       RETURNING id`;
     created+=result.length;
   }
   return NextResponse.json({success:true,created,total:AWARDS_CATALOG_2026.length});
 }
 if(b.action==='category'){
 const name=String(b.name||'').trim().slice(0,150),description=String(b.description||'').trim().slice(0,1000);
 if(!name)return NextResponse.json({error:'Nom de catégorie requis'},{status:400});
 if(b.id!==undefined){const id=Number(b.id);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:'Identifiant invalide'},{status:400});await s`UPDATE fva_categories SET name=${name},description=${description} WHERE id=${id}`}
 else await s`INSERT INTO fva_categories(name,description,position) VALUES(${name},${description},(SELECT COALESCE(max(position),0)+1 FROM fva_categories))`;
 }
 else if(b.action==='candidate'){
 const cid=Number(b.categoryId),name=String(b.name||'').trim().slice(0,150),title=String(b.title||'').trim().slice(0,180),photo=String(b.photo||'').trim().slice(0,1000);
 if(!name||!Number.isSafeInteger(cid)||cid<1||(photo&&!(photo.startsWith('/')&&!photo.startsWith('//'))&&!/^https:\/\//.test(photo)))return NextResponse.json({error:'Candidat invalide'},{status:400});
 if(b.id!==undefined){const id=Number(b.id);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:'Identifiant invalide'},{status:400});await s`UPDATE fva_candidates SET name=${name},title=${title},photo=${photo} WHERE id=${id} AND category_id=${cid}`}
 else await s`INSERT INTO fva_candidates(category_id,name,title,photo,is_test) VALUES(${cid},${name},${title},${photo},(SELECT is_test FROM fva_categories WHERE id=${cid}))`;
 }
 else if(b.action==='category-active'){const id=Number(b.id);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:'Identifiant invalide'},{status:400});await s`UPDATE fva_categories SET active=${Boolean(b.active)} WHERE id=${id}`}
 else if(b.action==='candidate-test'){
   if(!recetteEnabled())return NextResponse.json({error:'Recette désactivée en production'},{status:403});
   const id=Number(b.id);
   if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:'Candidat invalide'},{status:400});
   if(Boolean(b.isTest)){
     const uses=await s`SELECT count(*) AS n FROM fva_votes v JOIN fva_ballots b ON b.id=v.ballot_id
       WHERE v.candidate_id=${id} AND b.is_test=FALSE`;
     if(Number(uses[0].n)>0)return NextResponse.json({error:'Ce candidat possède des votes officiels ; il ne peut pas être marqué TEST.'},{status:409});
   }
   await s`UPDATE fva_candidates SET is_test=${Boolean(b.isTest)} WHERE id=${id}`;
  }
  else if(b.action==='candidate-active'){const id=Number(b.id);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:'Identifiant invalide'},{status:400});await s`UPDATE fva_candidates SET active=${Boolean(b.active)} WHERE id=${id}`}
 else if(b.action==='exclude'){
 const id=String(b.id||'');if(!/^[a-f0-9-]{36}$/i.test(id))return NextResponse.json({error:'ID invalide'},{status:400});
 const excluded=Boolean(b.excluded),reason=excluded?String(b.reason||'Doublon possible').trim().slice(0,200):'';
 await s`UPDATE fva_ballots SET excluded=${excluded},exclusion_reason=${reason},excluded_at=${excluded?new Date().toISOString():null} WHERE id=${id}::uuid AND is_test=FALSE`;
 }
 else if(b.action==='toggle'){
  if(Boolean(b.open)){
   const [missing,tests,eligible]=await Promise.all([
    s`SELECT name FROM fva_categories a WHERE a.active=TRUE AND a.is_test=FALSE
       AND a.selection_mode='public' AND NOT EXISTS
       (SELECT 1 FROM fva_candidates c WHERE c.category_id=a.id AND c.active=TRUE AND c.is_test=FALSE)`,
    s`SELECT (SELECT count(*) FROM fva_ballots WHERE is_test=TRUE)
      +(SELECT count(*) FROM fva_categories WHERE is_test=TRUE)
       +(SELECT count(*) FROM fva_candidates WHERE is_test=TRUE) AS total`,
    s`SELECT count(*) AS n FROM fva_categories WHERE active=TRUE AND is_test=FALSE AND selection_mode='public'`
   ]);
   if(Number(tests[0].total)>0)return NextResponse.json({error:'Nettoyez les données de recette avant d’ouvrir le vote officiel.'},{status:409});
   if(Number(eligible[0].n)===0)return NextResponse.json({error:'Aucun award ouvert au vote public.'},{status:409});
   if(missing.length)return NextResponse.json({error:'Awards sans candidats actifs : '+missing.map(x=>x.name).join(', ')},{status:409});
  }
  await s`UPDATE fva_settings SET voting_open=${Boolean(b.open)} WHERE id=1`;
 }
 else return NextResponse.json({error:'Action inconnue'},{status:400});
 return NextResponse.json({success:true})}catch{return NextResponse.json({error:'Action impossible'},{status:500})}
}
