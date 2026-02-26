'use client';

import React, { useState, useEffect } from 'react';
import { FiCheck, FiUsers, FiUser, FiHeart } from 'react-icons/fi';
import styles from './PresenceForm.module.scss';

type ParticipantType = 'member' | 'ol' | 'guest' | null;

interface FormData {
  type: ParticipantType;
  memberName?: string;
  olName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  title?: string;
}

const MEMBERS_LIST = [
  'AHLIGO Akouvi Sylvie',
  'Félix Sèdjro AINAN',
  'DANSOU Luc',
  'Mensanh Arthur amedeo TETE',
  'Auriol AHIDJANHOUN',
  'BARRES Imtihal',
  'BESSANH G. Arnaud',
  'OWOLABI B. A. Samuel',
  'KOUNTANGNI Gbewanou Maurice',
  'AKPOHOUI Didier',
  'GBEBOUME Bidossessi Gilchrist',
  'Fawaz OLAGNIKA AGNIDE SALAMI',
  'MEDIGNI Paul',
  'KOUTEH Tony',
  'Mahuton Paul TOVOEHO',
  'Gildas SEHLIN',
  'SANNI Souleymane',
  'OLOUKA Nadège',
  'Steve Constant KAKOU',
  'AGBANTE Iris Martial',
  'V. Boris Donado DOSSOU-KOKO',
  'HOUNGBEDJI Gracia miracle',
  'TOVIDE A. Déodat',
  'Julien ANANI',
  'T. L. JULES Prosper GBAGUIDI',
  'Octave TOLI',
  'Modeste Arnauld DANGNIVO',
  'Adélaïde HOUNYE KOKOU',
  'Chedrak HOUESSOU',
  'Boris SESSOU',
  'HOUNKPATIN    Aubin',
  'MEDJIGBODO Olabode Olivier',
  'SCINETH-ELSIA Olivia LAURA AZONNOUDO',
  'Gihslaine FAGBOHOUN',
  'HOUNDELO Jasnick',
  'WEGBE Naomi Johanna',
  'Mohamed CISSE',
  'Patrick KOUASSI',
  'Elvis AYOSSO',
  'Dieu Donné OUTCHI',
  'Cossi Franck LANTCHIDE',
  'GADA Komlan Ganyo Emmanuel',
  'Claudelle QUENUM',
  'Clémence DJAKPO',
  'Sén. Georges YAYI',
  'ATTINKPASSO Hounwanou Servile',
  'AHODEGNON Kouame Benjamin',
  'Miguel CHAPON',
  'Gildas DOSSOU AMINON',
  'Ibrahim CISSE',
  'Sourou Bertin AGBOCHAN',
  'Steven Patiento Béko ACCROMBESSI',
  'Stanislas DAMASSOH',
  'FATON Eulèche',
  'Aurore S. GNANHOUI',
  'Sén  Christian M. HOUETCHENOU',
  'Anicet SATOWANOU',
  'Jean Luc AÏDJOTIN',
  'Amamath AHOUANGNIMON',
  'Rodrigue Oscar ALODJI',
  'Selma Odette Fifamè OGUE',
  'Alexandre SEWA',
  'Joseph DEDO',
  'Moïse GANGAN',
  'Sén. José GOUNOUKPEROU',
  'Anita Emma KOUASSI',
  'Lydie KOUKPONOU',
  'Sén. Alida MEDJIGBODO',
  'Boris MICHOZOUNNOU',
  'Sabiratou AMBEKEMA',
  'TRINNOU Yaovi Rock',
  'TOVODOUNON Maryse',
  'Anicet KOUAKANOU',
  'Géoffroy HOUNGBEME',
  'Kévin AZANDEGBE',
  'MONNOUKOUN Sylvain',
  'ZOSSOUNGBO VIANOU Crédos Fructueux',
  'Prudence GANDEBAGNI',
  'Aldin DANSOU',
  'Ruth Genèse KONKOEN',
  'Vermette TCHEGNON',
  'Mehiel T. GNAKADJA',
  'AGUESSY Dieu-Donné Hariste Sènakpon',
  'Gérard AGUIAR',
  'AHOUASSOU Thierry Michel Noukpo',
  'Maurel D. M. HOUNTON',
  'ACHILLE Espérant LALAYE',
  'MADE Giovanni',
  'Martial MAHINOU',
  'AZONSI Stacey Ornella',
  'Jules HONVOH',
  'GOUNON Roméo Hermann',
  'OGOULEYE Claudia Ibiyemi',
  'Abiodou Moise OWOLOYE',
  'HOUNYEME F. Aristide',
  'GODONOU Nadine',
  'Emmanuel GUIDIBI',
  'Sén Eustache Igor GNIMAVO',
  'SOHO Rolland',
  'AMEDJIKO Ulrich',
  'BIGO PRUDENCE HOUNDEKON',
  'Landreyasse DHOSSOU',
  'SAVI Jocelyne',
  'Alban TCHALLA',
  'Mireille AHOYO',
  'Christelle F. CHABI',
  'Jennifer BABATOUNDE',
  'MEWOUSSI Léonidas Alban Matevi',
  'Wantininki Audrey FORONGA',
  'Sén Audrey AGBIDINOUKOUN',
  'Mohamed Mouafack GBADAMASSI',
  'Ulrich R. AGOMMA',
  'Géraldo DOHETO',
  'Onézim OGOUTEÏBO',
  'Funkè Marielle ADJIBODOU',
  'Sén Magloire ZODAN',
  'Florimonde AUDRYA EDOH TOSSA',
  'El Bassith ALIDOU',
  'TOHOUE Freddy',
  'Anselme OLOUKOSSI',
  'Rodiath ADEAGA',
  'Idjaton Babatounde TOHID',
  'BONI Marie Madeleine',
  'DETCHENOU Samson',
  'Arthur KOUDJI',
  'DOSSOU Paul Iréréne',
  'Corentin SEDAGBANDE',
  'GUENDEHOU Sètondji',
  'MAHAMAT LAWANE',
  'Ornéla OGOUTEÏBO',
  'VIWADINOU Dona G.',
  'Caleb CHOUCOUNNOU',
  'LOSSOU B. Armine Pétronille',
  'Merriack DOSSOU',
  'Helios Eudes HOUNSA',
  'TOKOU Gildas',
  'Symphorien ADJOHA',
  'Césaire KOUKPONOU',
  'AMADIDJE Sèmèvo Mon Désir',
  'V. Mariette Gloria AGBODJINOU',
  'DJASSODE Aristide',
  'LOKOSSOU Oscar',
  'Roland HOUESSOU',
  'DJOSSOU Inès',
  'ESSE Oscar',
  'Roland DADJOU',
  'Renauld VITODEGNI',
  'Nadjiba SEIBOU',
  'Euloge NANGA',
  'Christelle CODJIA',
  'PRINCE DESCARTES SEGBEDJI',
  'Daniel BANKOLE',
  'Hermann Maurice FADJO',
  'Samirat DJABAKATIE',
  'Modeste AYIHADE',
  'ELIANE ETOKO',
  'Farouk OROU GANI',
  'DOUKLOUI G. Carine',
  'ADOUNSA Comlan Bruno',
  'Marielle GODONOU',
  'Prudence DJOSSOU',
  'Géraud OGOUKOLA',
  'Dorine ADJIBODOU',
  'Janest DANSOU',
  'AUREL HERMAN MAHUGNON AGBADO',
  'Amani KODOKPO',
  'Chanelle ADDA',
  'Marcaut Luc Ayité MENSAH',
  'Cédric OLOUKOÏ',
  'Edmond AGBOSSAGA',
  'Fadil LIADI',
  'ADJAKPON Jeannot R.',
  'GOUWANOU Gbèdè Toussaint',
  'Daladier YEKPON',
  'Mathurin KOUTON',
  'Mahoutin Edouard ALLONANHIN',
  'Al-Wadoud ADAM',
  'Enos KPATINVO',
  'Bertine KOUAKANOU',
  'Lewis HOUNHOUENOU',
  'Audhrey KOUASSI',
  'Hippolyte FASSINOU',
  'Bénédicte OUEYA',
  'OLUWA-FUNMY HINHAMY MECHIACE ALOHOUTADE',
  'KOUGBLENOU  Lionel Robertson',
  'Yvance Yao ACAKPO',
  'GANDJI Dieudonné',
  'Delphin GBESSINON',
  'Katia KEREKOU',
  'Baldomer MIGAN',
  'Ghislain HODONOU',
  'Sandrine KOUTEH',
  'Claver N\'TCHA N\'DA',
  'Pascal GUITIBY',
  'BABIO Amine',
  'AHOUANDJINOU Rabi-Jacob',
  'Armard Maxime CODJIA',
  'Germain AKAHNGA',
  'Guerschom AKOHA',
  'Mahunakpon Charbel HONVO',
  'TCHIAKPE Noël Kados M.',
  'WOLLO Johannès Sèdjro',
  'HOUNDJAME Roger',
  'BANGAOUE Sylvestre',
];


const OL_SOEURS = [
  'JCI Allada Centre',
  'JCI Aplahoué Cristal',
  'JCI Abomey Houégbadja',
  'JCI Abomey-Calavi Diamant',
  'JCI Abomey-Calavi Elite',
  'JCI Abomey-Calavi Emeraude',
  'JCI Abomey-Calavi Lincoln',
  'JCI Abomey-Calavi Pioneer',
  'JCI Abomey-Calavi Pléiade',
  'JCI Abomey-Calavi Phénix',
  'JCI Abomey-Calavi Sica',
  'JCI Abomey-Calavi Ubora',
  'JCI Adjarra Oasis',
  'JCI Bassila Monts-Kouffè',
  'JCI Bohicon Wanilo',
  'JCI Cotonou Aurore',
  'JCI Cotonou Elan',
  'JCI Cotonou Etoile',
  'JCI Cotonou Espoir',
  'JCI Cotonou Innova',
  'JCI Cotonou Littoral',
  'JCI Cotonou Océan',
  'JCI Cotonou Prestige',
  'JCI Cotonou Soleil',
  'JCI Cotonou Zénith',
  'JCI Cotonou Saphir',
  'JCI Comè Carrefour',
  'JCI Comè Excellence',
  'JCI Dassa 41 Collines',
  'JCI Djougou Action',
  'JCI Kétou Ifè',
  'JCI Lokossa Iroko',
  'JCI Parakou Royal',
  'JCI Pobè Òsòlò',
  'JCI Porto-Novo Auréole',
  'JCI Porto-Novo Impact',
  'JCI Porto-Novo Première',
  'JCI N\'Dali Kéri',
  'JCI Natitingou Baobab',
  'JCI U Cotonu Lumière',
  'JCI U Cotonou Étincelle',
  'JCI Sèmè-kpodji Passion',
  'JCI Sèmè-kpodji Pilier',
  'JCI Ouidah Flamboyant',
  'JCI Ouidah La Couronne',
  'JCI Ouidah Wéziza',
];

const TITLES = ['Membre', 'Sénateur', 'Vice-Président', 'Past Président'];

export default function PresenceForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ type: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const registered = localStorage.getItem('presence_registered');
    if (registered === 'true') {
      setIsRegistered(true);
      setStep(5);
    }
  }, []);

  const handleStepChange = (newStep: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setStep(newStep);
      setFadeIn(true);
    }, 300);
  };

  const handleTypeSelect = (type: ParticipantType) => {
    setFormData({ ...formData, type });
    handleStepChange(type === 'member' ? 2 : type === 'ol' ? 3 : 4);
  };

  const handleMemberSelect = async (memberName: string) => {
    const updatedData = { ...formData, memberName };
    setFormData(updatedData);
    
    try {
      await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      
      localStorage.setItem('presence_registered', 'true');
      setIsRegistered(true);
      handleStepChange(5);
    } catch (error) {
      console.error('Error saving presence:', error);
      localStorage.setItem('presence_registered', 'true');
      setIsRegistered(true);
      handleStepChange(5);
    }
  };

  const handleOLSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      localStorage.setItem('presence_registered', 'true');
      setIsRegistered(true);
      handleStepChange(5);
    } catch (error) {
      console.error('Error saving presence:', error);
      localStorage.setItem('presence_registered', 'true');
      setIsRegistered(true);
      handleStepChange(5);
    }
  };

  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      localStorage.setItem('presence_registered', 'true');
      setIsRegistered(true);
      handleStepChange(5);
    } catch (error) {
      console.error('Error saving presence:', error);
      localStorage.setItem('presence_registered', 'true');
      setIsRegistered(true);
      handleStepChange(5);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('presence_registered');
    setIsRegistered(false);
    setFormData({ type: null });
    setSearchTerm('');
    handleStepChange(0);
  };

  const filteredMembers = MEMBERS_LIST.filter(member =>
    member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOLs = OL_SOEURS.filter(ol =>
    ol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.formCard} ${fadeIn ? styles.fadeIn : styles.fadeOut}`}>
        
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className={styles.stepContent}>
            <div className={styles.welcomeHeader}>
              <div className={styles.logosContainer}>
                <div className={styles.logoCircle}>
                  <img
                    src="/logos/logo1.png"
                    alt="JCI Logo"
                  />
                </div>
                <div className={styles.logoCircle}>
                  <img
                    src="/logos/logo2.png"
                    alt="JCI Logo"
                  />
                </div>
              </div>
              <h1 className={styles.eventTitle}>
                Session d'Information<br />
                <span className={styles.highlight}>JCI Cotonou La Doyenne</span>
              </h1>
              <div className={styles.yearBadge}>Cohorte 2026</div>
              <p className={styles.welcomeText}>
                Nous y sommes ! 🎉
              </p>
              <p className={styles.subtitle}>
                Bienvenue à cette Session d'Information de la JCI Cotonou La Doyenne.
              </p>
            </div>
            <button 
              className={styles.primaryButton}
              onClick={() => handleStepChange(1)}
            >
              Commencer
            </button>
          </div>
        )}

        {/* Step 1: Type Selection */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Vous êtes...</h2>
            <p className={styles.stepDescription}>
              Sélectionnez votre profil pour continuer
            </p>
            
            <div className={styles.typeCards}>
              <button
                className={styles.typeCard}
                onClick={() => handleTypeSelect('member')}
              >
                <div className={styles.typeIcon}>
                  <FiUsers size={32} />
                </div>
                <h3>Membre JCI Cotonou La Doyenne</h3>
                <p>Membre actif de notre organisation locale</p>
              </button>

              <button
                className={styles.typeCard}
                onClick={() => handleTypeSelect('ol')}
              >
                <div className={styles.typeIcon}>
                  <FiHeart size={32} />
                </div>
                <h3>Membre d'une OL Sœur</h3>
                <p>Membre d'une autre organisation locale JCI</p>
              </button>

              <button
                className={styles.typeCard}
                onClick={() => handleTypeSelect('guest')}
              >
                <div className={styles.typeIcon}>
                  <FiUser size={32} />
                </div>
                <h3>Sympathisant / Invité</h3>
                <p>Invité ou sympathisant de la JCI</p>
              </button>
            </div>

            <button 
              className={styles.backButton}
              onClick={() => handleStepChange(0)}
            >
              Retour
            </button>
          </div>
        )}

        {/* Step 2: Member Selection */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Sélectionnez votre nom</h2>
            <p className={styles.stepDescription}>
              Recherchez et sélectionnez votre nom dans la liste
            </p>

            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Tapez votre nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
            </div>

            <div className={styles.membersList}>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <button
                    key={index}
                    className={styles.memberItem}
                    onClick={() => handleMemberSelect(member)}
                  >
                    <span>{member}</span>
                    <FiCheck className={styles.checkIcon} />
                  </button>
                ))
              ) : (
                <p className={styles.noResults}>Aucun membre trouvé</p>
              )}
            </div>

            <button 
              className={styles.backButton}
              onClick={() => handleStepChange(1)}
            >
              Retour
            </button>
          </div>
        )}

        {/* Step 3: OL Form */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Informations OL Sœur</h2>
            <p className={styles.stepDescription}>
              Complétez vos informations
            </p>

            <form onSubmit={handleOLSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Organisation Locale</label>
                <select
                  required
                  value={formData.olName || ''}
                  onChange={(e) => setFormData({ ...formData, olName: e.target.value })}
                  className={styles.select}
                >
                  <option value="">Sélectionnez votre OL</option>
                  {OL_SOEURS.map((ol, index) => (
                    <option key={index} value={ol}>{ol}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Prénom</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Numéro de téléphone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={styles.input}
                  placeholder="+229 XX XX XX XX"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Titre</label>
                <select
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.select}
                >
                  <option value="">Sélectionnez un titre</option>
                  {TITLES.map((title, index) => (
                    <option key={index} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.primaryButton}>
                Terminer
              </button>
            </form>

            <button 
              className={styles.backButton}
              onClick={() => handleStepChange(1)}
            >
              Retour
            </button>
          </div>
        )}

        {/* Step 4: Guest Form */}
        {step === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Informations Invité</h2>
            <p className={styles.stepDescription}>
              Complétez vos informations
            </p>

            <form onSubmit={handleGuestSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Prénom</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Numéro de téléphone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={styles.input}
                  placeholder="+229 XX XX XX XX"
                />
              </div>

              <button type="submit" className={styles.primaryButton}>
                Terminer
              </button>
            </form>

            <button 
              className={styles.backButton}
              onClick={() => handleStepChange(1)}
            >
              Retour
            </button>
          </div>
        )}

        {/* Step 5: Thank You */}
        {step === 5 && (
          <div className={styles.stepContent}>
            <div className={styles.thankYouContent}>
              <div className={styles.successIcon}>
                <FiCheck size={64} />
              </div>
              <h2 className={styles.thankYouTitle}>
                Merci pour votre présence !
              </h2>
              <p className={styles.thankYouText}>
                Nous sommes ravis de vous accueillir à cette magnifique Session d'Information. 
                Votre participation contribue à faire de ces échanges un moment inoubliable.
              </p>
              <p className={styles.thankYouSubtext}>
                Profitez pleinement ! 🎊
              </p>

              {isRegistered && (
                <button 
                  className={styles.resetButton}
                  onClick={handleReset}
                >
                  Je ne me suis pas enregistré
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
