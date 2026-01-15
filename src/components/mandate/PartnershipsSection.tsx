'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiAward, FiTrendingUp, FiUsers, FiGlobe, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './PartnershipsSection.module.scss';

export default function PartnershipsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const partners = [
    {
      name: 'MTN Bénin',
      sector: 'Télécommunications',
      type: 'Partenaire Platine',
      description: 'Leader des télécommunications au Bénin, soutien financier et technique pour nos projets digitaux',
      details: 'Sponsoring événements, formation digital skills',
      icon: <FiGlobe size={32} />,
      color: 'yellow',
      logo: null,
    },
    {
      name: 'Ecobank Bénin',
      sector: 'Services Financiers',
      type: 'Partenaire Or',
      description: 'Institution financière panafricaine, financement de projets entrepreneuriaux',
      details: 'Prêts bonifiés, mentorat financier',
      icon: <FiTrendingUp size={32} />,
      color: 'blue',
      logo: null,
    },
    {
      name: 'Ministère de la Jeunesse',
      sector: 'Gouvernement',
      type: 'Partenaire Institutionnel',
      description: 'Partenariat stratégique pour le développement de la jeunesse béninoise',
      details: 'Subventions, cadre réglementaire',
      icon: <FiAward size={32} />,
      color: 'blue',
      logo: null,
    },
    {
      name: 'Chambre de Commerce',
      sector: 'Économie',
      type: 'Partenaire Stratégique',
      description: 'Collaboration pour l\'entrepreneuriat et l\'emploi des jeunes',
      details: 'Networking, formation business',
      icon: <FiUsers size={32} />,
      color: 'orange',
      logo: null,
    },
    {
      name: 'JCI Africa & Middle East',
      sector: 'Organisation Internationale',
      type: 'Partenaire International',
      description: 'Réseau continental pour l\’échange et la formation',
      details: 'Échanges internationaux, formations',
      icon: <FiGlobe size={32} />,
      color: 'blue',
      logo: null,
    },
    {
      name: 'Université d\'Abomey-Calavi',
      sector: 'Éducation',
      type: 'Partenaire Académique',
      description: 'Formation et recherche sur le leadership',
      details: 'Recherche, stages, formations',
      icon: <FiAward size={32} />,
      color: 'orange',
      logo: null,
    },
  ];

  const slidesPerView = 3;
  const totalSlides = Math.ceil(partners.length / slidesPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className={styles.partnershipsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Nos <span className={styles.gradientText}>Partenaires</span>
          </h2>
          <p className={styles.description}>
            Des collaborations stratégiques pour maximiser notre impact
          </p>
        </div>

        <div className={styles.sliderWrapper}>
          <button 
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={prevSlide}
            aria-label="Partenaire précédent"
          >
            <FiChevronLeft size={24} />
          </button>

          <div className={styles.sliderContainer} ref={sliderRef}>
            <div 
              className={styles.sliderTrack}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {partners.map((partner, index) => (
                <div key={index} className={`${styles.partnerCard} ${styles[partner.color]}`}>
              <div className={styles.logoSection}>
                <div className={styles.logoWrapper}>
                  {partner.icon}
                </div>
                <div className={styles.logoGlow}></div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.partnerHeader}>
                  <h3 className={styles.partnerName}>{partner.name}</h3>
                  <div className={styles.partnerType}>{partner.type}</div>
                </div>
                
                <div className={styles.partnerSector}>
                  <span className={styles.sectorLabel}>Secteur:</span>
                  <span className={styles.sectorValue}>{partner.sector}</span>
                </div>
                
                <p className={styles.partnerDescription}>{partner.description}</p>
                
                <div className={styles.partnerDetails}>
                  <div className={styles.detailsIcon}>•</div>
                  <span>{partner.details}</span>
                </div>
                
                <div className={styles.partnerBadge}>
                  <span className={styles.badgeDot}></span>
                  Partenaire Actif
                </div>
              </div>
              
                  <div className={styles.cardGlow}></div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={nextSlide}
            aria-label="Partenaire suivant"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>

      </div>

      <div className={styles.ctaBox}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <h3 className={styles.ctaTitle}>Devenez Partenaire</h3>
              <p className={styles.ctaText}>
                Rejoignez notre réseau de partenaires et contribuez au développement de la jeunesse béninoise
              </p>
            </div>
            <div className={styles.ctaRight}>
              <button className={styles.ctaButton}>
                Nous Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
