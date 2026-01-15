'use client';

import React, { useState } from 'react';
import { FiCheckCircle, FiClock, FiCalendar, FiUsers, FiTarget, FiBook, FiTrendingUp, FiHeart, FiGlobe, FiAward } from 'react-icons/fi';
import Link from 'next/link';
import styles from './ProjectsGrid.module.scss';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  image: string;
  beneficiaries: string;
  duration: string;
  icon: React.ReactNode;
}

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous', icon: <FiGlobe size={18} /> },
    { id: 'formation', label: 'Formation', icon: <FiBook size={18} /> },
    { id: 'entrepreneuriat', label: 'Entrepreneuriat', icon: <FiTrendingUp size={18} /> },
    { id: 'social', label: 'Social', icon: <FiHeart size={18} /> },
    { id: 'environnement', label: 'Environnement', icon: <FiTarget size={18} /> },
  ];

  const statuses = [
    { id: 'all', label: 'Tous les statuts' },
    { id: 'completed', label: 'Terminés' },
    { id: 'in-progress', label: 'En cours' },
    { id: 'upcoming', label: 'À venir' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Leadership Academy 2024',
      description: 'Programme intensif de développement des compétences en leadership pour 200 jeunes entrepreneurs de la région.',
      category: 'formation',
      status: 'completed',
      progress: 100,
      image: '/hero/hero1.jpg',
      beneficiaries: '200+ jeunes',
      duration: '6 mois',
      icon: <FiBook size={24} />,
    },
    {
      id: 2,
      title: 'Entrepreneurship Bootcamp',
      description: 'Accompagnement des jeunes entrepreneurs dans le lancement et la croissance de leurs startups innovantes.',
      category: 'entrepreneuriat',
      status: 'in-progress',
      progress: 75,
      image: '/hero/hero2.jpg',
      beneficiaries: '50 startups',
      duration: '3 mois',
      icon: <FiTrendingUp size={24} />,
    },
    {
      id: 3,
      title: 'Assainissement Communautaire',
      description: 'Initiative de nettoyage et sensibilisation environnementale dans 5 quartiers de Cotonou.',
      category: 'environnement',
      status: 'completed',
      progress: 100,
      image: '/hero/hero3.jpg',
      beneficiaries: '5000+ personnes',
      duration: '2 mois',
      icon: <FiTarget size={24} />,
    },
    {
      id: 4,
      title: 'Digital Skills Training',
      description: 'Formation aux compétences numériques essentielles pour les jeunes défavorisés de la région.',
      category: 'formation',
      status: 'in-progress',
      progress: 60,
      image: '/hero/hero4.jpg',
      beneficiaries: '150 jeunes',
      duration: '4 mois',
      icon: <FiBook size={24} />,
    },
    {
      id: 5,
      title: 'Santé pour Tous',
      description: 'Campagne de dépistage gratuit et sensibilisation aux maladies cardiovasculaires.',
      category: 'social',
      status: 'completed',
      progress: 100,
      image: '/hero/hero1.jpg',
      beneficiaries: '1000+ consultations',
      duration: '1 mois',
      icon: <FiHeart size={24} />,
    },
    {
      id: 6,
      title: 'Youth Employment Forum',
      description: 'Forum de mise en relation entre jeunes talents et entreprises pour favoriser l\'emploi.',
      category: 'entrepreneuriat',
      status: 'upcoming',
      progress: 30,
      image: '/hero/hero2.jpg',
      beneficiaries: '300+ participants',
      duration: '1 jour',
      icon: <FiUsers size={24} />,
    },
    {
      id: 7,
      title: 'Innovation Challenge',
      description: 'Concours d\'innovation pour récompenser les meilleures idées de projets à impact social.',
      category: 'entrepreneuriat',
      status: 'upcoming',
      progress: 20,
      image: '/hero/hero3.jpg',
      beneficiaries: '100+ projets',
      duration: '2 mois',
      icon: <FiAward size={24} />,
    },
    {
      id: 8,
      title: 'Entrepreneuriat Féminin',
      description: 'Programme d\'accompagnement et de financement de projets portés par des femmes entrepreneures.',
      category: 'entrepreneuriat',
      status: 'in-progress',
      progress: 80,
      image: '/hero/hero4.jpg',
      beneficiaries: '50+ entreprises',
      duration: '6 mois',
      icon: <FiTrendingUp size={24} />,
    },
    {
      id: 9,
      title: 'Reboisement Urbain',
      description: 'Plantation de 1000 arbres dans les espaces publics pour améliorer la qualité de l\'air.',
      category: 'environnement',
      status: 'in-progress',
      progress: 45,
      image: '/hero/hero1.jpg',
      beneficiaries: 'Toute la ville',
      duration: '1 an',
      icon: <FiTarget size={24} />,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
    const statusMatch = activeStatus === 'all' || project.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Terminé', icon: <FiCheckCircle size={16} />, color: 'green' };
      case 'in-progress':
        return { label: 'En cours', icon: <FiClock size={16} />, color: 'blue' };
      case 'upcoming':
        return { label: 'À venir', icon: <FiCalendar size={16} />, color: 'orange' };
      default:
        return { label: 'Inconnu', icon: <FiClock size={16} />, color: 'gray' };
    }
  };

  return (
    <section className={styles.projectsGrid}>
      <div className={styles.container}>
        <div className={styles.filtersSection}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Catégories</h3>
            <div className={styles.categoryFilters}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.filterButton} ${activeCategory === category.id ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsHeader}>
          <div className={styles.resultsInfo}>
            <h2 className={styles.resultsTitle}>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Projet' : 'Projets'}
            </h2>
            <p className={styles.resultsDescription}>
              {activeCategory === 'all' && activeStatus === 'all'
                ? 'Tous nos projets'
                : 'Projets filtrés selon vos critères'}
            </p>
          </div>

          <div className={styles.statusFilters}>
            {statuses.map((status) => (
              <button
                key={status.id}
                className={`${styles.statusButton} ${activeStatus === status.id ? styles.active : ''}`}
                onClick={() => setActiveStatus(status.id)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.projectsContainer}>
          {filteredProjects.map((project, index) => {
            const statusInfo = getStatusInfo(project.status);
            return (
              <div
                key={project.id}
                className={`${styles.projectCard} ${styles[statusInfo.color]}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.title} />
                  <div className={styles.imageOverlay}>
                    <div className={styles.projectIcon}>{project.icon}</div>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[statusInfo.color]}`}>
                    {statusInfo.icon}
                    <span>{statusInfo.label}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.projectMeta}>
                    <div className={styles.metaItem}>
                      <FiUsers size={16} />
                      <span>{project.beneficiaries}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiCalendar size={16} />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Progression</span>
                      <span className={styles.progressValue}>{project.progress}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link href={`/projets/${project.id}`} className={styles.detailsButton}>
                    Voir les détails
                  </Link>
                </div>

                <div className={styles.cardShine}></div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FiTarget size={48} />
            </div>
            <h3 className={styles.emptyTitle}>Aucun projet trouvé</h3>
            <p className={styles.emptyDescription}>
              Essayez de modifier vos filtres pour voir plus de projets.
            </p>
            <button
              className={styles.resetButton}
              onClick={() => {
                setActiveCategory('all');
                setActiveStatus('all');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
