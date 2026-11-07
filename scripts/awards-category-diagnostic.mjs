import {loadEnvFile} from 'node:process';
import {neon} from '@neondatabase/serverless';
try{loadEnvFile('.env.local')}catch{}
if(!process.env.DATABASE_URL)throw Error('DATABASE_URL manquante');
const sql=neon(process.env.DATABASE_URL);
const rows=await sql`SELECT a.id,a.name,a.active,a.selection_mode,a.is_test,
(SELECT count(*) FROM fva_candidates c WHERE c.category_id=a.id) AS total_candidates,
(SELECT count(*) FROM fva_candidates c WHERE c.category_id=a.id AND c.active AND NOT c.is_test) AS eligible_candidates
FROM fva_categories a ORDER BY a.position,a.id`;
for(const row of rows){console.log([row.id,row.name,'active='+row.active,'mode='+row.selection_mode,'test='+row.is_test,'candidates='+row.total_candidates,'eligible='+row.eligible_candidates].join(' | '))}
