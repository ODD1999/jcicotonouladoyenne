'use client';

import React, { useState, useEffect } from 'react';
import { FiUsers, FiDownload, FiRefreshCw, FiUser, FiMapPin, FiPhone, FiAward } from 'react-icons/fi';
import styles from './presents.module.scss';

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

export default function PresentsPage() {
  const [presences, setPresences] = useState<PresenceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'member' | 'ol' | 'guest'>('all');

  const fetchPresences = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/presence');
      const data = await response.json();
      if (data.success) {
        setPresences(data.data);
      }
    } catch (error) {
      console.error('Error fetching presences:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresences();
  }, []);

  const handleExport = () => {
    window.open('/api/presence/export', '_blank');
  };

  const filteredPresences = presences.filter(p => 
    filter === 'all' || p.type === filter
  );

  const stats = {
    total: presences.length,
    members: presences.filter(p => p.type === 'member').length,
    ols: presences.filter(p => p.type === 'ol').length,
    guests: presences.filter(p => p.type === 'guest').length,
  };

  const getFullName = (presence: PresenceData) => {
    if (presence.memberName) return presence.memberName;
    return `${presence.firstName || ''} ${presence.lastName || ''}`.trim();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'member': return 'Membre JCI CLD';
      case 'ol': return 'Membre OL Sœur';
      case 'guest': return 'Sympathisant/Invité';
      default: return type;
    }
  };

  return (
    <div className={styles.presentsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <FiUsers className={styles.titleIcon} />
              Liste de Présence
            </h1>
            <p className={styles.subtitle}>
              Lancement du Mandat ADN 2026 - JCI Cotonou La Doyenne
            </p>
          </div>
          <div className={styles.actions}>
            <button 
              className={styles.refreshButton}
              onClick={fetchPresences}
              disabled={loading}
            >
              <FiRefreshCw className={loading ? styles.spinning : ''} />
              Actualiser
            </button>
            <button 
              className={styles.exportButton}
              onClick={handleExport}
            >
              <FiDownload />
              Exporter Excel
            </button>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.members}</div>
            <div className={styles.statLabel}>Membres JCI CLD</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.ols}</div>
            <div className={styles.statLabel}>Membres OL Sœurs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.guests}</div>
            <div className={styles.statLabel}>Sympathisants/Invités</div>
          </div>
        </div>

        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'member' ? styles.active : ''}`}
            onClick={() => setFilter('member')}
          >
            Membres JCI CLD
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'ol' ? styles.active : ''}`}
            onClick={() => setFilter('ol')}
          >
            Membres OL Sœurs
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'guest' ? styles.active : ''}`}
            onClick={() => setFilter('guest')}
          >
            Sympathisants/Invités
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <FiRefreshCw className={styles.spinner} />
            <p>Chargement...</p>
          </div>
        ) : filteredPresences.length === 0 ? (
          <div className={styles.empty}>
            <FiUsers size={64} />
            <p>Aucun participant enregistré pour le moment</p>
          </div>
        ) : (
          <div className={styles.list}>
            {filteredPresences.map((presence) => (
              <div key={presence.id} className={styles.presenceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <FiUser />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardName}>{getFullName(presence)}</h3>
                    <span className={`${styles.cardType} ${styles[presence.type]}`}>
                      {getTypeLabel(presence.type)}
                    </span>
                  </div>
                </div>
                <div className={styles.cardDetails}>
                  {presence.olName && (
                    <div className={styles.detail}>
                      <FiMapPin />
                      <span>{presence.olName}</span>
                    </div>
                  )}
                  {presence.phone && (
                    <div className={styles.detail}>
                      <FiPhone />
                      <span>{presence.phone}</span>
                    </div>
                  )}
                  {presence.title && (
                    <div className={styles.detail}>
                      <FiAward />
                      <span>{presence.title}</span>
                    </div>
                  )}
                  <div className={styles.timestamp}>
                    {new Date(presence.timestamp).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
