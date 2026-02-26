'use client';

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiCheckCircle, FiClock, FiMap } from 'react-icons/fi';
import styles from './PreinscriptionForm.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function PreinscriptionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [fadeIn, setFadeIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Date de l'événement - 07 février 2026 à 9h30
  const eventDate = new Date('2026-02-07T09:30:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = eventDate.getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Vérifier si l'email est déjà inscrit
  useEffect(() => {
    if (formData.email && formData.email.includes('@')) {
      checkIfEmailAlreadyRegistered();
    }
  }, [formData.email]);

  const checkIfEmailAlreadyRegistered = async () => {
    try {
      const response = await fetch('/api/preinscription');
      const data = await response.json();
      
      if (data.success) {
        const isAlreadyRegistered = data.data.some((p: any) => 
          p.email.toLowerCase() === formData.email.toLowerCase()
        );
        
        if (isAlreadyRegistered) {
          setIsRegistered(true);
          handleStepChange(1);
        }
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleStepChange = (newStep: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentStep(newStep);
      setFadeIn(true);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/preinscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsRegistered(true);
        handleStepChange(1);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Même en cas d'erreur, on continue pour une meilleure UX
      setIsRegistered(true);
      handleStepChange(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className={styles.preinscriptionForm}>
      <div className={`${styles.formContainer} ${fadeIn ? styles.fadeIn : ''}`}>
        {currentStep === 0 && (
          <>
            {/* <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Réservez votre place</h2>
              <p className={styles.formSubtitle}>
                Remplissez ce formulaire pour vous inscrire à la session d'information
              </p>
            </div> */}
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiUser className={styles.icon} />
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Votre nom"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiUser className={styles.icon} />
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Votre prénom"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiMail className={styles.icon} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="votre.email@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiPhone className={styles.icon} />
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="+229 XX XX XX XX"
                required
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitButton} ${!isFormValid || isSubmitting ? styles.disabled : ''}`}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Réservation en cours...' : 'Réserver ma place'}
            </button>
          </form>
          </>
        )}

        {currentStep === 1 && (
          <div className={styles.successContainer}>
            <div className={styles.successHeader}>
              <FiCheckCircle className={styles.successIcon} />
              <h2 className={styles.successTitle}>
                {isRegistered && formData.email ? 'Vous êtes déjà inscrit ! ✅' : 'Félicitations ! 🎉'}
              </h2>
              <p className={styles.successMessage}>
                {isRegistered && formData.email 
                  ? `Nous avons bien retrouvé votre inscription avec l'email ${formData.email}.`
                  : 'Votre place a été réservée avec succès pour la Session d\'Information Cohorte 2026.'
                }
              </p>
            </div>

            {/* Countdown */}
            <div className={styles.countdownContainer}>
              <h3 className={styles.countdownTitle}>
                <FiClock className={styles.countdownIcon} />
                L'événement commence dans
              </h3>
              <div className={styles.countdown}>
                <div className={styles.countdownItem}>
                  <span className={styles.countdownValue}>{countdown.days}</span>
                  <span className={styles.countdownLabel}>Jours</span>
                </div>
                <div className={styles.countdownItem}>
                  <span className={styles.countdownValue}>{countdown.hours}</span>
                  <span className={styles.countdownLabel}>Heures</span>
                </div>
                <div className={styles.countdownItem}>
                  <span className={styles.countdownValue}>{countdown.minutes}</span>
                  <span className={styles.countdownLabel}>Minutes</span>
                </div>
                <div className={styles.countdownItem}>
                  <span className={styles.countdownValue}>{countdown.seconds}</span>
                  <span className={styles.countdownLabel}>Secondes</span>
                </div>
              </div>
            </div>

            {/* Carte du lieu */}
            <div className={styles.locationContainer}>
              <h3 className={styles.locationTitle}>
                <FiMapPin className={styles.locationIcon} />
                Lieu de l'événement
              </h3>
              <div className={styles.mapContainer}>
                <img 
                  src="/hero/session-location.webp" 
                  alt="Lieu de la session d'information"
                  className={styles.mapImage}
                />
                <div className={styles.mapOverlay}>
                  <div className={styles.locationInfo}>
                    <h4>JCI Cotonou La Doyenne</h4>
                    <p>Centre des Affaires, Cotonou, Bénin</p>
                    <p>Date: {eventDate.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p>Heure: 09:30</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.footerMessage}>
              <p>
                {isRegistered && formData.email 
                  ? 'Un email de rappel vous sera envoyé avant l\'événement.'
                  : `Un email d'invitation vous sera envoyé à ${formData.email}`
                }
              </p>
              <p className={styles.smallText}>
                Nous vous attendons nombreux pour cette session d'information exceptionnelle !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
