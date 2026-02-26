import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface PresenceData {
  id: string;
  timestamp: string;
  type: 'member' | 'ol' | 'guest';
  memberName?: string;
  olName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  title?: string;
}

async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not configured');
  }
  
  const sql = neon(process.env.DATABASE_URL);
  
  // Créer la table si elle n'existe pas
  await sql`
    CREATE TABLE IF NOT EXISTS presences (
      id TEXT PRIMARY KEY,
      timestamp TIMESTAMP NOT NULL,
      type TEXT NOT NULL,
      member_name TEXT,
      ol_name TEXT,
      first_name TEXT,
      last_name TEXT,
      phone TEXT,
      title TEXT
    )
  `;
  
  return sql;
}

export async function GET() {
  try {
    const sql = await initDatabase();
    const results = await sql`SELECT * FROM presences ORDER BY timestamp DESC`;
    
    const presences: PresenceData[] = results.map((row: any) => ({
      id: row.id,
      timestamp: row.timestamp,
      type: row.type,
      memberName: row.member_name,
      olName: row.ol_name,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      title: row.title,
    }));
    
    return NextResponse.json({ success: true, data: presences });
  } catch (error) {
    console.error('Error reading presences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read presences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sql = await initDatabase();
    
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    await sql`
      INSERT INTO presences (
        id, timestamp, type, member_name, ol_name, 
        first_name, last_name, phone, title
      ) VALUES (
        ${id},
        ${timestamp},
        ${body.type},
        ${body.memberName || null},
        ${body.olName || null},
        ${body.firstName || null},
        ${body.lastName || null},
        ${body.phone || null},
        ${body.title || null}
      )
    `;
    
    const newPresence: PresenceData = {
      id,
      timestamp,
      ...body,
    };
    
    return NextResponse.json({ success: true, data: newPresence });
  } catch (error) {
    console.error('Error saving presence:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save presence' },
      { status: 500 }
    );
  }
}
