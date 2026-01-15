'use client';

import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import styles from './TimelineSection.module.scss';

export default function TimelineSection() {
  const [activeYear, setActiveYear] = useState(0);

  const timeline = [
    {
      year: '1960',
      title: 'Fondation',
      description: 'Création de JCI Cotonou la Doyenne, première organisation de jeunes leaders au Bénin.',
      highlight: 'Premier chapitre JCI du pays',
    },
    {
      year: '1985',
      title: 'Expansion Régionale',
      description: 'Extension de nos activités dans toute la région du Littoral avec des projets d\'envergure.',
      highlight: '50+ projets communautaires',
    },
    {
      year: '2000',
      title: 'Reconnaissance Internationale',
      description: 'Obtention de plusieurs prix internationaux pour nos initiatives innovantes.',
      highlight: 'Prix d\'Excellence JCI',
    },
    {
      year: '2015',
      title: 'Transformation Digitale',
      description: 'Lancement de notre plateforme numérique et modernisation de nos processus.',
      highlight: 'Innovation technologique',
    },
    {
      year: '2024',
      title: 'Nouvelle Ère',
      description: 'Plus de 500 membres actifs et un impact touchant des milliers de bénéficiaires.',
      highlight: '60+ ans d\'excellence',
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <FiCalendar size={16} />
            Notre Histoire
          </div>
          <h2 className={styles.title}>
            Plus de <span className={styles.gradientText}>60 Ans</span> d'Impact
          </h2>
          <p className={styles.description}>
            Un parcours exceptionnel marqué par l'engagement, l'innovation et le service à la communauté.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${index === activeYear ? styles.active : ''}`}
              onMouseEnter={() => setActiveYear(index)}
            >
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot}></div>
              </div>
              
              <div className={styles.timelineContent}>
                <div className={styles.yearBadge}>{item.year}</div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>✨</span>
                  {item.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
