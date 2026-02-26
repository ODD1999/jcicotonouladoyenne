import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not configured');
    }
    
    const sql = neon(process.env.DATABASE_URL);
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
    
    let csv = 'Type,Nom Complet,Organisation,Téléphone,Titre,Date/Heure\n';
    
    presences.forEach((presence) => {
      const type = presence.type === 'member' ? 'Membre JCI CLD' : 
                   presence.type === 'ol' ? 'Membre OL Sœur' : 
                   'Sympathisant/Invité';
      
      const fullName = presence.memberName || 
                       `${presence.firstName || ''} ${presence.lastName || ''}`.trim();
      
      const org = presence.type === 'member' ? 'JCI Cotonou La Doyenne' : 
                  presence.olName || '-';
      
      const phone = presence.phone || '-';
      const title = presence.title || '-';
      const date = new Date(presence.timestamp).toLocaleString('fr-FR');
      
      csv += `"${type}","${fullName}","${org}","${phone}","${title}","${date}"\n`;
    });
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="presences-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting presences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export presences' },
      { status: 500 }
    );
  }
}
