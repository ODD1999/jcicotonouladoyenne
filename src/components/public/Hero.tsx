'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Jeune Chambre Internationale
          </div>

          <h1 className={styles.title}>
            Former les <span className={styles.gradientText}>Leaders</span> de Demain
          </h1>

          <p className={styles.description}>
            JCI Cotonou la Doyenne est une organisation de jeunes citoyens actifs et engagés, 
            dédiée au développement personnel, au leadership et à l'impact communautaire.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>500+</div>
              <div className={styles.statLabel}>Membres Actifs</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <div className={styles.statValue}>50+</div>
              <div className={styles.statLabel}>Projets Réalisés</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <div className={styles.statValue}>25+</div>
              <div className={styles.statLabel}>Années d'Existence</div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/nous-rejoindre" className={styles.primaryButton}>
              Rejoindre JCI
              <FiArrowRight size={20} />
            </Link>
            <button className={styles.secondaryButton}>
              <div className={styles.playIcon}>
                <FiPlay size={16} />
              </div>
              Découvrir notre impact
            </button>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.imageOverlay}></div>
              <div className={styles.floatingCard1}>
                <div className={styles.cardIcon}>🎯</div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>Leadership</div>
                  <div className={styles.cardSubtitle}>Formation continue</div>
                </div>
              </div>
              <div className={styles.floatingCard2}>
                <div className={styles.cardIcon}>🌍</div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>Impact Global</div>
                  <div className={styles.cardSubtitle}>Réseau international</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
}
