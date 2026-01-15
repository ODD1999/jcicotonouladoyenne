'use client';

import React from 'react';
import { FiCalendar, FiUser, FiClock, FiTag, FiShare2, FiTwitter, FiFacebook, FiLinkedin, FiLink, FiTrendingUp, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import styles from './ArticleDetail.module.scss';

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  readTime: string;
  image: string;
  views: string;
  tags: string[];
}

interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

interface ArticleDetailProps {
  article: Article;
  relatedArticles: RelatedArticle[];
}

export default function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    
    const shareUrls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Lien copié !');
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <article className={styles.articleDetail}>
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={article.image} alt={article.title} />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <Link href="/actualites" className={styles.backButton}>
              <FiArrowLeft size={20} />
              <span>Retour aux actualités</span>
            </Link>

            <div className={styles.categoryBadge}>
              <FiTag size={16} />
              <span>{article.category}</span>
            </div>

            <h1 className={styles.heroTitle}>{article.title}</h1>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <FiCalendar size={18} />
                <span>{article.date}</span>
              </div>
              <div className={styles.metaItem}>
                <FiUser size={18} />
                <span>{article.author}</span>
              </div>
              <div className={styles.metaItem}>
                <FiClock size={18} />
                <span>{article.readTime} de lecture</span>
              </div>
              <div className={styles.metaItem}>
                <FiTrendingUp size={18} />
                <span>{article.views} vues</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.articleContent}>
              <div className={styles.contentText} dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className={styles.articleFooter}>
              <div className={styles.tags}>
                <h3 className={styles.tagsTitle}>Tags</h3>
                <div className={styles.tagsList}>
                  {article.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.authorCard}>
                <img src={article.authorImage} alt={article.author} className={styles.authorImage} />
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{article.author}</h4>
                  <p className={styles.authorRole}>{article.authorRole}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiShare2 size={20} />
                Partager l'article
              </h3>
              <div className={styles.shareButtons}>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('twitter')}
                  aria-label="Partager sur Twitter"
                >
                  <FiTwitter size={20} />
                  <span>Twitter</span>
                </button>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('facebook')}
                  aria-label="Partager sur Facebook"
                >
                  <FiFacebook size={20} />
                  <span>Facebook</span>
                </button>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('linkedin')}
                  aria-label="Partager sur LinkedIn"
                >
                  <FiLinkedin size={20} />
                  <span>LinkedIn</span>
                </button>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('copy')}
                  aria-label="Copier le lien"
                >
                  <FiLink size={20} />
                  <span>Copier</span>
                </button>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiUser size={20} />
                À propos de l'auteur
              </h3>
              <div className={styles.authorSidebar}>
                <img src={article.authorImage} alt={article.author} className={styles.authorSidebarImage} />
                <h4 className={styles.authorSidebarName}>{article.author}</h4>
                <p className={styles.authorSidebarRole}>{article.authorRole}</p>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiTag size={20} />
                Catégorie
              </h3>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryTag}>{article.category}</span>
              </div>
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Articles similaires</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/actualites/${related.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <img src={related.image} alt={related.title} />
                    <div className={styles.relatedOverlay}>
                      <span className={styles.relatedCategory}>{related.category}</span>
                    </div>
                  </div>
                  <div className={styles.relatedContent}>
                    <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                    <p className={styles.relatedExcerpt}>{related.excerpt}</p>
                    <div className={styles.relatedMeta}>
                      <span className={styles.relatedDate}>
                        <FiCalendar size={14} />
                        {related.date}
                      </span>
                      <span className={styles.relatedReadTime}>
                        <FiClock size={14} />
                        {related.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
