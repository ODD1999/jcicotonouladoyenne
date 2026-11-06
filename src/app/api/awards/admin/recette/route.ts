import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { authorized, schema, recetteEnabled } from '@/lib/awards';
import { OL_SOEURS, TITLES } from '@/lib/awards-voter-options';

export const runtime = 'nodejs';
const deny=()=>NextResponse.json({error:'Connexion administrateur requise pour la recette.'},{status:401});

export async function GET(req:NextRequest) {
 if(!recetteEnabled())return NextResponse.json({error:'Recette désactivée en production.'},{status:404});
 if(!authorized(req.cookies.get('fva_admin')?.value))return deny();
 try{
  const s=await schema();
  const [categories,candidates]=await Promise.all([
   s`SELECT id,name,description FROM fva_categories WHERE is_test=TRUE AND active=TRUE ORDER BY position,id`,
   s`SELECT c.id,c.category_id,c.name,c.title,c.photo
     FROM fva_candidates c JOIN fva_categories a ON a.id=c.category_id
     WHERE a.is_test=TRUE AND a.active=TRUE AND c.active=TRUE ORDER BY c.id`
  ]);
  return NextResponse.json({categories:categories.map(c=>({...c,id:Number(c.id)})),
   candidates:candidates.map(c=>({...c,id:Number(c.id),category_id:Number(c.category_id)})),
   open:true,recette:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Impossible de charger la recette.'},{status:500})}
}

export async function POST(req:NextRequest){
 if(!recetteEnabled())return NextResponse.json({error:'Recette désactivée en production.'},{status:404});
 if(!authorized(req.cookies.get('fva_admin')?.value))return deny();
 try{
  const b=await req.json();
  const firstName=String(b.firstName||'').trim().slice(0,100);
  const lastName=String(b.lastName||'').trim().slice(0,100);
  const phone=String(b.phone||'').replace(/[^\d+]/g,'').slice(0,25);
  const title=String(b.title||'');
  const type=String(b.type||'');
  const org=String(b.organization||'').trim().slice(0,160);
  const votes=b.votes as Array<{categoryId:number,candidateId:number}>;
  if(!firstName||!lastName||phone.replace(/\D/g,'').length<8||
   !['member','ol','guest'].includes(type)||!TITLES.some(t=>t===title)||
   (type==='ol'&&!OL_SOEURS.some(v=>v===org))||!Array.isArray(votes)||
   votes.length===0||votes.length>100){
   return NextResponse.json({error:'Identité ou votes invalides.'},{status:400});
  }
  const data=votes.map(v=>({category_id:Number(v.categoryId),candidate_id:Number(v.candidateId)}));
  if(data.some(v=>!Number.isSafeInteger(v.category_id)||!Number.isSafeInteger(v.candidate_id)||v.category_id<=0||v.candidate_id<=0)||
     new Set(data.map(v=>v.category_id)).size!==data.length){
    return NextResponse.json({error:'Sélections invalides.'},{status:400});
  }
  const s=await schema(),id=randomUUID(),json=JSON.stringify(data);
  const result=await s`WITH selection AS (
    SELECT * FROM jsonb_to_recordset(${json}::jsonb) AS x(category_id bigint,candidate_id bigint)
   ), valid AS (
    SELECT count(*) AS n FROM selection v JOIN fva_candidates c
    ON c.id=v.candidate_id AND c.category_id=v.category_id AND c.active=TRUE
    JOIN fva_categories a ON a.id=c.category_id AND a.active=TRUE AND a.is_test=TRUE
   ), inserted AS (
    INSERT INTO fva_ballots(id,first_name,last_name,phone,participant_title,participant_type,organization,
      is_test,excluded,exclusion_reason,excluded_at)
    SELECT ${id}::uuid,${firstName},${lastName},${phone},${title},${type},${type==='ol'?org:''},
      TRUE,TRUE,'Recette en ligne',now()
    WHERE (SELECT n FROM valid)=(SELECT count(*) FROM selection)
      AND (SELECT count(*) FROM selection)>0 RETURNING id
   ), saved AS (
    INSERT INTO fva_votes(ballot_id,category_id,candidate_id)
    SELECT i.id,v.category_id,v.candidate_id FROM inserted i CROSS JOIN selection v RETURNING ballot_id
   ) SELECT (SELECT count(*) FROM inserted) AS created,(SELECT count(*) FROM saved) AS saved`;
  if(Number(result[0]?.created)!==1)return NextResponse.json({error:'Choix invalides ou candidature indisponible.'},{status:409});
  return NextResponse.json({success:true,ballotId:id,recette:true});
 }catch{return NextResponse.json({error:'Enregistrement de recette impossible.'},{status:500})}
}
