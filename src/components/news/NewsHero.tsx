'use client';

import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUser, FiClock, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from './NewsHero.module.scss';

export default function NewsHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredNews = [
    {
      id: 1,
      title: 'JCI Cotonou remporte le Prix National de l\'Innovation Sociale',
      excerpt: 'Notre projet "Entrepreneuriat Féminin" a été récompensé lors de la cérémonie nationale pour son impact exceptionnel sur la communauté.',
      category: 'Récompenses',
      date: '28 Janvier 2024',
      author: 'Équipe Communication',
      readTime: '5 min',
      image: '/hero/hero1.jpg',
    },
    {
      id: 2,
      title: 'Lancement du Programme Leadership Academy 2024',
      excerpt: 'Un programme intensif de 6 mois pour former la nouvelle génération de leaders béninois avec des experts internationaux.',
      category: 'Formations',
      date: '25 Janvier 2024',
      author: 'Direction Formation',
      readTime: '4 min',
      image: '/hero/hero2.jpg',
    },
    {
      id: 3,
      title: 'Partenariat Stratégique avec la Banque Mondiale',
      excerpt: 'Un accord de collaboration pour soutenir 100 jeunes entrepreneurs dans le lancement de leurs projets innovants.',
      category: 'Partenariats',
      date: '20 Janvier 2024',
      author: 'Président JCI',
      readTime: '6 min',
      image: '/hero/hero3.jpg',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredNews.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span>Actualités JCI</span>
          </div>
          <h1 className={styles.title}>
            Restez <span className={styles.gradientText}>Informés</span>
          </h1>
          <p className={styles.description}>
            Découvrez les dernières nouvelles, événements et réalisations de JCI Cotonou la Doyenne
          </p>
        </div>

        <div className={styles.sliderWrapper}>
          <button 
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={prevSlide}
            aria-label="Article précédent"
          >
            <FiChevronLeft size={24} />
          </button>

          <div className={styles.sliderContainer}>
            <div 
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredNews.map((news, index) => (
                <div key={news.id} className={styles.slide}>
                  <div className={styles.slideImage}>
                    <img src={news.image} alt={news.title} />
                    <div className={styles.imageOverlay}></div>
                  </div>

                  <div className={styles.slideContent}>
                    <div className={styles.categoryBadge}>{news.category}</div>
                    
                    <h2 className={styles.slideTitle}>{news.title}</h2>
                    <p className={styles.slideExcerpt}>{news.excerpt}</p>

                    <div className={styles.slideMeta}>
                      <div className={styles.metaItem}>
                        <FiCalendar size={16} />
                        <span>{news.date}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FiUser size={16} />
                        <span>{news.author}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FiClock size={16} />
                        <span>{news.readTime} de lecture</span>
                      </div>
                    </div>

                    <Link href={`/actualites/${news.id}`} className={styles.readMoreButton}>
                      Lire l'article
                      <FiArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={nextSlide}
            aria-label="Article suivant"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {featuredNews.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller à l'article ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>150+</div>
            <div className={styles.statLabel}>Articles publiés</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>50K+</div>
            <div className={styles.statLabel}>Lecteurs mensuels</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>12</div>
            <div className={styles.statLabel}>Catégories</div>
          </div>
        </div>
      </div>
    </section>
  );
}
