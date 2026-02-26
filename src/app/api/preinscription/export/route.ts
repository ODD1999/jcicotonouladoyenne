import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface PreinscriptionData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timestamp: string;
}

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not configured');
    }
    
    const sql = neon(process.env.DATABASE_URL);
    const results = await sql`SELECT * FROM preinscriptions ORDER BY timestamp DESC`;
    
    const preinscriptions: PreinscriptionData[] = results.map((row: any) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      timestamp: row.timestamp,
    }));
    
    let csv = 'Nom,Prénom,Email,Téléphone,Date d\'inscription\n';
    
    preinscriptions.forEach((preinscription) => {
      const fullName = `${preinscription.firstName} ${preinscription.lastName}`;
      const date = new Date(preinscription.timestamp).toLocaleString('fr-FR');
      
      csv += `"${preinscription.lastName}","${preinscription.firstName}","${preinscription.email}","${preinscription.phone}","${date}"\n`;
    });
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv;charset=utf-8',
        'Content-Disposition': `attachment; filename="preinscriptions-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting preinscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export preinscriptions' },
      { status: 500 }
    );
  }
}
