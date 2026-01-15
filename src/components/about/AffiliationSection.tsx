'use client';

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import styles from './AffiliationSection.module.scss';

export default function AffiliationSection() {
  return (
    <section className={styles.affiliationSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Notre <span className={styles.gradientText}>Affiliation</span>
          </h2>
          <p className={styles.description}>
            Membre du réseau mondial de la Jeune Chambre Internationale
          </p>
        </div>

        <div className={styles.affiliationChain}>
          <div className={styles.affiliationCard}>
            <div className={styles.cardContent}>
              <div className={styles.logoPlaceholder}>
                <span className={styles.logoText}>JCI</span>
              </div>
              <h3 className={styles.cardTitle}>JCI Cotonou la Doyenne</h3>
              <p className={styles.cardDescription}>
                Organisation locale de jeunes leaders actifs à Cotonou depuis plus de 60 ans
              </p>
              <div className={styles.badge}>Organisation Locale</div>
            </div>
          </div>

          <div className={styles.arrow}>
            <FiArrowRight size={32} />
          </div>

          <div className={styles.affiliationCard}>
            <div className={styles.cardContent}>
              <div className={styles.logoPlaceholder}>
                <span className={styles.logoText}>JCI</span>
              </div>
              <h3 className={styles.cardTitle}>JCI Bénin</h3>
              <p className={styles.cardDescription}>
                Organisation nationale regroupant tous les chapitres JCI du Bénin
              </p>
              <div className={styles.badge}>Organisation Nationale</div>
            </div>
          </div>

          <div className={styles.arrow}>
            <FiArrowRight size={32} />
          </div>

          <div className={styles.affiliationCard}>
            <div className={styles.cardContent}>
              <div className={styles.logoPlaceholder}>
                <span className={styles.logoText}>JCI</span>
              </div>
              <h3 className={styles.cardTitle}>JCI - Jeune Chambre Internationale</h3>
              <p className={styles.cardDescription}>
                Réseau mondial présent dans plus de 100 pays avec des milliers de membres actifs
              </p>
              <div className={styles.badge}>Organisation Mondiale</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
