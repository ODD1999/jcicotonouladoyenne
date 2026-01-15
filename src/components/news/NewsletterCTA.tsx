'use client';

import React, { useState } from 'react';
import { FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';
import styles from './NewsletterCTA.module.scss';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className={styles.newsletterCTA}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <div className={styles.icon}>
              <FiMail size={48} />
            </div>
            <div className={styles.iconGlow}></div>
          </div>

          <h2 className={styles.title}>
            Restez <span className={styles.gradientText}>Connectés</span>
          </h2>
          <p className={styles.description}>
            Recevez nos dernières actualités, événements et opportunités directement dans votre boîte mail. 
            Rejoignez plus de 5000 abonnés qui ne manquent aucune de nos publications.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <FiMail size={20} className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isSubmitted}>
              {isSubmitted ? (
                <>
                  <FiCheckCircle size={20} />
                  <span>Inscrit !</span>
                </>
              ) : (
                <>
                  <FiSend size={20} />
                  <span>S'abonner</span>
                </>
              )}
            </button>
          </form>

          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              <FiCheckCircle size={18} />
              <span>Actualités exclusives</span>
            </div>
            <div className={styles.benefitItem}>
              <FiCheckCircle size={18} />
              <span>Invitations prioritaires</span>
            </div>
            <div className={styles.benefitItem}>
              <FiCheckCircle size={18} />
              <span>Ressources gratuites</span>
            </div>
          </div>

          <p className={styles.privacy}>
            🔒 Vos données sont protégées. Désabonnement possible à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
