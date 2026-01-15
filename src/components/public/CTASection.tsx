'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import styles from './CTASection.module.scss';

export default function CTASection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div 
        className={styles.backgroundImage}
        style={{
          transform: `scale(${1 + scrollY * 0.1}) translateY(${scrollY * -50}px)`,
        }}
      >
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Rejoignez-nous
          </div>

          <h2 className={styles.title}>
            Ensemble, Créons un <span className={styles.gradientText}>Impact Durable</span>
          </h2>

          <p className={styles.description}>
            Rejoignez une communauté dynamique de jeunes leaders passionnés. 
            Développez vos compétences, élargissez votre réseau et contribuez 
            au développement de notre société.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <div className={styles.featureText}>
                <h4>Formation Continue</h4>
                <p>Programmes de leadership et développement personnel</p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌍</div>
              <div className={styles.featureText}>
                <h4>Réseau International</h4>
                <p>Connexion avec des milliers de jeunes leaders</p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💡</div>
              <div className={styles.featureText}>
                <h4>Projets Impactants</h4>
                <p>Initiatives concrètes pour transformer la société</p>
              </div>
            </div>
          </div>

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

        <div className={styles.contactCard}>
          <h3 className={styles.cardTitle}>Contactez-nous</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiMapPin size={20} />
              </div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Adresse</span>
                <span className={styles.contactValue}>Cotonou, Bénin</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiMail size={20} />
              </div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>contact@jcicotonou.org</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiPhone size={20} />
              </div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Téléphone</span>
                <span className={styles.contactValue}>+229 XX XX XX XX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.decorativeShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>
    </section>
  );
}
