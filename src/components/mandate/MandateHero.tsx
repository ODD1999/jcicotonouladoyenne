'use client';

import React from 'react';
import { FiCalendar, FiTrendingUp, FiAward, FiUsers, FiUser, FiMessageSquare } from 'react-icons/fi';
import styles from './MandateHero.module.scss';
import Image from 'next/image';

export default function MandateHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
        <div className={styles.floatingShape3}></div>
      </div>

      <div className={styles.splitLayout}>
        <div className={styles.leftPanel}>
          <div className={styles.presidentPhotoSection}>
            <div className={styles.photoContainer}>
              <img src="/images/prego.jpg" alt="President" />
            </div>
            <div className={styles.photoOverlay}></div>
          </div>

          <div className={styles.messageBubble}>
            <div className={styles.bubbleHeader}>
              <FiMessageSquare size={20} />
              <span>Mot du Président</span>
            </div>
            <p className={styles.bubbleText}>
              "Chers membres, ce mandat est celui de l'innovation et de l'impact. Ensemble, nous allons transformer notre vision en actions concrètes qui bénéficieront à notre communauté. Notre engagement envers l'excellence et le développement du leadership reste notre priorité absolue."
            </p>
            <div className={styles.bubbleAuthor}>
              <div className={styles.authorName}>Léonidas MEWOUSSI</div>
              <div className={styles.authorRole}>Président 2025-2026</div>
            </div>
            <div className={styles.bubbleTail}></div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.content}>
            <div className={styles.yearBadge}>
              <FiCalendar size={20} />
              <span>Mandat 2025-2026</span>
            </div>

            <h1 className={styles.title}>
              Mandat <span className={styles.gradientText}>Actuel</span>
            </h1>

            <div className={styles.themeCard}>
              <div className={styles.themeIcon}>
                <FiAward size={32} />
              </div>
              <div className={styles.themeContent}>
                <div className={styles.themeLabel}>Thème du Mandat</div>
                <h2 className={styles.themeTitle}>
                  "Leadership Transformationnel : Full Potential"
                </h2>
              </div>
            </div>

            <p className={styles.description}>
              Un mandat axé sur l'innovation, le développement des compétences et l'impact communautaire durable.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiUsers size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>15</div>
                  <div className={styles.statLabel}>Membres du Bureau</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiTrendingUp size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>12</div>
                  <div className={styles.statLabel}>Projets Majeurs</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiAward size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>8</div>
                  <div className={styles.statLabel}>Partenaires Clés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
