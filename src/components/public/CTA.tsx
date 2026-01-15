'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import styles from './CTA.module.scss';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Prêt à Faire la <span className={styles.gradientText}>Différence</span> ?
          </h2>
          <p className={styles.description}>
            Rejoignez une communauté de jeunes leaders passionnés et engagés. 
            Ensemble, créons un impact positif et durable dans notre société.
          </p>
          <div className={styles.actions}>
            <Link href="/nous-rejoindre" className={styles.primaryButton}>
              Devenir Membre
              <FiArrowRight size={20} />
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              <FiMail size={20} />
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
