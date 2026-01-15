'use client';

import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare, FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiCheckCircle } from 'react-icons/fi';
import styles from './ContactPage.module.scss';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroPattern}></div>
          <div className={styles.heroGradient}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Contactez-nous</h1>
            <p className={styles.heroSubtitle}>
              Une question, une suggestion ou envie de rejoindre notre communauté ? 
              Nous sommes là pour vous écouter !
            </p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiMapPin size={24} />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Adresse</h3>
                <p className={styles.infoText}>
                  Carré 1234, Avenue Jean-Paul II<br />
                  Cotonou, Bénin
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiPhone size={24} />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Téléphone</h3>
                <p className={styles.infoText}>
                  +229 XX XX XX XX<br />
                  +229 XX XX XX XX
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiMail size={24} />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Email</h3>
                <p className={styles.infoText}>
                  contact@jcicotonou.org<br />
                  info@jcicotonou.org
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiClock size={24} />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Horaires</h3>
                <p className={styles.infoText}>
                  Lundi - Vendredi: 9h - 17h<br />
                  Samedi: 9h - 13h
                </p>
              </div>
            </div>

            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Suivez-nous</h3>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <FiFacebook size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <FiLinkedin size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>

            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                <FiMapPin size={48} />
                <p>Carte interactive</p>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Envoyez-nous un message</h2>
              <p className={styles.formSubtitle}>
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>

              {isSubmitted && (
                <div className={styles.successMessage}>
                  <FiCheckCircle size={24} />
                  <div>
                    <h4>Message envoyé avec succès !</h4>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      <FiUser size={16} />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      <FiMail size={16} />
                      Email *
                    </label>
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

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      <FiPhone size={16} />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder="+229 XX XX XX XX"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      <FiMessageSquare size={16} />
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="adhesion">Adhésion</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="projet">Projet</option>
                      <option value="evenement">Événement</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    <FiMessageSquare size={16} />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.formTextarea}
                    placeholder="Écrivez votre message ici..."
                    rows={6}
                    required
                  />
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
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
