'use client';

import React from 'react';
import { FiStar, FiUsers, FiUnlock, FiShield, FiHeart, FiGlobe } from 'react-icons/fi';
import styles from './ValuesSection.module.scss';

export default function ValuesSection() {
  const values = [
    {
      icon: <FiStar size={32} />,
      title: 'La foi en Dieu',
      description: 'Nous reconnaissons que la foi donne à la vie son véritable sens et guide nos actions.',
      color: 'blue',
    },
    {
      icon: <FiUsers size={32} />,
      title: 'La fraternité humaine',
      description: 'Nous croyons en l\'unité de l\'humanité au-delà des frontières et des différences.',
      color: 'yellow',
    },
    {
      icon: <FiUnlock size={32} />,
      title: 'La liberté individuelle et entreprise',
      description: 'Nous défendons la liberté comme fondement de la justice économique et sociale.',
      color: 'orange',
    },
    {
      icon: <FiShield size={32} />,
      title: 'Le respect de la loi',
      description: 'Nous affirmons que l\'autorité doit s\'appuyer sur la loi et non sur l\'arbitraire.',
      color: 'blue',
    },
    {
      icon: <FiHeart size={32} />,
      title: 'La sacralité de la personne humaine',
      description: 'Nous considérons que la personne humaine est la plus précieuse de richesses.',
      color: 'yellow',
    },
    {
      icon: <FiGlobe size={32} />,
      title: 'Le service à l\'humanité',
      description: 'Nous croyons que servir l\'humanité constitue l\'œuvre la plus noble d\'une vie.',
      color: 'orange',
    },
  ];

  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Nos <span className={styles.gradientText}>Valeurs</span>
          </h2>
          <p className={styles.description}>
            Les valeurs fondamentales qui guident chacune de nos actions et inspirent notre engagement
          </p>
        </div>

        <div className={styles.grid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={`${styles.iconWrapper} ${styles[value.color]}`}>
                {value.icon}
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
              <div className={styles.decorativeLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
