'use client';

import React from 'react';
import { FiTarget, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import styles from './ProjectsHero.module.scss';

export default function ProjectsHero() {
  const stats = [
    { icon: <FiTarget size={24} />, value: '50+', label: 'Projets Réalisés' },
    { icon: <FiUsers size={24} />, value: '10K+', label: 'Bénéficiaires' },
    { icon: <FiTrendingUp size={24} />, value: '15+', label: 'En Cours' },
    { icon: <FiAward size={24} />, value: '8', label: 'Partenaires' },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
        <div className={styles.floatingShape3}></div>
      </div>

      <div className={styles.particlesContainer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span>Nos Réalisations</span>
          </div>

          <h1 className={styles.title}>
            Des <span className={styles.gradientText}>Projets</span> qui
            <br />
            Transforment des Vies
          </h1>

          <p className={styles.description}>
            Découvrez nos initiatives innovantes qui créent un impact durable dans la communauté.
            De la formation au développement entrepreneurial, chaque projet contribue à bâtir un avenir meilleur.
          </p>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Découvrir nos projets</span>
      </div>
    </section>
  );
}
