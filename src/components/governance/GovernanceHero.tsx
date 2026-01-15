'use client';

import React from 'react';
import { FiShield, FiFileText, FiTarget, FiTrendingUp, FiChevronRight, FiZap } from 'react-icons/fi';
import styles from './GovernanceHero.module.scss';

export default function GovernanceHero() {
  const cards = [
    { icon: <FiFileText size={28} />, title: 'Documents', count: '3', color: 'blue', desc: 'Fondamentaux' },
    { icon: <FiTarget size={28} />, title: 'Axes Stratégiques', count: '6', color: 'yellow', desc: 'Piliers' },
    { icon: <FiTrendingUp size={28} />, title: 'Plans Quinquennaux', count: '3', color: 'orange', desc: 'Niveaux' },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.diagonalSplit}>
        <div className={styles.leftPanel}>
          <div className={styles.backgroundPattern}>
            <div className={styles.patternGrid}></div>
            <div className={styles.floatingOrb1}></div>
            <div className={styles.floatingOrb2}></div>
          </div>

          <div className={styles.leftContent}>
            <div className={styles.badge}>
              <FiShield size={20} />
              <span>Gouvernance JCI</span>
            </div>

            <h1 className={styles.mainTitle}>
              Structure &
              <br />
              <span className={styles.gradientText}>Leadership</span>
            </h1>

            <p className={styles.description}>
              Une organisation transparente, des orientations stratégiques claires et des principes fondamentaux qui guident notre excellence.
            </p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>60+</div>
                <div className={styles.statLabel}>Ans d'expérience</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Transparence</div>
              </div>
            </div>

            <button className={styles.ctaButton}>
              <span>Découvrir notre structure</span>
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.cardsContainer}>
            <div className={styles.cardsHeader}>
              <FiZap className={styles.zapIcon} />
              <h3 className={styles.cardsTitle}>Nos Piliers</h3>
            </div>

            <div className={styles.orbitalContainer}>
              <div className={styles.centerHub}>
                <div className={styles.hubIcon}>
                  <FiShield size={40} />
                </div>
                <div className={styles.hubPulse}></div>
              </div>

              <div className={styles.orbitalRing}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`${styles.orbitalCard} ${styles[card.color]}`}
                    style={{
                      transform: `rotate(${index * 120}deg) translateY(-180px) rotate(-${index * 120}deg)`,
                    }}
                  >
                    <div className={styles.cardIconWrapper}>
                      {card.icon}
                    </div>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardCount}>{card.count}</div>
                      <div className={styles.cardTitle}>{card.title}</div>
                      <div className={styles.cardDesc}>{card.desc}</div>
                    </div>
                    <div className={styles.cardShine}></div>
                  </div>
                ))}
              </div>

              <div className={styles.orbitPath}></div>
            </div>

            <div className={styles.floatingParticles}>
              <div className={styles.particle}></div>
              <div className={styles.particle}></div>
              <div className={styles.particle}></div>
              <div className={styles.particle}></div>
              <div className={styles.particle}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
