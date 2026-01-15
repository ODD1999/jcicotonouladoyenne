'use client';

import React, { useState } from 'react';
import { FiCalendar, FiUser, FiClock, FiTag, FiTrendingUp, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import styles from './NewsGrid.module.scss';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  featured: boolean;
  views: string;
}

export default function NewsGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Toutes les actualités', icon: <FiTag size={18} /> },
    { id: 'evenements', label: 'Événements', icon: <FiTag size={18} /> },
    { id: 'formations', label: 'Formations', icon: <FiTag size={18} /> },
    { id: 'recompenses', label: 'Récompenses', icon: <FiTag size={18} /> },
    { id: 'partenariats', label: 'Partenariats', icon: <FiTag size={18} /> },
    { id: 'projets', label: 'Projets', icon: <FiTag size={18} /> },
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: 'JCI Cotonou remporte le Prix National de l\'Innovation Sociale',
      excerpt: 'Notre projet "Entrepreneuriat Féminin" a été récompensé lors de la cérémonie nationale pour son impact exceptionnel sur la communauté.',
      category: 'recompenses',
      date: '28 Janvier 2024',
      author: 'Équipe Communication',
      readTime: '5 min',
      image: '/hero/hero1.jpg',
      featured: true,
      views: '2.5K',
    },
    {
      id: 2,
      title: 'Lancement du Programme Leadership Academy 2024',
      excerpt: 'Un programme intensif de 6 mois pour former la nouvelle génération de leaders béninois avec des experts internationaux.',
      category: 'formations',
      date: '25 Janvier 2024',
      author: 'Direction Formation',
      readTime: '4 min',
      image: '/hero/hero2.jpg',
      featured: true,
      views: '1.8K',
    },
    {
      id: 3,
      title: 'Partenariat Stratégique avec la Banque Mondiale',
      excerpt: 'Un accord de collaboration pour soutenir 100 jeunes entrepreneurs dans le lancement de leurs projets innovants.',
      category: 'partenariats',
      date: '20 Janvier 2024',
      author: 'Président JCI',
      readTime: '6 min',
      image: '/hero/hero3.jpg',
      featured: false,
      views: '3.2K',
    },
    {
      id: 4,
      title: 'Networking Evening : Plus de 200 participants',
      excerpt: 'Une soirée exceptionnelle qui a permis de créer des connexions précieuses entre entrepreneurs et investisseurs.',
      category: 'evenements',
      date: '18 Janvier 2024',
      author: 'Comité Événements',
      readTime: '3 min',
      image: '/hero/hero4.jpg',
      featured: false,
      views: '1.5K',
    },
    {
      id: 5,
      title: 'Formation en Marketing Digital : Retour sur une session réussie',
      excerpt: 'Plus de 80 participants ont bénéficié de cette formation intensive sur les stratégies de marketing digital moderne.',
      category: 'formations',
      date: '15 Janvier 2024',
      author: 'Formateurs JCI',
      readTime: '4 min',
      image: '/hero/hero1.jpg',
      featured: false,
      views: '1.2K',
    },
    {
      id: 6,
      title: 'Projet Reboisement Urbain : 500 arbres plantés',
      excerpt: 'Une initiative environnementale majeure qui contribue à améliorer la qualité de l\'air dans la ville de Cotonou.',
      category: 'projets',
      date: '12 Janvier 2024',
      author: 'Équipe Environnement',
      readTime: '5 min',
      image: '/hero/hero2.jpg',
      featured: false,
      views: '2.1K',
    },
    {
      id: 7,
      title: 'Innovation Challenge : Découvrez les projets finalistes',
      excerpt: 'Les 10 meilleurs projets innovants sélectionnés pour la grande finale du concours d\'innovation sociale.',
      category: 'evenements',
      date: '10 Janvier 2024',
      author: 'Jury Innovation',
      readTime: '7 min',
      image: '/hero/hero3.jpg',
      featured: false,
      views: '1.9K',
    },
    {
      id: 8,
      title: 'Nouveau Partenariat avec l\'Université d\'Abomey-Calavi',
      excerpt: 'Un accord de collaboration pour développer des programmes de formation et de recherche conjoints.',
      category: 'partenariats',
      date: '08 Janvier 2024',
      author: 'Direction Académique',
      readTime: '4 min',
      image: '/hero/hero4.jpg',
      featured: false,
      views: '1.6K',
    },
    {
      id: 9,
      title: 'Entrepreneuriat Féminin : 30 femmes accompagnées',
      excerpt: 'Bilan positif de notre programme d\'accompagnement qui a permis à 30 femmes de lancer leur entreprise.',
      category: 'projets',
      date: '05 Janvier 2024',
      author: 'Équipe Projets',
      readTime: '6 min',
      image: '/hero/hero1.jpg',
      featured: false,
      views: '2.8K',
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const categoryMatch = activeCategory === 'all' || article.category === activeCategory;
    const searchMatch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <section className={styles.newsGrid}>
      <div className={styles.container}>
        <div className={styles.filtersSection}>
          <div className={styles.searchBox}>
            <FiSearch size={20} />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

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

        <div className={styles.resultsHeader}>
          <div className={styles.resultsInfo}>
            <h2 className={styles.resultsTitle}>
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            </h2>
            <p className={styles.resultsDescription}>
              {activeCategory === 'all' && searchQuery === ''
                ? 'Toutes nos actualités'
                : 'Articles filtrés selon vos critères'}
            </p>
          </div>

          <div className={styles.trendingBadge}>
            <FiTrendingUp size={18} />
            <span>Tendances du moment</span>
          </div>
        </div>

        {featuredArticles.length > 0 && (
          <div className={styles.featuredSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.starIcon}>⭐</span>
              Articles à la une
            </h3>
            <div className={styles.featuredGrid}>
              {featuredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} featured index={index} />
              ))}
            </div>
          </div>
        )}

        {regularArticles.length > 0 && (
          <div className={styles.regularSection}>
            {featuredArticles.length > 0 && (
              <h3 className={styles.sectionTitle}>Autres articles</h3>
            )}
            <div className={styles.articlesGrid}>
              {regularArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FiSearch size={48} />
            </div>
            <h3 className={styles.emptyTitle}>Aucun article trouvé</h3>
            <p className={styles.emptyDescription}>
              Essayez de modifier vos filtres ou votre recherche pour voir plus d'articles.
            </p>
            <button
              className={styles.resetButton}
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
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

function ArticleCard({ article, featured = false, index }: { article: Article; featured?: boolean; index: number }) {
  return (
    <div
      className={`${styles.articleCard} ${featured ? styles.featured : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={`/actualites/${article.id}`} className={styles.cardLink}>
        <div className={styles.articleImage}>
          <img src={article.image} alt={article.title} />
          <div className={styles.imageOverlay}>
            {featured && <div className={styles.featuredBadge}>⭐ À la une</div>}
            <div className={styles.categoryBadge}>{article.category}</div>
          </div>
          <div className={styles.viewsBadge}>
            <FiTrendingUp size={14} />
            <span>{article.views} vues</span>
          </div>
        </div>

        <div className={styles.articleContent}>
          <h3 className={styles.articleTitle}>{article.title}</h3>
          <p className={styles.articleExcerpt}>{article.excerpt}</p>

          <div className={styles.articleMeta}>
            <div className={styles.metaItem}>
              <FiCalendar size={14} />
              <span>{article.date}</span>
            </div>
            <div className={styles.metaItem}>
              <FiUser size={14} />
              <span>{article.author}</span>
            </div>
            <div className={styles.metaItem}>
              <FiClock size={14} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardShine}></div>
      </Link>
    </div>
  );
}
