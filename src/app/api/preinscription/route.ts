import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface PreinscriptionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not configured');
  }
  
  const sql = neon(process.env.DATABASE_URL);
  
  // Créer la table si elle n'existe pas
  await sql`
    CREATE TABLE IF NOT EXISTS preinscriptions (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      timestamp TIMESTAMP NOT NULL
    )
  `;
  
  return sql;
}

export async function GET() {
  try {
    const sql = await initDatabase();
    const results = await sql`SELECT * FROM preinscriptions ORDER BY timestamp DESC`;
    
    const preinscriptions = results.map((row: any) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      timestamp: row.timestamp,
    }));
    
    return NextResponse.json({ success: true, data: preinscriptions });
  } catch (error) {
    console.error('Error reading preinscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read preinscriptions' },
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
      INSERT INTO preinscriptions (
        id, first_name, last_name, email, phone, timestamp
      ) VALUES (
        ${id},
        ${body.firstName},
        ${body.lastName},
        ${body.email},
        ${body.phone},
        ${timestamp}
      )
    `;
    
    const newPreinscription = {
      id,
      timestamp,
      ...body,
    };
    
    return NextResponse.json({ success: true, data: newPreinscription });
  } catch (error) {
    console.error('Error saving preinscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save preinscription' },
      { status: 500 }
    );
  }
}
