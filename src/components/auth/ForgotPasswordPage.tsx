'use client';

import React, { useState } from 'react';
import { FiMail, FiArrowLeft, FiCheckCircle, FiSend } from 'react-icons/fi';
import Link from 'next/link';
import styles from './ForgotPasswordPage.module.scss';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className={styles.forgotPasswordPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconCircle}>
              {isSubmitted ? (
                <FiCheckCircle size={48} className={styles.successIcon} />
              ) : (
                <FiMail size={48} className={styles.mailIcon} />
              )}
            </div>
          </div>

          {!isSubmitted ? (
            <>
              <h1 className={styles.title}>Mot de passe oublié ?</h1>
              <p className={styles.subtitle}>
                Pas de problème ! Entrez votre adresse email et nous vous enverrons 
                un lien pour réinitialiser votre mot de passe.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Adresse email
                  </label>
                  <div className={styles.inputWrapper}>
                    <FiMail className={styles.inputIcon} size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.formInput}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      Envoyer le lien de réinitialisation
                    </>
                  )}
                </button>
              </form>

              <Link href="/connexion" className={styles.backLink}>
                <FiArrowLeft size={18} />
                Retour à la connexion
              </Link>
            </>
          ) : (
            <>
              <h1 className={styles.title}>Email envoyé !</h1>
              <p className={styles.subtitle}>
                Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>.
                Vérifiez votre boîte de réception et suivez les instructions.
              </p>

              <div className={styles.successInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>1</div>
                  <p>Vérifiez votre boîte de réception</p>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>2</div>
                  <p>Cliquez sur le lien de réinitialisation</p>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>3</div>
                  <p>Créez un nouveau mot de passe</p>
                </div>
              </div>

              <div className={styles.helpText}>
                <p>Vous n'avez pas reçu l'email ?</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className={styles.resendButton}
                >
                  Renvoyer l'email
                </button>
              </div>

              <Link href="/connexion" className={styles.backLink}>
                <FiArrowLeft size={18} />
                Retour à la connexion
              </Link>
            </>
          )}
        </div>

        <div className={styles.helpSection}>
          <h3 className={styles.helpTitle}>Besoin d'aide ?</h3>
          <p className={styles.helpDescription}>
            Si vous rencontrez des difficultés pour réinitialiser votre mot de passe, 
            n'hésitez pas à contacter notre équipe support.
          </p>
          <Link href="/contact" className={styles.contactLink}>
            Contacter le support
          </Link>
        </div>
      </div>
    </div>
  );
}
