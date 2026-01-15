'use client';

import React from 'react';
import { FiUser } from 'react-icons/fi';
import styles from './FounderSection.module.scss';

export default function FounderSection() {
  return (
    <section className={styles.founderSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div className={styles.imagePlaceholder}>
              <FiUser size={80} />
            </div>
            <div className={styles.decorativeCircle1}></div>
            <div className={styles.decorativeCircle2}></div>
          </div>

          <div className={styles.textSection}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              Père Fondateur
            </div>
            
            <h2 className={styles.title}>
              Henry <span className={styles.gradientText}>GIESSEMBIER</span>
            </h2>
            
            <p className={styles.subtitle}>Fondateur de la Jeune Chambre Internationale</p>

            <div className={styles.quoteCard}>
              <div className={styles.quoteIcon}>"</div>
              <blockquote className={styles.quote}>
                J'espère que du plus profond de l'âme de cette organisation, qui définit les bases du caractère et de la conduite du citoyen, rejaillira, dans les temps à venir, un message qui remuera le cœur des individus et les incitera à établir une paix permanente et durable dans le monde.
              </blockquote>
              <div className={styles.quoteAuthor}>— Henry GIESSEMBIER</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
