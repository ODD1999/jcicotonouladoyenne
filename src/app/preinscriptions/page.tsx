'use client';

import React, { useState, useEffect } from 'react';
import { FiDownload, FiUsers, FiMail, FiPhone, FiCalendar, FiFilter, FiSearch } from 'react-icons/fi';
import styles from './preinscriptions.module.scss';

interface PreinscriptionData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timestamp: string;
}

export default function PreinscriptionsPage() {
  const [preinscriptions, setPreinscriptions] = useState<PreinscriptionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'recent' | 'older'>('all');

  const fetchPreinscriptions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/preinscription');
      const data = await response.json();
      if (data.success) {
        setPreinscriptions(data.data);
      }
    } catch (error) {
      console.error('Error fetching preinscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreinscriptions();
  }, []);

  const handleExport = () => {
    window.open('/api/preinscription/export', '_blank');
  };

  const filteredPreinscriptions = preinscriptions.filter(p => {
    const matchesSearch = `${p.firstName} ${p.lastName} ${p.email} ${p.phone}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'recent') {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return matchesSearch && new Date(p.timestamp) > twoDaysAgo;
    } else if (filter === 'older') {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return matchesSearch && new Date(p.timestamp) <= twoDaysAgo;
    }
    
    return matchesSearch;
  });

  const stats = {
    total: preinscriptions.length,
    recent: preinscriptions.filter(p => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return new Date(p.timestamp) > twoDaysAgo;
    }).length,
    older: preinscriptions.filter(p => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return new Date(p.timestamp) <= twoDaysAgo;
    }).length,
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement des préinscriptions...</p>
      </div>
    );
  }

  return (
    <div className={styles.preinscriptionsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <FiUsers className={styles.titleIcon} />
              Préinscriptions Session 2026
            </h1>
            <p className={styles.subtitle}>
              Liste des participants inscrits à la session d'information
            </p>
          </div>
          <button onClick={handleExport} className={styles.exportButton}>
            <FiDownload className={styles.buttonIcon} />
            Exporter Excel
          </button>
        </header>

        {/* Statistiques */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total inscrits</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.recent}</div>
            <div className={styles.statLabel}>Derniers 48h</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.older}</div>
            <div className={styles.statLabel}>Plus de 48h</div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className={styles.filtersContainer}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par nom, email, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterButtons}>
            <button
              onClick={() => setFilter('all')}
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`${styles.filterButton} ${filter === 'recent' ? styles.active : ''}`}
            >
              Derniers 48h
            </button>
            <button
              onClick={() => setFilter('older')}
              className={`${styles.filterButton} ${filter === 'older' ? styles.active : ''}`}
            >
              Plus de 48h
            </button>
          </div>
        </div>

        {/* Liste des inscrits */}
        <div className={styles.listContainer}>
          {filteredPreinscriptions.length === 0 ? (
            <div className={styles.emptyState}>
              <FiUsers className={styles.emptyIcon} />
              <h3>Aucune préinscription trouvée</h3>
              <p>
                {searchTerm || filter !== 'all' 
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Personne ne s\'est encore inscrit'
                }
              </p>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Date d'inscription</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPreinscriptions.map((preinscription) => (
                    <tr key={preinscription.id}>
                      <td className={styles.nameCell}>
                        <div className={styles.nameContent}>
                          <strong>{preinscription.firstName} {preinscription.lastName}</strong>
                        </div>
                      </td>
                      <td className={styles.emailCell}>
                        <div className={styles.emailContent}>
                          <FiMail className={styles.cellIcon} />
                          {preinscription.email}
                        </div>
                      </td>
                      <td className={styles.phoneCell}>
                        <div className={styles.phoneContent}>
                          <FiPhone className={styles.cellIcon} />
                          {preinscription.phone}
                        </div>
                      </td>
                      <td className={styles.dateCell}>
                        <div className={styles.dateContent}>
                          <FiCalendar className={styles.cellIcon} />
                          {new Date(preinscription.timestamp).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
