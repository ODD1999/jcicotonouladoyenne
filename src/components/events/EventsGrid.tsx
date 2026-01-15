'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiTag, FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import styles from './EventsGrid.module.scss';

interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  price: string;
  status: 'upcoming' | 'ongoing' | 'past';
  image: string;
  featured: boolean;
}

export default function EventsGrid() {
  const [activeType, setActiveType] = useState('all');
  const [activeStatus, setActiveStatus] = useState('upcoming');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const eventTypes = [
    { id: 'all', label: 'Tous', icon: <FiTag size={18} /> },
    { id: 'formation', label: 'Formation', icon: <FiTag size={18} /> },
    { id: 'networking', label: 'Networking', icon: <FiUsers size={18} /> },
    { id: 'conference', label: 'Conférence', icon: <FiTag size={18} /> },
    { id: 'workshop', label: 'Atelier', icon: <FiTag size={18} /> },
    { id: 'social', label: 'Social', icon: <FiTag size={18} /> },
  ];

  const statusFilters = [
    { id: 'upcoming', label: 'À venir' },
    { id: 'ongoing', label: 'En cours' },
    { id: 'past', label: 'Passés' },
  ];

  const events: Event[] = [
    {
      id: 1,
      title: 'Leadership Summit 2024',
      description: 'Grand sommet annuel sur le leadership avec des speakers internationaux et des ateliers pratiques.',
      type: 'conference',
      date: '15 Février 2024',
      time: '09:00 - 17:00',
      location: 'Hôtel du Port, Cotonou',
      attendees: '200+',
      price: 'Gratuit',
      status: 'upcoming',
      image: '/hero/hero1.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'Networking Evening',
      description: 'Soirée de networking pour connecter entrepreneurs, investisseurs et professionnels.',
      type: 'networking',
      date: '22 Février 2024',
      time: '18:00 - 21:00',
      location: 'JCI House',
      attendees: '100+',
      price: '5000 FCFA',
      status: 'upcoming',
      image: '/hero/hero2.jpg',
      featured: false,
    },
    {
      id: 3,
      title: 'Entrepreneurship Workshop',
      description: 'Atelier pratique sur le lancement et la gestion d\'une startup à succès.',
      type: 'workshop',
      date: '05 Mars 2024',
      time: '14:00 - 18:00',
      location: 'Centre SONGHAI',
      attendees: '150+',
      price: 'Gratuit',
      status: 'upcoming',
      image: '/hero/hero3.jpg',
      featured: true,
    },
    {
      id: 4,
      title: 'Digital Marketing Masterclass',
      description: 'Formation intensive sur les stratégies de marketing digital pour entrepreneurs.',
      type: 'formation',
      date: '12 Mars 2024',
      time: '09:00 - 16:00',
      location: 'Espace Numérique',
      attendees: '80+',
      price: '10000 FCFA',
      status: 'upcoming',
      image: '/hero/hero4.jpg',
      featured: false,
    },
    {
      id: 5,
      title: 'Community Impact Day',
      description: 'Journée dédiée aux actions sociales et communautaires dans les quartiers de Cotonou.',
      type: 'social',
      date: '20 Mars 2024',
      time: '08:00 - 14:00',
      location: 'Divers quartiers',
      attendees: '300+',
      price: 'Gratuit',
      status: 'upcoming',
      image: '/hero/hero1.jpg',
      featured: false,
    },
    {
      id: 6,
      title: 'Women in Business Conference',
      description: 'Conférence dédiée aux femmes entrepreneures avec témoignages et panels.',
      type: 'conference',
      date: '28 Mars 2024',
      time: '10:00 - 16:00',
      location: 'Palais des Congrès',
      attendees: '250+',
      price: 'Gratuit',
      status: 'upcoming',
      image: '/hero/hero2.jpg',
      featured: true,
    },
    {
      id: 7,
      title: 'Innovation Challenge Final',
      description: 'Finale du concours d\'innovation avec présentation des projets et remise des prix.',
      type: 'conference',
      date: '10 Janvier 2024',
      time: '15:00 - 19:00',
      location: 'Hôtel Azalaï',
      attendees: '180+',
      price: 'Gratuit',
      status: 'past',
      image: '/hero/hero3.jpg',
      featured: false,
    },
    {
      id: 8,
      title: 'Public Speaking Workshop',
      description: 'Atelier de prise de parole en public pour développer vos compétences oratoires.',
      type: 'workshop',
      date: '18 Janvier 2024',
      time: '14:00 - 17:00',
      location: 'JCI House',
      attendees: '50+',
      price: '8000 FCFA',
      status: 'past',
      image: '/hero/hero4.jpg',
      featured: false,
    },
  ];

  const filteredEvents = events.filter((event) => {
    const typeMatch = activeType === 'all' || event.type === activeType;
    const statusMatch = event.status === activeStatus;
    return typeMatch && statusMatch;
  });

  const featuredEvents = filteredEvents.filter(e => e.featured);
  const regularEvents = filteredEvents.filter(e => !e.featured);

  return (
    <section className={styles.eventsGrid}>
      <div className={styles.container}>
        <div className={styles.filtersSection}>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterLabel}>Type d'événement</h4>
            <div className={styles.typeFilters}>
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  className={`${styles.filterButton} ${activeType === type.id ? styles.active : ''}`}
                  onClick={() => setActiveType(type.id)}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <div className={styles.resultsInfo}>
              <h2 className={styles.resultsTitle}>
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Événement' : 'Événements'}
              </h2>
              <p className={styles.resultsDescription}>
                {activeType === 'all' && activeStatus === 'upcoming'
                  ? 'Tous les événements à venir'
                  : 'Événements filtrés selon vos critères'}
              </p>
            </div>

            <div className={styles.rightFilters}>
              <div className={styles.statusFilters}>
                {statusFilters.map((status) => (
                  <button
                    key={status.id}
                    className={`${styles.statusButton} ${activeStatus === status.id ? styles.active : ''}`}
                    onClick={() => setActiveStatus(status.id)}
                  >
                    {status.label}
                  </button>
                ))}
              </div>

              <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Vue grille"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="2" y="2" width="7" height="7" rx="1" />
                  <rect x="11" y="2" width="7" height="7" rx="1" />
                  <rect x="2" y="11" width="7" height="7" rx="1" />
                  <rect x="11" y="11" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="Vue liste"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="2" y="3" width="16" height="3" rx="1" />
                  <rect x="2" y="8.5" width="16" height="3" rx="1" />
                  <rect x="2" y="14" width="16" height="3" rx="1" />
                </svg>
              </button>
            </div>
            </div>
          </div>

          {featuredEvents.length > 0 && (
            <div className={styles.featuredSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.starIcon}>⭐</span>
                Événements à la une
              </h3>
              <div className={`${styles.eventsContainer} ${styles[viewMode]}`}>
                {featuredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} featured index={index} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          {regularEvents.length > 0 && (
            <div className={styles.regularSection}>
              {featuredEvents.length > 0 && (
                <h3 className={styles.sectionTitle}>Autres événements</h3>
              )}
              <div className={`${styles.eventsContainer} ${styles[viewMode]}`}>
                {regularEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FiCalendar size={48} />
              </div>
              <h3 className={styles.emptyTitle}>Aucun événement trouvé</h3>
              <p className={styles.emptyDescription}>
                Essayez de modifier vos filtres pour voir plus d'événements.
              </p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setActiveType('all');
                  setActiveStatus('upcoming');
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, featured = false, index, viewMode = 'grid' }: { event: Event; featured?: boolean; index: number; viewMode?: 'grid' | 'list' }) {
  return (
    <div
      className={`${styles.eventCard} ${featured ? styles.featured : ''} ${viewMode === 'list' ? styles.listView : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.eventImage}>
        <img src={event.image} alt={event.title} />
        <div className={styles.imageOverlay}>
          {featured && <div className={styles.featuredBadge}>⭐ À la une</div>}
          <div className={styles.priceBadge}>{event.price}</div>
        </div>
      </div>

      <div className={styles.eventContent}>
        <div className={styles.eventType}>{event.type}</div>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDescription}>{event.description}</p>

        <div className={styles.eventMeta}>
          <div className={styles.metaItem}>
            <FiCalendar size={16} />
            <span>{event.date}</span>
          </div>
          <div className={styles.metaItem}>
            <FiClock size={16} />
            <span>{event.time}</span>
          </div>
          <div className={styles.metaItem}>
            <FiMapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className={styles.metaItem}>
            <FiUsers size={16} />
            <span>{event.attendees} participants</span>
          </div>
        </div>

        <div className={styles.eventActions}>
          <Link href={`/evenements/${event.id}`} className={styles.detailsButton}>
            Voir les détails
          </Link>
          {event.status === 'upcoming' && (
            <button className={styles.registerButton}>
              S'inscrire
            </button>
          )}
        </div>
      </div>

      <div className={styles.cardShine}></div>
    </div>
  );
}
