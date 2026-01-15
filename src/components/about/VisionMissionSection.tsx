'use client';

import React from 'react';
import { FiEye, FiTarget, FiHeart } from 'react-icons/fi';
import styles from './VisionMissionSection.module.scss';

export default function VisionMissionSection() {
  const credoItems = [
    'Que la foi en Dieu donne à la vie son véritable sens',
    'Que la fraternité humaine transcende la souveraineté des nations',
    'Que la liberté des individus et de l\'entreprise assure mieux la justice économique',
    'Que l\'autorité doit s\'appuyer sur la loi et non sur l\'arbitraire',
    'Que la personne humaine est la plus précieuse de richesses',
    'Que servir l\'humanité constitue l\'œuvre la plus noble d\'une vie',
  ];

  return (
    <section className={styles.visionMissionSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Notre <span className={styles.gradientText}>Raison d'Être</span>
          </h2>
        </div>

        <div className={styles.mainCards}>
          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.blue}`}>
              <FiEye size={32} />
            </div>
            <h3 className={styles.cardTitle}>Vision</h3>
            <p className={styles.cardDescription}>
              Être le principal réseau mondial de jeunes leaders
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.yellow}`}>
              <FiTarget size={32} />
            </div>
            <h3 className={styles.cardTitle}>Mission</h3>
            <p className={styles.cardDescription}>
              Offrir aux jeunes les opportunités de développement du leadership en leur donnant la capacité de créer des changements positifs
            </p>
          </div>
        </div>

        <div className={styles.credoSection}>
          <div className={styles.credoHeader}>
            <div className={`${styles.iconWrapper} ${styles.orange}`}>
              <FiHeart size={32} />
            </div>
            <h3 className={styles.credoTitle}>Le Crédo</h3>
            <p className={styles.credoIntro}>Nous croyons</p>
          </div>

          <div className={styles.credoGrid}>
            {credoItems.map((item, index) => (
              <div key={index} className={styles.credoItem}>
                <div className={styles.credoNumber}>{String(index + 1).padStart(2, '0')}</div>
                <p className={styles.credoText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
