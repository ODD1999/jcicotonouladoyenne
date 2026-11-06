import { neon } from '@neondatabase/serverless';
import { createHmac,timingSafeEqual } from 'node:crypto';
export const recetteEnabled=()=>process.env.NODE_ENV!=='production'||process.env.AWARDS_RECETTE_ENABLED==='true';
export const db=()=>{if(!process.env.DATABASE_URL)throw Error('DATABASE_URL missing');return neon(process.env.DATABASE_URL)};
export async function schema(){const s=db();
await s`CREATE TABLE IF NOT EXISTS fva_categories(id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',position INT NOT NULL DEFAULT 0)`;
await s`CREATE TABLE IF NOT EXISTS fva_candidates(id BIGSERIAL PRIMARY KEY,category_id BIGINT NOT NULL REFERENCES fva_categories(id),name TEXT NOT NULL,title TEXT NOT NULL DEFAULT '',photo TEXT NOT NULL DEFAULT '')`;
await s`CREATE TABLE IF NOT EXISTS fva_ballots(id UUID PRIMARY KEY,first_name TEXT NOT NULL,last_name TEXT NOT NULL,phone TEXT NOT NULL,participant_type TEXT NOT NULL,organization TEXT NOT NULL DEFAULT '',excluded BOOL NOT NULL DEFAULT FALSE,exclusion_reason TEXT NOT NULL DEFAULT '',created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
await s`CREATE TABLE IF NOT EXISTS fva_votes(ballot_id UUID NOT NULL REFERENCES fva_ballots(id),category_id BIGINT NOT NULL REFERENCES fva_categories(id),candidate_id BIGINT NOT NULL REFERENCES fva_candidates(id),PRIMARY KEY(ballot_id,category_id))`;
await s`ALTER TABLE fva_categories ADD COLUMN IF NOT EXISTS active BOOL NOT NULL DEFAULT TRUE`;
await s`ALTER TABLE fva_categories ADD COLUMN IF NOT EXISTS family TEXT NOT NULL DEFAULT 'Autres'`;
await s`ALTER TABLE fva_categories ADD COLUMN IF NOT EXISTS selection_mode TEXT NOT NULL DEFAULT 'public'`;
await s`ALTER TABLE fva_categories ADD COLUMN IF NOT EXISTS is_test BOOL NOT NULL DEFAULT FALSE`;
await s`ALTER TABLE fva_candidates ADD COLUMN IF NOT EXISTS active BOOL NOT NULL DEFAULT TRUE`;
await s`ALTER TABLE fva_candidates ADD COLUMN IF NOT EXISTS is_test BOOL NOT NULL DEFAULT FALSE`;
await s`ALTER TABLE fva_ballots ADD COLUMN IF NOT EXISTS excluded_at TIMESTAMPTZ`;
await s`ALTER TABLE fva_ballots ADD COLUMN IF NOT EXISTS participant_title TEXT NOT NULL DEFAULT ''`;
await s`ALTER TABLE fva_ballots ADD COLUMN IF NOT EXISTS is_test BOOL NOT NULL DEFAULT FALSE`;
await s`CREATE TABLE IF NOT EXISTS fva_settings(id INT PRIMARY KEY CHECK(id=1),voting_open BOOL NOT NULL DEFAULT FALSE)`;
await s`INSERT INTO fva_settings(id,voting_open) VALUES(1,FALSE) ON CONFLICT DO NOTHING`;return s}
const secret=()=>process.env.AWARDS_ADMIN_PASSWORD||'';
const sign=(v:string)=>createHmac('sha256',secret()).update(v).digest('hex');
export function session(){const t=String(Date.now()+43200000);return t+'.'+sign(t)}
export function authorized(c?:string){if(!c||!secret())return false;const [t,s,x]=c.split('.');if(x||!/^\d+$/.test(t||'')||Number(t)<Date.now()||!s||!/^[a-f0-9]{64}$/.test(s))return false;return timingSafeEqual(Buffer.from(s,'hex'),Buffer.from(sign(t),'hex'))}
export function passwordOK(p:unknown){if(typeof p!=='string'||!secret())return false;return timingSafeEqual(createHmac('sha256','fva').update(p).digest(),createHmac('sha256','fva').update(secret()).digest())}
