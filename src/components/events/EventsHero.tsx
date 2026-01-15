'use client';

import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import styles from './EventsHero.module.scss';

export default function EventsHero() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextEvents = [
    {
      title: 'Leadership Summit 2024',
      date: '15 Février 2024',
      time: '09:00',
      location: 'Hôtel du Port, Cotonou',
      attendees: '200+',
      type: 'Formation',
    },
    {
      title: 'Networking Evening',
      date: '22 Février 2024',
      time: '18:00',
      location: 'JCI House',
      attendees: '100+',
      type: 'Networking',
    },
    {
      title: 'Entrepreneurship Workshop',
      date: '05 Mars 2024',
      time: '14:00',
      location: 'Centre SONGHAI',
      attendees: '150+',
      type: 'Formation',
    },
  ];

  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
        <div className={styles.floatingShape3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.leftContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>Événements JCI</span>
            </div>

            <h1 className={styles.title}>
              Rejoignez nos
              <br />
              <span className={styles.gradientText}>Événements</span> Inspirants
            </h1>

            <p className={styles.description}>
              Des rencontres enrichissantes, des formations de qualité et des opportunités de networking 
              pour développer votre leadership et élargir votre réseau professionnel.
            </p>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>50+</div>
                <div className={styles.statLabel}>Événements/an</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>2000+</div>
                <div className={styles.statLabel}>Participants</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>12</div>
                <div className={styles.statLabel}>Pays représentés</div>
              </div>
            </div>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.calendarCard}>
              <div className={styles.calendarHeader}>
                <div className={styles.currentDate}>
                  <div className={styles.day}>{days[currentDate.getDay()]}</div>
                  <div className={styles.dateNumber}>{currentDate.getDate()}</div>
                  <div className={styles.month}>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
                </div>
                <div className={styles.liveIndicator}>
                  <span className={styles.liveDot}></span>
                  <span>Live</span>
                </div>
              </div>

              <div className={styles.upcomingList}>
                <h3 className={styles.upcomingTitle}>Prochains Événements</h3>
                {nextEvents.map((event, index) => (
                  <div key={index} className={styles.eventItem}>
                    <div className={styles.eventType}>{event.type}</div>
                    <div className={styles.eventTitle}>{event.title}</div>
                    <div className={styles.eventMeta}>
                      <div className={styles.metaItem}>
                        <FiCalendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FiClock size={14} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className={styles.eventFooter}>
                      <div className={styles.metaItem}>
                        <FiMapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FiUsers size={14} />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Découvrir tous les événements</span>
      </div>
    </section>
  );
}
