'use client';

import React from 'react';
import AdhesionForm from '@/components/events/AdhesionForm';
import styles from './adhesion.module.scss';

export default function AdhesionPage() {
  return (
    <div className={styles.adhesionPage}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>
            <div className={styles.logosContainer}>
              <div className={styles.logo}>
                <img src="/logos/logo1.png" alt="JCI Logo" />
              </div>
              <div className={styles.logo}>
                <img src="/logos/logo2.png" alt="JCI Logo" />
              </div>
            </div>
            <h1 className={styles.title}>Formulaire d'Adhésion</h1>
            <p className={styles.subtitle}>Rejoignez la communauté JCI Cotonou La Doyenne</p>
            <p className={styles.description}>
              Devenez membre actif de la plus grande organisation mondiale de jeunes leaders. 
              Développez votre <strong>potentiel</strong>, élargissez votre <strong>réseau</strong> et impactez positivement votre communauté.
            </p>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <AdhesionForm />
        </div>
      </div>
    </div>
  );
}
