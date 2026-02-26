'use client';

import PreinscriptionForm from '@/components/events/PreinscriptionForm';
import styles from './session-information.module.scss';

export default function SessionInformationPage() {
  return (
    <div className={styles.sessionPage}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          {/* Juste l'image de fond, pas de contenu */}
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.formHeader}>
            <div className={styles.logosContainer}>
              <div className={styles.logo}>
                <img
                  src="/logos/logo1.png"
                  alt="JCI Logo"
                />
              </div>
              <div className={styles.logo}>
                <img
                  src="/logos/logo2.png"
                  alt="JCI Logo"
                />
              </div>
            </div>
            <h1 className={styles.title}>
              Session d'Information
            </h1>
            <p className={styles.subtitle}>
              Cohorte 2026 - Rejoignez l'aventure JCI
            </p>
          </div>
          <PreinscriptionForm />
        </div>
      </div>
    </div>
  );
}
