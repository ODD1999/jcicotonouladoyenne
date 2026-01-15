'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const CountUp = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const duration = 2000;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end]);

    return <>{count}{suffix}</>;
  };

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.backgroundOverlay}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          À Propos de Nous
        </div>

        <h1 className={styles.title}>
          JCI Cotonou <span className={styles.gradientText}>la Doyenne</span>
        </h1>

        <p className={styles.subtitle}>
          Depuis plus de 60 ans, nous formons les leaders de demain et créons un impact positif durable dans notre communauté.
        </p>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              <CountUp end={60} suffix="+" />
            </div>
            <div className={styles.statLabel}>Années d'Excellence</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              <CountUp end={500} suffix="+" />
            </div>
            <div className={styles.statLabel}>Membres Actifs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              <CountUp end={200} suffix="+" />
            </div>
            <div className={styles.statLabel}>Projets Réalisés</div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <FiArrowDown size={24} />
        <span>Découvrir notre histoire</span>
      </div>
    </section>
  );
}
