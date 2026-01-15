'use client';

import React, { useState } from 'react';
import { FiGlobe, FiMapPin, FiHome, FiChevronRight } from 'react-icons/fi';
import styles from './QuinquennialPlansSection.module.scss';

export default function QuinquennialPlansSection() {
  const [activeLevel, setActiveLevel] = useState('international');

  const plans = {
    international: {
      icon: <FiGlobe size={40} />,
      title: 'Plan International',
      subtitle: 'JCI Worldwide Strategic Plan',
      color: 'blue',
      priorities: [
        {
          title: 'Global Leadership Development',
          description: 'Renforcer les capacités de leadership des jeunes à travers le monde',
          progress: 75,
        },
        {
          title: 'Sustainable Development Goals',
          description: 'Contribuer activement aux ODD des Nations Unies',
          progress: 68,
        },
        {
          title: 'Digital Transformation',
          description: 'Moderniser les processus et outils de la JCI mondiale',
          progress: 82,
        },
        {
          title: 'Membership Growth',
          description: 'Augmenter et diversifier la base de membres dans 120+ pays',
          progress: 60,
        },
      ],
    },
    national: {
      icon: <FiMapPin size={40} />,
      title: 'Plan National',
      subtitle: 'JCI Bénin Strategic Plan',
      color: 'yellow',
      priorities: [
        {
          title: 'Développement Économique',
          description: 'Soutenir l\'entrepreneuriat et l\'innovation au Bénin',
          progress: 70,
        },
        {
          title: 'Cohésion Nationale',
          description: 'Renforcer l\'unité entre tous les chapitres du pays',
          progress: 85,
        },
        {
          title: 'Impact Social',
          description: 'Projets d\'envergure nationale pour le développement',
          progress: 65,
        },
        {
          title: 'Rayonnement Régional',
          description: 'Positionner la JCI Bénin comme leader en Afrique de l\'Ouest',
          progress: 72,
        },
      ],
    },
    local: {
      icon: <FiHome size={40} />,
      title: 'Plan Local',
      subtitle: 'JCI Cotonou la Doyenne Strategic Plan',
      color: 'orange',
      priorities: [
        {
          title: 'Formation Continue',
          description: 'Programme mensuel de développement des compétences',
          progress: 90,
        },
        {
          title: 'Projets Communautaires',
          description: 'Actions concrètes pour améliorer la vie à Cotonou',
          progress: 78,
        },
        {
          title: 'Partenariats Stratégiques',
          description: 'Collaboration avec institutions et entreprises locales',
          progress: 88,
        },
        {
          title: 'Croissance des Membres',
          description: 'Recruter et fidéliser les jeunes leaders de Cotonou',
          progress: 75,
        },
      ],
    },
  };

  const currentPlan = plans[activeLevel as keyof typeof plans];

  return (
    <section className={styles.quinquennialPlansSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Plans <span className={styles.gradientText}>Quinquennaux</span>
          </h2>
          <p className={styles.description}>
            Nos orientations stratégiques sur 5 ans aux niveaux international, national et local
          </p>
        </div>

        <div className={styles.levelSelector}>
          <button
            className={`${styles.levelButton} ${activeLevel === 'international' ? styles.active : ''}`}
            onClick={() => setActiveLevel('international')}
          >
            <FiGlobe size={24} />
            <span>International</span>
          </button>
          <button
            className={`${styles.levelButton} ${activeLevel === 'national' ? styles.active : ''}`}
            onClick={() => setActiveLevel('national')}
          >
            <FiMapPin size={24} />
            <span>National</span>
          </button>
          <button
            className={`${styles.levelButton} ${activeLevel === 'local' ? styles.active : ''}`}
            onClick={() => setActiveLevel('local')}
          >
            <FiHome size={24} />
            <span>Local</span>
          </button>
        </div>

        <div className={styles.planContent}>
          <div className={styles.planHeader}>
            <div className={`${styles.planIcon} ${styles[currentPlan.color]}`}>
              {currentPlan.icon}
            </div>
            <div className={styles.planInfo}>
              <h3 className={styles.planTitle}>{currentPlan.title}</h3>
              <p className={styles.planSubtitle}>{currentPlan.subtitle}</p>
            </div>
          </div>

          <div className={styles.prioritiesGrid}>
            {currentPlan.priorities.map((priority, index) => (
              <div key={index} className={styles.priorityCard}>
                <div className={styles.priorityHeader}>
                  <h4 className={styles.priorityTitle}>{priority.title}</h4>
                  <span className={styles.progressPercentage}>{priority.progress}%</span>
                </div>
                <p className={styles.priorityDescription}>{priority.description}</p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${priority.progress}%` }}
                  ></div>
                </div>
                <button className={styles.detailsButton}>
                  <span>Voir les détails</span>
                  <FiChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
