'use client';

import React from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from './UpcomingEvents.module.scss';

export default function UpcomingEvents() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Leadership Summit 2024',
      description: 'Grand sommet annuel sur le leadership avec des speakers internationaux.',
      date: '15 Février 2024',
      time: '09:00',
      location: 'Hôtel du Port, Cotonou',
      attendees: '200+',
      type: 'Conférence',
      color: 'blue',
      daysUntil: 12,
    },
    {
      id: 2,
      title: 'Networking Evening',
      description: 'Soirée de networking pour connecter entrepreneurs et investisseurs.',
      date: '22 Février 2024',
      time: '18:00',
      location: 'JCI House',
      attendees: '100+',
      type: 'Networking',
      color: 'yellow',
      daysUntil: 19,
    },
    {
      id: 3,
      title: 'Entrepreneurship Workshop',
      description: 'Atelier pratique sur le lancement d\'une startup à succès.',
      date: '05 Mars 2024',
      time: '14:00',
      location: 'Centre SONGHAI',
      attendees: '150+',
      type: 'Formation',
      color: 'orange',
      daysUntil: 30,
    },
    {
      id: 4,
      title: 'Digital Marketing Masterclass',
      description: 'Formation intensive sur les stratégies de marketing digital.',
      date: '12 Mars 2024',
      time: '09:00',
      location: 'Espace Numérique',
      attendees: '80+',
      type: 'Formation',
      color: 'blue',
      daysUntil: 37,
    },
  ];

  return (
    <section className={styles.upcomingEvents}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Prochains <span className={styles.gradientText}>Événements</span>
          </h2>
          <p className={styles.description}>
            Ne manquez pas nos événements à venir. Inscrivez-vous dès maintenant pour réserver votre place.
          </p>
        </div>

        <div className={styles.timeline}>
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={`${styles.timelineItem} ${styles[event.color]}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.timelineDot}>
                <div className={styles.dotInner}></div>
                <div className={styles.dotPulse}></div>
              </div>

              <div className={styles.timelineContent}>
                <div className={styles.eventCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.eventType}>{event.type}</div>
                    <div className={styles.countdown}>
                      <FiCalendar size={16} />
                      <span>Dans {event.daysUntil} jours</span>
                    </div>
                  </div>

                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>

                  <div className={styles.eventDetails}>
                    <div className={styles.detailItem}>
                      <FiCalendar size={18} />
                      <div className={styles.detailContent}>
                        <div className={styles.detailLabel}>Date</div>
                        <div className={styles.detailValue}>{event.date}</div>
                      </div>
                    </div>

                    <div className={styles.detailItem}>
                      <FiClock size={18} />
                      <div className={styles.detailContent}>
                        <div className={styles.detailLabel}>Heure</div>
                        <div className={styles.detailValue}>{event.time}</div>
                      </div>
                    </div>

                    <div className={styles.detailItem}>
                      <FiMapPin size={18} />
                      <div className={styles.detailContent}>
                        <div className={styles.detailLabel}>Lieu</div>
                        <div className={styles.detailValue}>{event.location}</div>
                      </div>
                    </div>

                    <div className={styles.detailItem}>
                      <FiUsers size={18} />
                      <div className={styles.detailContent}>
                        <div className={styles.detailLabel}>Participants</div>
                        <div className={styles.detailValue}>{event.attendees}</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Link href={`/evenements/${event.id}`} className={styles.detailsLink}>
                      Plus de détails
                      <FiArrowRight size={18} />
                    </Link>
                    <button className={styles.registerButton}>
                      S'inscrire maintenant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <h3 className={styles.ctaTitle}>Restez informé de nos événements</h3>
              <p className={styles.ctaText}>
                Inscrivez-vous à notre newsletter pour recevoir les invitations en avant-première 
                et ne manquer aucun de nos événements.
              </p>
            </div>
            <div className={styles.ctaRight}>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.subscribeButton}>
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
