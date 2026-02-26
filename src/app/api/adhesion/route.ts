import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface AdhesionData {
  id: string;
  nom: string;
  prenoms: string;
  formation: string;
  profession: string;
  adresse: string;
  employeur: string;
  dateLieuNaissance: string;
  contact: string;
  email: string;
  telephone: string;
  commentConnueJci: string;
  autresCommentConnue: string;
  attentesJci: string;
  autresAttentes: string;
  autreOrganisation: boolean;
  typeOrganisation: string;
  autresTypeOrganisation: string;
  responsabilites: boolean;
  quellesResponsabilites: string;
  autresResponsabilites: string;
  periodeProbatoireConnue: boolean;
  parrainNecessaireConnue: boolean;
  aParrain: boolean;
  nomParrain: string;
  formationEvaluationConnue: boolean;
  accepteFormation: boolean;
  formationsSuivies: boolean;
  themesFormations: string;
  fraisConnus: boolean;
  disposeAcquitterFrais: boolean;
  timestamp: string;
}

async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not configured');
  }
  
  const sql = neon(process.env.DATABASE_URL);
  
  // Créer la table des adhésions si elle n'existe pas
  await sql`
    CREATE TABLE IF NOT EXISTS adhesions (
      id VARCHAR(255) PRIMARY KEY,
      nom VARCHAR(255) NOT NULL,
      prenoms VARCHAR(255) NOT NULL,
      formation TEXT,
      profession TEXT,
      adresse TEXT,
      employeur TEXT,
      date_lieu_naissance TEXT,
      contact TEXT,
      email VARCHAR(255) UNIQUE NOT NULL,
      telephone VARCHAR(255) NOT NULL,
      comment_connue_jci VARCHAR(255),
      autres_comment_connue TEXT,
      attentes_jci TEXT,
      autres_attentes TEXT,
      autre_organisation BOOLEAN DEFAULT FALSE,
      type_organisation VARCHAR(255),
      autres_type_organisation TEXT,
      responsabilites BOOLEAN DEFAULT FALSE,
      quelles_responsabilites TEXT,
      autres_responsabilites TEXT,
      periode_probatoire_connue BOOLEAN DEFAULT FALSE,
      parrain_necessaire_connue BOOLEAN DEFAULT FALSE,
      a_parrain BOOLEAN DEFAULT FALSE,
      nom_parrain TEXT,
      formation_evaluation_connue BOOLEAN DEFAULT FALSE,
      accepte_formation BOOLEAN DEFAULT FALSE,
      formations_suivies BOOLEAN DEFAULT FALSE,
      themes_formations TEXT,
      frais_connus BOOLEAN DEFAULT FALSE,
      dispose_acquitter_frais BOOLEAN DEFAULT FALSE,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  return sql;
}

export async function GET() {
  try {
    const sql = await initDatabase();
    const results = await sql`SELECT * FROM adhesions ORDER BY timestamp DESC`;
    
    const adhesions = results.map((row: any) => ({
      id: row.id,
      nom: row.nom,
      prenoms: row.prenoms,
      formation: row.formation,
      profession: row.profession,
      adresse: row.adresse,
      employeur: row.employeur,
      dateLieuNaissance: row.date_lieu_naissance,
      contact: row.contact,
      email: row.email,
      telephone: row.telephone,
      commentConnueJci: row.comment_connue_jci,
      autresCommentConnue: row.autres_comment_connue,
      attentesJci: row.attentes_jci,
      autresAttentes: row.autres_attentes,
      autreOrganisation: row.autre_organisation,
      typeOrganisation: row.type_organisation,
      autresTypeOrganisation: row.autres_type_organisation,
      responsabilites: row.responsabilites,
      quellesResponsabilites: row.quelles_responsabilites,
      autresResponsabilites: row.autres_responsabilites,
      periodeProbatoireConnue: row.periode_probatoire_connue,
      parrainNecessaireConnue: row.parrain_necessaire_connue,
      aParrain: row.a_parrain,
      nomParrain: row.nom_parrain,
      formationEvaluationConnue: row.formation_evaluation_connue,
      accepteFormation: row.accepte_formation,
      formationsSuivies: row.formations_suivies,
      themesFormations: row.themes_formations,
      fraisConnus: row.frais_connus,
      disposeAcquitterFrais: row.dispose_acquitter_frais,
      timestamp: row.timestamp,
    }));
    
    return NextResponse.json({ success: true, data: adhesions });
  } catch (error) {
    console.error('Error reading adhesions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read adhesions' },
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
    
    // Convertir les tableaux en chaînes JSON pour le stockage
    const attentesJciJson = JSON.stringify(body.attentesJci || []);
    const quellesResponsabilitesJson = JSON.stringify(body.quellesResponsabilites || []);
    const themesFormationsJson = JSON.stringify(body.themesFormations || []);
    
    await sql`
      INSERT INTO adhesions (
        id, nom, prenoms, formation, profession, adresse, employeur, 
        date_lieu_naissance, contact, email, telephone, comment_connue_jci, 
        autres_comment_connue, attentes_jci, autres_attentes, autre_organisation,
        type_organisation, autres_type_organisation, responsabilites,
        quelles_responsabilites, autres_responsabilites, periode_probatoire_connue,
        parrain_necessaire_connue, a_parrain, nom_parrain, formation_evaluation_connue,
        accepte_formation, formations_suivies, themes_formations, frais_connus,
        dispose_acquitter_frais, timestamp
      ) VALUES (
        ${id}, ${body.nom}, ${body.prenoms}, ${body.formation}, ${body.profession},
        ${body.adresse}, ${body.employeur}, ${body.dateLieuNaissance}, ${body.contact},
        ${body.email}, ${body.telephone}, ${body.commentConnueJci}, ${body.autresCommentConnue},
        ${attentesJciJson}, ${body.autresAttentes}, ${body.autreOrganisation},
        ${body.typeOrganisation}, ${body.autresTypeOrganisation}, ${body.responsabilites},
        ${quellesResponsabilitesJson}, ${body.autresResponsabilites}, ${body.periodeProbatoireConnue},
        ${body.parrainNecessaireConnue}, ${body.aParrain}, ${body.nomParrain}, ${body.formationEvaluationConnue},
        ${body.accepteFormation}, ${body.formationsSuivies}, ${themesFormationsJson}, ${body.fraisConnus},
        ${body.disposeAcquitterFrais}, ${timestamp}
      )
    `;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Adhesion submitted successfully',
      id: id
    });
  } catch (error) {
    console.error('Error submitting adhesion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit adhesion' },
      { status: 500 }
    );
  }
}
