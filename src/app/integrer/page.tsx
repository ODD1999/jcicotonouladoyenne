'use client';

import React, { useState } from 'react';
import styles from './integrer.module.scss';
import Image from 'next/image';

export default function IntegrerPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    profession: '',
    adresse: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/integrer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', prenom: '', email: '', telephone: '', profession: '', adresse: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.integrerPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/logos/logo-white.png"
              alt="JCI Logo"
              width={80}
              height={80}
              className={styles.logo}
            />
          </div>
          <h1 className={styles.heroTitle}>
            Rejoignez la <span className={styles.highlight}>JCI Cotonou La Doyenne</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Devenez un leader qui transforme sa communauté
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.aboutSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Qui sommes-nous ?</h2>
            <div className={styles.titleUnderline}></div>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌍</div>
              <h3 className={styles.cardTitle}>Une Organisation Internationale</h3>
              <p className={styles.cardText}>
                La Jeune Chambre Internationale est une organisation internationale de jeunes leaders et citoyens âgés de <strong>18 à 40 ans</strong>. Elle s'adresse à des jeunes qui veulent grandir personnellement et professionnellement tout en proposant des solutions concrètes aux défis de leur communauté.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🎯</div>
              <h3 className={styles.cardTitle}>Nos Valeurs</h3>
              <p className={styles.cardText}>
                La JCI est une organisation <strong>apolitique, non religieuse et à but non lucratif</strong>. Elle offre à ses membres un cadre structuré pour apprendre, agir et impacter durablement la société.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🏆</div>
              <h3 className={styles.cardTitle}>La Doyenne du Bénin</h3>
              <p className={styles.cardText}>
                Créée en <strong>1989 par Feu Emmanuel GUIDIBI</strong>, la JCI Cotonou La Doyenne est la toute première Organisation Locale JCI du Bénin. Reconnue plusieurs fois comme l'organisation la plus remarquable sur un total de <strong>47 Organisations Locales</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.visionMissionSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notre Vision, Mission & Credo</h2>
            <div className={styles.titleUnderline}></div>
          </div>

          <div className={styles.visionMissionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.vmIcon}>👁️</div>
              <h3 className={styles.vmTitle}>Notre Vision</h3>
              <p className={styles.vmText}>
                Être le principal réseau mondial de jeunes leaders
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={styles.vmIcon}>🎯</div>
              <h3 className={styles.vmTitle}>Notre Mission</h3>
              <p className={styles.vmText}>
                Offrir aux jeunes les opportunités de développement du leadership en leur donnant la capacité de créer des changements positifs
              </p>
            </div>
          </div>

          <div className={styles.credoBox}>
            <div className={styles.credoHeader}>
              <div className={styles.credoIcon}>✨</div>
              <h3 className={styles.credoTitle}>Notre Credo</h3>
            </div>
            <p className={styles.credoIntro}>Nous croyons</p>
            <ul className={styles.credoList}>
              <li>Que la foi en Dieu donne à la vie son véritable sens</li>
              <li>Que la fraternité humaine transcende la souveraineté des nations</li>
              <li>Que la liberté des individus et de l'entreprise assure mieux la justice économique</li>
              <li>Que l'autorité doit s'appuyer sur la loi et non sur l'arbitraire</li>
              <li>Que la personne humaine est la plus précieuse des richesses et</li>
              <li>Que servir l'humanité constitue l'œuvre la plus noble d'une vie</li>
            </ul>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Rejoignez-nous dès aujourd'hui</h2>
              <p className={styles.formSubtitle}>
                Remplissez ce formulaire et nous vous contacterons pour vous accompagner dans votre parcours
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <p>Merci ! Nous avons bien reçu votre demande. Nous vous contacterons très bientôt.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                <p>Une erreur s'est produite. Veuillez réessayer.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nom" className={styles.label}>Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Votre nom"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="prenom" className={styles.label}>Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="votre.email@exemple.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telephone" className={styles.label}>Téléphone *</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="+229 XX XX XX XX"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="profession" className={styles.label}>Profession *</label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Votre profession"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="adresse" className={styles.label}>Adresse *</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Votre adresse"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Manifester mon intérêt'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
