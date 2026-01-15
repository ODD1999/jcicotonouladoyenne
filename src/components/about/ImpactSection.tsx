'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiUsers, FiTrendingUp, FiAward, FiGlobe } from 'react-icons/fi';
import styles from './ImpactSection.module.scss';

export default function ImpactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const impacts = [
    {
      icon: <FiUsers size={40} />,
      number: 10000,
      suffix: '+',
      label: 'Bénéficiaires Directs',
      color: 'blue',
    },
    {
      icon: <FiTrendingUp size={40} />,
      number: 200,
      suffix: '+',
      label: 'Projets Réalisés',
      color: 'yellow',
    },
    {
      icon: <FiAward size={40} />,
      number: 25,
      suffix: '+',
      label: 'Prix & Distinctions',
      color: 'orange',
    },
    {
      icon: <FiGlobe size={40} />,
      number: 15,
      suffix: '',
      label: 'Pays Partenaires',
      color: 'blue',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
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

    return <>{count.toLocaleString()}{suffix}</>;
  };

  return (
    <section ref={sectionRef} className={styles.impactSection}>
      <div className={styles.backgroundPattern}>
        <div className={styles.patternOrb1}></div>
        <div className={styles.patternOrb2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Notre <span className={styles.gradientText}>Impact</span> en Chiffres
          </h2>
          <p className={styles.description}>
            Des résultats concrets qui témoignent de notre engagement et de notre détermination à créer un changement positif.
          </p>
        </div>

        <div className={styles.grid}>
          {impacts.map((impact, index) => (
            <div key={index} className={`${styles.impactCard} ${styles[impact.color]}`}>
              <div className={styles.iconWrapper}>
                {impact.icon}
              </div>
              <div className={styles.number}>
                <CountUp end={impact.number} suffix={impact.suffix} />
              </div>
              <div className={styles.label}>{impact.label}</div>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
