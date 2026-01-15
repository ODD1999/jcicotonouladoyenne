'use client';

import React from 'react';
import { FiCheckCircle, FiClock, FiTrendingUp, FiUsers, FiTarget, FiBook } from 'react-icons/fi';
import styles from './ProjectsSection.module.scss';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Leadership Academy',
      description: 'Programme de formation intensive pour développer les compétences en leadership des jeunes',
      status: 'completed',
      progress: 100,
      icon: <FiBook size={24} />,
      color: 'green',
      image: null,
    },
    {
      title: 'Entrepreneurship Bootcamp',
      description: 'Accompagnement des jeunes entrepreneurs dans le lancement de leurs startups',
      status: 'in-progress',
      progress: 75,
      icon: <FiTrendingUp size={24} />,
      color: 'blue',
      image: null,
    },
    {
      title: 'Community Impact Day',
      description: 'Journée dédiée aux actions sociales et communautaires dans les quartiers de Cotonou',
      status: 'completed',
      progress: 100,
      icon: <FiUsers size={24} />,
      color: 'green',
      image: null,
    },
    {
      title: 'Digital Skills Training',
      description: 'Formation aux compétences numériques pour les jeunes défavorisés',
      status: 'in-progress',
      progress: 60,
      icon: <FiTarget size={24} />,
      color: 'blue',
      image: null,
    },
    {
      title: 'Youth Employment Forum',
      description: 'Forum de mise en relation entre jeunes talents et entreprises',
      status: 'upcoming',
      progress: 30,
      icon: <FiUsers size={24} />,
      color: 'orange',
      image: null,
    },
    {
      title: 'Innovation Challenge',
      description: 'Concours d\'innovation pour récompenser les meilleures idées de projets',
      status: 'upcoming',
      progress: 20,
      icon: <FiTarget size={24} />,
      color: 'orange',
      image: null,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Terminé', icon: <FiCheckCircle size={16} />, color: 'green' };
      case 'in-progress':
        return { label: 'En cours', icon: <FiClock size={16} />, color: 'blue' };
      case 'upcoming':
        return { label: 'À venir', icon: <FiClock size={16} />, color: 'orange' };
      default:
        return { label: 'Inconnu', icon: <FiClock size={16} />, color: 'gray' };
    }
  };

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Nos <span className={styles.gradientText}>Projets</span>
          </h2>
          <p className={styles.description}>
            Des initiatives concrètes pour un impact durable dans notre communauté
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => {
            const statusInfo = getStatusInfo(project.status);
            return (
              <div key={index} className={`${styles.projectCard} ${styles[project.color]}`}>
                <div className={styles.projectImage}>
                  <div className={styles.imageOverlay}>
                    <div className={styles.projectIcon}>
                      {project.icon}
                    </div>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[statusInfo.color]}`}>
                    {statusInfo.icon}
                    <span>{statusInfo.label}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

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
                </div>

                <div className={styles.cardShine}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
