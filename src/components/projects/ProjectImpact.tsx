'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiUsers, FiTrendingUp, FiAward, FiHeart, FiTarget, FiGlobe } from 'react-icons/fi';
import styles from './ProjectImpact.module.scss';

export default function ProjectImpact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const impacts = [
    {
      icon: <FiUsers size={32} />,
      value: 12500,
      suffix: '+',
      label: 'Bénéficiaires directs',
      description: 'Personnes touchées par nos actions',
      color: 'blue',
    },
    {
      icon: <FiTrendingUp size={32} />,
      value: 85,
      suffix: '+',
      label: 'Entreprises créées',
      description: 'Startups accompagnées et lancées',
      color: 'yellow',
    },
    {
      icon: <FiAward size={32} />,
      value: 50,
      suffix: '+',
      label: 'Projets réalisés',
      description: 'Initiatives menées à terme',
      color: 'orange',
    },
    {
      icon: <FiHeart size={32} />,
      value: 95,
      suffix: '%',
      label: 'Taux de satisfaction',
      description: 'Retours positifs des participants',
      color: 'blue',
    },
    {
      icon: <FiTarget size={32} />,
      value: 250,
      suffix: '+',
      label: 'Formations dispensées',
      description: 'Sessions de développement de compétences',
      color: 'yellow',
    },
    {
      icon: <FiGlobe size={32} />,
      value: 8,
      label: 'Pays partenaires',
      description: 'Réseau international JCI',
      color: 'orange',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const Counter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section className={styles.impactSection} ref={sectionRef}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Notre <span className={styles.gradientText}>Impact</span>
          </h2>
          <p className={styles.description}>
            Des chiffres qui témoignent de notre engagement et de notre impact dans la communauté
          </p>
        </div>

        <div className={styles.impactsGrid}>
          {impacts.map((impact, index) => (
            <div
              key={index}
              className={`${styles.impactCard} ${styles[impact.color]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardBackground}></div>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>{impact.icon}</div>
                <div className={styles.iconGlow}></div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.value}>
                  {isVisible && <Counter end={impact.value} suffix={impact.suffix} />}
                </div>
                <div className={styles.label}>{impact.label}</div>
                <div className={styles.cardDescription}>{impact.description}</div>
              </div>
              <div className={styles.cardShine}></div>
            </div>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Rejoignez-nous dans cette aventure</h3>
            <p className={styles.ctaText}>
              Ensemble, créons des projets qui transforment des vies et bâtissent un avenir meilleur pour notre communauté.
            </p>
            <button className={styles.ctaButton}>
              Proposer un Projet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
