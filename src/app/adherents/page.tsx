'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiDownload, FiEye, FiCalendar, FiMail, FiPhone, FiUser, FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi';
import styles from './adherents.module.scss';

interface Adherent {
  id: string;
  nom: string;
  prenoms: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  lieuNaissance: string;
  formation: string;
  profession: string;
  adresse: string;
  employeur: string;
  commentConnueJci: string;
  attentesJci: string[];
  autreOrganisation: boolean;
  typeOrganisation?: string;
  responsabilites: boolean;
  quellesResponsabilites: string[];
  nomParrain: string;
  accepteFormation: boolean;
  formationsSuivies: boolean;
  themesFormations: Array<{theme: string, formateur: string}>;
  disposeAcquitterFrais: boolean;
  createdAt: string;
}

export default function AdherentsPage() {
  const [adherents, setAdherents] = useState<Adherent[]>([]);
  const [filteredAdherents, setFilteredAdherents] = useState<Adherent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAdherent, setSelectedAdherent] = useState<Adherent | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAdherents();
  }, []);

  useEffect(() => {
    const filtered = adherents.filter(adherent => 
      adherent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.prenoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.telephone.includes(searchTerm)
    );
    setFilteredAdherents(filtered);
  }, [searchTerm, adherents]);

  const fetchAdherents = async () => {
    try {
      const response = await fetch('/api/adhesion');
      const data = await response.json();
      setAdherents(data);
      setFilteredAdherents(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des adhérents:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const csvContent = generateCSV(filteredAdherents);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `adherents_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = (data: Adherent[]) => {
    const headers = [
      'ID', 'Nom', 'Prénoms', 'Email', 'Téléphone', 'Date de naissance', 'Lieu de naissance',
      'Formation', 'Profession', 'Adresse', 'Employeur', 'Comment connu JCI', 'Attentes JCI',
      'Autre organisation', 'Type organisation', 'Responsabilités', 'Quelles responsabilités',
      'Nom parrain', 'Accepte formation', 'Formations suivies', 'Thèmes formations',
      'Dispose acquitter frais', 'Date de création'
    ];

    const csvRows = data.map(adherent => [
      adherent.id,
      adherent.nom,
      adherent.prenoms,
      adherent.email,
      adherent.telephone,
      adherent.dateNaissance,
      adherent.lieuNaissance,
      adherent.formation,
      adherent.profession,
      adherent.adresse,
      adherent.employeur,
      adherent.commentConnueJci,
      adherent.attentesJci.join('; '),
      adherent.autreOrganisation ? 'Oui' : 'Non',
      adherent.typeOrganisation || '',
      adherent.responsabilites ? 'Oui' : 'Non',
      adherent.quellesResponsabilites.join('; '),
      adherent.nomParrain,
      adherent.accepteFormation ? 'Oui' : 'Non',
      adherent.formationsSuivies ? 'Oui' : 'Non',
      adherent.themesFormations.map(f => `${f.theme} (${f.formateur})`).join('; '),
      adherent.disposeAcquitterFrais ? 'Oui' : 'Non',
      new Date(adherent.createdAt).toLocaleDateString('fr-FR')
    ]);

    return [headers, ...csvRows].map(row => row.join(',')).join('\n');
  };

  const viewAdherent = (adherent: Adherent) => {
    setSelectedAdherent(adherent);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement des adhérents...</p>
      </div>
    );
  }

  return (
    <div className={styles.adherentsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Liste des Adhérents</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <FiUser className={styles.statIcon} />
              <div>
                <p className={styles.statNumber}>{filteredAdherents.length}</p>
                <p className={styles.statLabel}>Total</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <FiCalendar className={styles.statIcon} />
              <div>
                <p className={styles.statNumber}>
                  {adherents.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length}
                </p>
                <p className={styles.statLabel}>Aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par nom, email, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button onClick={exportToExcel} className={styles.exportButton}>
            <FiDownload />
            Exporter Excel
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénoms</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Date de naissance</th>
                <th>Profession</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdherents.map((adherent) => (
                <tr key={adherent.id}>
                  <td>{adherent.nom}</td>
                  <td>{adherent.prenoms}</td>
                  <td>{adherent.email}</td>
                  <td>{adherent.telephone}</td>
                  <td>{new Date(adherent.dateNaissance).toLocaleDateString('fr-FR')}</td>
                  <td>{adherent.profession}</td>
                  <td>{new Date(adherent.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button
                      onClick={() => viewAdherent(adherent)}
                      className={styles.viewButton}
                      title="Voir les détails"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAdherents.length === 0 && (
            <div className={styles.noResults}>
              <FiSearch className={styles.noResultsIcon} />
              <p>Aucun adhérent trouvé</p>
            </div>
          )}
        </div>

        {showModal && selectedAdherent && (
          <div className={styles.modal} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Détails de l'adhérent</h2>
                <button onClick={() => setShowModal(false)} className={styles.closeButton}>×</button>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.section}>
                  <h3>Informations personnelles</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <FiUser className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Nom complet</p>
                        <p className={styles.infoValue}>{selectedAdherent.nom} {selectedAdherent.prenoms}</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <FiMail className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Email</p>
                        <p className={styles.infoValue}>{selectedAdherent.email}</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <FiPhone className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Téléphone</p>
                        <p className={styles.infoValue}>{selectedAdherent.telephone}</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <FiCalendar className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Date de naissance</p>
                        <p className={styles.infoValue}>{new Date(selectedAdherent.dateNaissance).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <FiMapPin className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Lieu de naissance</p>
                        <p className={styles.infoValue}>{selectedAdherent.lieuNaissance}</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <FiBriefcase className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Profession</p>
                        <p className={styles.infoValue}>{selectedAdherent.profession}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Informations JCI</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Comment connu JCI</p>
                      <p className={styles.infoValue}>{selectedAdherent.commentConnueJci}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Attentes</p>
                      <p className={styles.infoValue}>{selectedAdherent.attentesJci.join(', ')}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Nom du parrain</p>
                      <p className={styles.infoValue}>{selectedAdherent.nomParrain}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Accepte formation</p>
                      <p className={styles.infoValue}>{selectedAdherent.accepteFormation ? 'Oui' : 'Non'}</p>
                    </div>
                  </div>
                </div>

                {selectedAdherent.formationsSuivies && selectedAdherent.themesFormations.length > 0 && (
                  <div className={styles.section}>
                    <h3>Formations suivies</h3>
                    <div className={styles.formationsList}>
                      {selectedAdherent.themesFormations.map((formation, index) => (
                        <div key={index} className={styles.formationItem}>
                          <p><strong>Thème:</strong> {formation.theme}</p>
                          <p><strong>Formateur:</strong> {formation.formateur}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
