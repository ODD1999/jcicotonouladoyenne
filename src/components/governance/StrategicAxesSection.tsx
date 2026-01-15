'use client';

import React, { useState } from 'react';
import { FiTarget, FiUsers, FiTrendingUp, FiAward, FiGlobe, FiZap } from 'react-icons/fi';
import styles from './StrategicAxesSection.module.scss';

export default function StrategicAxesSection() {
  const [activeAxis, setActiveAxis] = useState(0);

  const axes = [
    {
      icon: <FiTarget size={36} />,
      title: 'Leadership & Formation',
      description: 'Développer les compétences en leadership de nos membres à travers des formations continues et des programmes de mentorat.',
      color: 'blue',
      objectives: [
        'Programmes de formation mensuels',
        'Mentorat personnalisé',
        'Certifications internationales',
      ],
    },
    {
      icon: <FiUsers size={36} />,
      title: 'Développement Communautaire',
      description: 'Créer un impact positif durable dans notre communauté à travers des projets sociaux innovants.',
      color: 'yellow',
      objectives: [
        'Projets d\'impact social',
        'Partenariats locaux',
        'Actions de sensibilisation',
      ],
    },
    {
      icon: <FiTrendingUp size={36} />,
      title: 'Entrepreneuriat & Innovation',
      description: 'Encourager l\'esprit entrepreneurial et l\'innovation chez les jeunes leaders.',
      color: 'orange',
      objectives: [
        'Incubation de startups',
        'Concours d\'innovation',
        'Networking d\'affaires',
      ],
    },
    {
      icon: <FiAward size={36} />,
      title: 'Excellence & Qualité',
      description: 'Maintenir les plus hauts standards d\'excellence dans toutes nos activités et initiatives.',
      color: 'blue',
      objectives: [
        'Standards de qualité',
        'Évaluations continues',
        'Reconnaissance d\'excellence',
      ],
    },
    {
      icon: <FiGlobe size={36} />,
      title: 'Rayonnement International',
      description: 'Renforcer notre présence et notre influence au niveau national et international.',
      color: 'yellow',
      objectives: [
        'Partenariats internationaux',
        'Échanges interculturels',
        'Représentation JCI',
      ],
    },
    {
      icon: <FiZap size={36} />,
      title: 'Transformation Digitale',
      description: 'Moderniser nos processus et adopter les technologies pour une efficacité optimale.',
      color: 'orange',
      objectives: [
        'Digitalisation des processus',
        'Plateformes numériques',
        'Communication 2.0',
      ],
    },
  ];

  return (
    <section className={styles.strategicAxesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Nos <span className={styles.gradientText}>Axes Stratégiques</span>
          </h2>
          <p className={styles.description}>
            Six piliers fondamentaux qui orientent nos actions et définissent notre vision du développement
          </p>
        </div>

        <div className={styles.axesGrid}>
          {axes.map((axis, index) => (
            <div
              key={index}
              className={`${styles.axisCard} ${index === activeAxis ? styles.active : ''}`}
              onMouseEnter={() => setActiveAxis(index)}
            >
              <div className={styles.cardFront}>
                <div className={`${styles.iconWrapper} ${styles[axis.color]}`}>
                  {axis.icon}
                </div>
                <h3 className={styles.axisTitle}>{axis.title}</h3>
                <p className={styles.axisDescription}>{axis.description}</p>
                <div className={styles.hoverIndicator}>
                  <span>Voir les objectifs</span>
                </div>
              </div>

              <div className={styles.cardBack}>
                <h4 className={styles.objectivesTitle}>Objectifs Clés</h4>
                <ul className={styles.objectivesList}>
                  {axis.objectives.map((objective, idx) => (
                    <li key={idx} className={styles.objectiveItem}>
                      <span className={styles.objectiveBullet}>✓</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
