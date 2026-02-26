'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from './ProjectSlider.module.scss';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: string;
  image: string;
}

export default function ProjectSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Mini Fab Lab',
      description: 'Projet de construction et d\'aménagement d\'un fab lab dans une zone rural',
      category: 'Education',
      impact: '200+ Bénéficiaires',
      image: '/hero/hero1.jpg',
    },
    {
      id: 2,
      title: 'Petit Citoyen',
      description: 'Intégration des jeunes dans la société pour leur développement social et économique.',
      category: 'Environnement',
      impact: '5000+ Enfants touchés',
      image: '/hero/hero2.jpg',
    },
    {
      id: 3,
      title: 'Tous Unis Contre les Cancers',
      description: 'Initiative de sensibilisation et de lutte contre les cancers.',
      category: 'Santé',
      impact: '50+ Entreprises créées',
      image: '/hero/hero3.jpg',
    },
    {
      id: 4,
      title: 'Leader 360',
      description: 'Programme de développement des compétences en leadership pour 200 jeunes entrepreneurs de la région.',
      category: 'Entrepreneuriat',
      impact: '1000+ Consultations',
      image: '/hero/hero4.jpg',
    },
  ];

  const goToSlide = (index: number) => {
    if (index >= 0 && index < projects.length) {
      setActiveSlide(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  const nextSlide = () => {
    if (activeSlide < projects.length - 1) {
      goToSlide(activeSlide + 1);
    } else {
      goToSlide(0);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      goToSlide(activeSlide - 1);
    } else {
      goToSlide(projects.length - 1);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (isScrolling) return;

    const delta = e.deltaY;
    const threshold = 50;

    if (Math.abs(delta) > threshold) {
      setIsScrolling(true);

      if (delta > 0 && activeSlide < projects.length - 1) {
        nextSlide();
      } else if (delta < 0 && activeSlide > 0) {
        prevSlide();
      } else if (delta > 0 && activeSlide === projects.length - 1) {
        if (sliderRef.current) {
          const nextSection = sliderRef.current.nextElementSibling;
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      setIsScrolling(true);

      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeSlide, isPaused]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('wheel', handleWheel as any, { passive: false });
    slider.addEventListener('touchstart', handleTouchStart as any);
    slider.addEventListener('touchend', handleTouchEnd as any);

    return () => {
      slider.removeEventListener('wheel', handleWheel as any);
      slider.removeEventListener('touchstart', handleTouchStart as any);
      slider.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [activeSlide, isScrolling]);

  return (
    <section 
      ref={sliderRef} 
      className={styles.projectSlider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.slidesContainer}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`${styles.slide} ${index === activeSlide ? styles.active : ''}`}
            style={{
              opacity: index === activeSlide ? 1 : 0,
              visibility: index === activeSlide ? 'visible' : 'hidden',
              transition: 'opacity 1s ease-in-out, visibility 1s',
            }}
          >
            <div
              className={`${styles.slideBackground} ${index === activeSlide ? styles.kenBurns : ''}`}
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            >
              <div className={styles.overlay}></div>
            </div>

            <div className={styles.slideContent}>
              <div className={styles.contentWrapper}>
                <div className={styles.badge}>
                  <span className={styles.badgeDot}></span>
                  {project.category}
                </div>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.meta}>
                  <div className={styles.impact}>
                    <span className={styles.impactIcon}>📊</span>
                    {project.impact}
                  </div>
                  <Link href={`/projets/${project.id}`} className={styles.discoverButton}>
                    Découvrir le projet
                    <FiArrowRight size={20} />
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className={styles.arrowLeft}
        onClick={prevSlide}
        aria-label="Projet précédent"
      >
        <FiChevronLeft size={32} />
      </button>

      <button 
        className={styles.arrowRight}
        onClick={nextSlide}
        aria-label="Projet suivant"
      >
        <FiChevronRight size={32} />
      </button>

      <div className={styles.navigation}>
        {projects.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller au projet ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.slideCounter}>
        <span className={styles.currentSlide}>{String(activeSlide + 1).padStart(2, '0')}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.totalSlides}>{String(projects.length).padStart(2, '0')}</span>
      </div>

      <div className={styles.scrollIndicator}>
        <FiChevronDown size={24} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
