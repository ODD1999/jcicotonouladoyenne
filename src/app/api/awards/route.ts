import { NextRequest,NextResponse } from 'next/server';
import {randomUUID} from 'node:crypto';
import {schema} from '@/lib/awards';
import {OL_SOEURS,TITLES} from '@/lib/awards-voter-options';
export const runtime='nodejs';
export async function GET(){
 try{const s=await schema();const [categories,candidates,settings]=await Promise.all([
 s`SELECT id,name,description FROM fva_categories WHERE active=TRUE AND is_test=FALSE AND EXISTS (SELECT 1 FROM fva_candidates c WHERE c.category_id=fva_categories.id AND c.active=TRUE AND c.is_test=FALSE) ORDER BY position,id`,
 s`SELECT c.id,c.category_id,c.name,c.title,c.photo FROM fva_candidates c JOIN fva_categories a ON a.id=c.category_id WHERE c.active=TRUE AND c.is_test=FALSE AND a.active=TRUE AND a.is_test=FALSE ORDER BY c.id`,
 s`SELECT voting_open FROM fva_settings WHERE id=1`]);
 const publicCategories=categories.map(c=>({...c,id:Number(c.id)}));
 const publicCandidates=candidates.map(c=>({...c,id:Number(c.id),category_id:Number(c.category_id)}));
 return NextResponse.json({categories:publicCategories,candidates:publicCandidates,open:settings[0]?.voting_open===true},{headers:{'Cache-Control':'no-store'}})}
 catch{return NextResponse.json({error:'Chargement impossible'},{status:500})}
}
export async function POST(req:NextRequest){
 try{const b=await req.json();const firstName=String(b.firstName||'').trim().slice(0,100),lastName=String(b.lastName||'').trim().slice(0,100),phone=String(b.phone||'').replace(/[^\d+]/g,'').slice(0,25),type=String(b.type||''),org=String(b.organization||'').trim().slice(0,160),title=String(b.title||'').trim();
 const votes=b.votes as Array<{categoryId:number,candidateId:number}>;
 if(!firstName||!lastName||phone.replace(/\D/g,'').length<8||!['member','ol','guest'].includes(type)||!TITLES.some(t=>t===title)||(type==='ol'&&!OL_SOEURS.some(v=>v===org))||!Array.isArray(votes)||votes.length===0||votes.length>100)return NextResponse.json({error:'Identité ou votes invalides'},{status:400});
 const data=votes.map(v=>({category_id:Number(v.categoryId),candidate_id:Number(v.candidateId)}));
 if(data.some(v=>!Number.isSafeInteger(v.category_id)||!Number.isSafeInteger(v.candidate_id))||new Set(data.map(v=>v.category_id)).size!==data.length)return NextResponse.json({error:'Sélections invalides'},{status:400});
 const s=await schema(),id=randomUUID(),json=JSON.stringify(data);
 const result=await s`WITH selection AS (SELECT * FROM jsonb_to_recordset(${json}::jsonb) AS x(category_id bigint,candidate_id bigint)),
 valid AS (SELECT count(*) AS n FROM selection v JOIN fva_candidates c ON c.id=v.candidate_id AND c.category_id=v.category_id AND c.active=TRUE AND c.is_test=FALSE JOIN fva_categories a ON a.id=c.category_id AND a.active=TRUE AND a.is_test=FALSE),
 inserted AS (INSERT INTO fva_ballots(id,first_name,last_name,phone,participant_title,participant_type,organization)
 SELECT ${id}::uuid,${firstName},${lastName},${phone},${title},${type},${type==='ol'?org:''}
 WHERE (SELECT voting_open FROM fva_settings WHERE id=1)
 AND (SELECT n FROM valid)=(SELECT count(*) FROM selection)
 AND (SELECT count(*) FROM selection)>0 RETURNING id),
 saved AS (INSERT INTO fva_votes(ballot_id,category_id,candidate_id) SELECT i.id,v.category_id,v.candidate_id FROM inserted i CROSS JOIN selection v RETURNING ballot_id)
 SELECT (SELECT count(*) FROM inserted) AS created,(SELECT count(*) FROM saved) AS saved`;
 if(Number(result[0].created)!==1)return NextResponse.json({error:'Scrutin fermé ou choix invalides'},{status:409});
 return NextResponse.json({success:true,ballotId:id})}
 catch{return NextResponse.json({error:'Enregistrement impossible'},{status:500})}
}
