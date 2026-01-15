'use client';

import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiUserPlus, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setError('Email ou mot de passe incorrect');
    }, 1500);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginLeft}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <div className={styles.logoCircle}>JCI</div>
            </div>
            <h1 className={styles.leftTitle}>Bienvenue sur JCI Cotonou</h1>
            <p className={styles.leftSubtitle}>
              Connectez-vous pour accéder à votre espace membre et participer à nos projets et événements.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>
                  <h3>Accès aux événements</h3>
                  <p>Inscrivez-vous à nos formations et conférences</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>
                  <h3>Gestion de projets</h3>
                  <p>Suivez et participez aux projets en cours</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>
                  <h3>Réseau professionnel</h3>
                  <p>Connectez-vous avec d'autres membres</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.loginRight}>
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Connexion</h2>
              <p className={styles.formSubtitle}>
                Entrez vos identifiants pour accéder à votre compte
              </p>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <FiAlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

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
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Mot de passe
                </label>
                <div className={styles.inputWrapper}>
                  <FiLock className={styles.inputIcon} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className={styles.checkboxLabel}>Se souvenir de moi</span>
                </label>
                <Link href="/mot-de-passe-oublie" className={styles.forgotLink}>
                  Mot de passe oublié ?
                </Link>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <FiLogIn size={20} />
                    Se connecter
                  </>
                )}
              </button>
            </form>

            <div className={styles.divider}>
              <span>ou</span>
            </div>

            <div className={styles.socialLogin}>
              <button className={styles.socialButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuer avec Google
              </button>
            </div>

            <div className={styles.signupPrompt}>
              <p>Vous n'avez pas de compte ?</p>
              <Link href="/inscription" className={styles.signupLink}>
                <FiUserPlus size={18} />
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
