'use client';

import React from 'react';
import { FiUsers, FiTrendingUp, FiAward, FiGlobe, FiTarget, FiHeart } from 'react-icons/fi';
import styles from './Features.module.scss';

export default function Features() {
  const features = [
    {
      icon: FiUsers,
      title: 'Leadership & Formation',
      description: 'Développez vos compétences en leadership à travers des formations continues et des opportunités de croissance personnelle.',
      color: 'blue',
    },
    {
      icon: FiTrendingUp,
      title: 'Développement Personnel',
      description: 'Accédez à des ressources et programmes conçus pour renforcer vos capacités et votre confiance en vous.',
      color: 'orange',
    },
    {
      icon: FiAward,
      title: 'Reconnaissance & Impact',
      description: 'Vos contributions sont valorisées et reconnues, créant un impact mesurable dans la communauté.',
      color: 'yellow',
    },
    {
      icon: FiGlobe,
      title: 'Réseau International',
      description: 'Connectez-vous avec des milliers de jeunes leaders à travers le monde via le réseau JCI.',
      color: 'blue',
    },
    {
      icon: FiTarget,
      title: 'Projets Communautaires',
      description: 'Participez à des projets concrets qui transforment positivement votre environnement local.',
      color: 'orange',
    },
    {
      icon: FiHeart,
      title: 'Engagement Citoyen',
      description: 'Devenez un acteur du changement en contribuant activement au développement de votre société.',
      color: 'yellow',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Nos Valeurs</div>
          <h2 className={styles.title}>
            Pourquoi Rejoindre <span className={styles.gradientText}>JCI Cotonou</span>
          </h2>
          <p className={styles.description}>
            Découvrez les opportunités uniques qui vous attendent en tant que membre de notre organisation
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`${styles.iconWrapper} ${styles[feature.color]}`}>
                <feature.icon size={28} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
