'use client';

import React from 'react';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import styles from './MissionSection.module.scss';

export default function MissionSection() {
  const missions = [
    {
      icon: <FiTarget size={32} />,
      title: 'Notre Mission',
      description: 'Offrir aux jeunes citoyens actifs des opportunités de développement pour créer un impact positif dans leur communauté.',
      color: 'blue',
    },
    {
      icon: <FiEye size={32} />,
      title: 'Notre Vision',
      description: 'Être la principale organisation mondiale de jeunes citoyens actifs créant un impact positif durable.',
      color: 'yellow',
    },
    {
      icon: <FiHeart size={32} />,
      title: 'Nos Valeurs',
      description: 'Leadership, engagement, excellence, respect, intégrité et développement personnel au service de la communauté.',
      color: 'orange',
    },
  ];

  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Notre <span className={styles.gradientText}>Raison d'Être</span>
          </h2>
          <p className={styles.description}>
            Depuis notre création, nous sommes guidés par une mission claire et des valeurs fortes qui inspirent chacune de nos actions.
          </p>
        </div>

        <div className={styles.grid}>
          {missions.map((mission, index) => (
            <div key={index} className={styles.missionCard}>
              <div className={`${styles.iconWrapper} ${styles[mission.color]}`}>
                {mission.icon}
              </div>
              <h3 className={styles.cardTitle}>{mission.title}</h3>
              <p className={styles.cardDescription}>{mission.description}</p>
              <div className={styles.decorativeLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
