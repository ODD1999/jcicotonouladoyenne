import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

async function initDatabase() {
  try {
    if (process.env.DATABASE_URL) {
      const neonDb = neon(process.env.DATABASE_URL);
      return neonDb;
    }
    throw new Error('DATABASE_URL not configured');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

async function createTableIfNotExists() {
  const sql = await initDatabase();
  
  await sql`
    CREATE TABLE IF NOT EXISTS interesses (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT NOT NULL,
      telephone TEXT NOT NULL,
      profession TEXT NOT NULL,
      adresse TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function GET() {
  try {
    const sql = await initDatabase();
    await createTableIfNotExists();

    const result = await sql`
      SELECT 
        id,
        nom,
        prenom,
        email,
        telephone,
        profession,
        adresse,
        created_at as "createdAt"
      FROM interesses
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error reading interesses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read interesses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sql = await initDatabase();
    await createTableIfNotExists();

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    await sql`
      INSERT INTO interesses (
        id, nom, prenom, email, telephone, profession, adresse, created_at
      ) VALUES (
        ${id}, ${body.nom}, ${body.prenom}, ${body.email}, ${body.telephone}, ${body.profession}, ${body.adresse}, ${timestamp}
      )
    `;

    return NextResponse.json({
      success: true,
      message: 'Intérêt enregistré avec succès',
      id: id
    });
  } catch (error) {
    console.error('Error creating interesse:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create interesse' },
      { status: 500 }
    );
  }
}
