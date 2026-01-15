'use client';

import React, { useState } from 'react';
import { FiCalendar, FiUsers, FiTarget, FiDollarSign, FiTag, FiShare2, FiTwitter, FiFacebook, FiLinkedin, FiLink, FiArrowLeft, FiCheckCircle, FiImage, FiX, FiChevronLeft, FiChevronRight, FiPlay, FiDownload, FiFileText, FiTrendingUp, FiAward } from 'react-icons/fi';
import Link from 'next/link';
import styles from './ProjectDetail.module.scss';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  caption?: string;
}

interface ProjectStep {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  images?: GalleryItem[];
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
  type: 'sponsor' | 'partner';
  contribution?: string;
}

interface Document {
  id: number;
  title: string;
  type: string;
  size: string;
  url: string;
}

interface FinancialData {
  budget: string;
  spent: string;
  sources: { name: string; amount: string }[];
  expenses: { category: string; amount: string }[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  impact: string;
  beneficiaries: string;
  image: string;
  gallery?: GalleryItem[];
  steps: ProjectStep[];
  team: TeamMember[];
  partners: Partner[];
  documents: Document[];
  financial?: FinancialData;
}

interface RelatedProject {
  id: number;
  title: string;
  category: string;
  status: string;
  image: string;
  impact: string;
}

interface ProjectDetailProps {
  project: Project;
  relatedProjects: RelatedProject[];
}

export default function ProjectDetail({ project, relatedProjects }: ProjectDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState<GalleryItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStepGallery, setCurrentStepGallery] = useState(0);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = project.title;
    
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

  const openLightbox = (gallery: GalleryItem[], index: number) => {
    setCurrentGallery(gallery);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (currentGallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
    }
  };

  const prevImage = () => {
    if (currentGallery.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: { label: 'Terminé', color: styles.completed },
      'in-progress': { label: 'En cours', color: styles.inProgress },
      planned: { label: 'Planifié', color: styles.planned },
      pending: { label: 'En attente', color: styles.pending },
    };
    return badges[status as keyof typeof badges] || badges.planned;
  };

  const statusBadge = getStatusBadge(project.status);

  const nextSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev + 1) % project.gallery!.length);
    }
  };

  const prevSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
    }
  };

  return (
    <article className={styles.projectDetail}>
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={project.image} alt={project.title} />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <Link href="/projets" className={styles.backButton}>
              <FiArrowLeft size={20} />
              <span>Retour aux projets</span>
            </Link>

            <div className={styles.badges}>
              <div className={styles.categoryBadge}>
                <FiTag size={16} />
                <span>{project.category}</span>
              </div>
              <div className={`${styles.statusBadge} ${statusBadge.color}`}>
                {statusBadge.label}
              </div>
            </div>

            <h1 className={styles.heroTitle}>{project.title}</h1>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <FiCalendar size={20} />
                <span>{project.startDate} {project.endDate && `- ${project.endDate}`}</span>
              </div>
              <div className={styles.metaItem}>
                <FiUsers size={20} />
                <span>{project.beneficiaries} bénéficiaires</span>
              </div>
              <div className={styles.metaItem}>
                <FiTarget size={20} />
                <span>{project.impact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProjects.length > 0 && (
        <div className={styles.relatedSection}>
          <div className={styles.container}>
            <h2 className={styles.relatedTitle}>Projets similaires</h2>
            <div className={styles.relatedScroll}>
              {relatedProjects.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/projets/${related.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <img src={related.image} alt={related.title} />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{related.category}</span>
                    <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                    <p className={styles.relatedImpact}>
                      <FiTarget size={14} />
                      {related.impact}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.projectInfo}>
              <h2 className={styles.sectionTitle}>À propos du projet</h2>
              <div className={styles.description}>
                <p>{project.description}</p>
              </div>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className={styles.gallerySection}>
                <div className={styles.sliderHeader}>
                  <h2 className={styles.sectionTitle}>
                    <FiImage size={24} />
                    Galerie du projet
                  </h2>
                  <div className={styles.sliderControls}>
                    <button onClick={prevSlide} className={styles.sliderButton}>
                      <FiChevronLeft size={20} />
                    </button>
                    <span className={styles.sliderCounter}>
                      {currentSlide + 1} / {project.gallery.length}
                    </span>
                    <button onClick={nextSlide} className={styles.sliderButton}>
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                </div>
                <div className={styles.sliderContainer}>
                  <div 
                    className={styles.sliderTrack}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {project.gallery.map((item, index) => (
                      <div 
                        key={item.id} 
                        className={styles.sliderSlide}
                        onClick={() => openLightbox(project.gallery!, index)}
                      >
                        <img src={item.url} alt={item.caption || `Photo ${index + 1}`} />
                        <div className={styles.sliderOverlay}>
                          {item.type === 'video' ? (
                            <div className={styles.playIcon}>
                              <FiPlay size={48} />
                            </div>
                          ) : (
                            <div className={styles.zoomIcon}>
                              <FiImage size={32} />
                            </div>
                          )}
                        </div>
                        {item.caption && (
                          <div className={styles.sliderCaption}>
                            <p>{item.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.thumbnailsRow}>
                  {project.gallery.map((item, index) => (
                    <div 
                      key={`thumb-${item.id}`}
                      className={`${styles.thumbnail} ${currentSlide === index ? styles.thumbnailActive : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <img src={item.thumbnail} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            )}


            {project.team.length > 0 && (
              <div className={styles.teamSection}>
                <h2 className={styles.sectionTitle}>
                  <FiUsers size={24} />
                  Équipe du projet
                </h2>
                <div className={styles.teamGrid}>
                  {project.team.map((member) => (
                    <div key={member.id} className={styles.teamCard}>
                      <img src={member.image} alt={member.name} className={styles.teamImage} />
                      <h3 className={styles.teamName}>{member.name}</h3>
                      <p className={styles.teamRole}>{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.partners.length > 0 && (
              <div className={styles.partnersSection}>
                <h2 className={styles.sectionTitle}>
                  <FiAward size={24} />
                  Partenaires & Sponsors
                </h2>
                <div className={styles.partnersGrid}>
                  {project.partners.map((partner) => (
                    <div key={partner.id} className={styles.partnerCard}>
                      <div className={styles.partnerLogo}>
                        <img src={partner.logo} alt={partner.name} />
                      </div>
                      <h3 className={styles.partnerName}>{partner.name}</h3>
                      <span className={styles.partnerType}>
                        {partner.type === 'sponsor' ? '💰 Sponsor' : '🤝 Partenaire'}
                      </span>
                      {partner.contribution && (
                        <p className={styles.partnerContribution}>{partner.contribution}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.financial && project.status === 'completed' && (
              <div className={styles.financialSection}>
                <h2 className={styles.sectionTitle}>
                  <FiTrendingUp size={24} />
                  Bilan financier
                </h2>
                <div className={styles.financialOverview}>
                  <div className={styles.financialCard}>
                    <div className={styles.financialIcon}>
                      <FiDollarSign size={24} />
                    </div>
                    <div className={styles.financialInfo}>
                      <span className={styles.financialLabel}>Budget total</span>
                      <span className={styles.financialValue}>{project.financial.budget}</span>
                    </div>
                  </div>
                  <div className={styles.financialCard}>
                    <div className={styles.financialIcon}>
                      <FiTrendingUp size={24} />
                    </div>
                    <div className={styles.financialInfo}>
                      <span className={styles.financialLabel}>Dépenses</span>
                      <span className={styles.financialValue}>{project.financial.spent}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.financialDetails}>
                  <div className={styles.financialColumn}>
                    <h3 className={styles.financialSubtitle}>Sources de financement</h3>
                    <div className={styles.financialList}>
                      {project.financial.sources.map((source, index) => (
                        <div key={index} className={styles.financialItem}>
                          <span className={styles.financialItemName}>{source.name}</span>
                          <span className={styles.financialItemAmount}>{source.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.financialColumn}>
                    <h3 className={styles.financialSubtitle}>Répartition des dépenses</h3>
                    <div className={styles.financialList}>
                      {project.financial.expenses.map((expense, index) => (
                        <div key={index} className={styles.financialItem}>
                          <span className={styles.financialItemName}>{expense.category}</span>
                          <span className={styles.financialItemAmount}>{expense.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.documents.length > 0 && (
              <div className={styles.documentsSection}>
                <h2 className={styles.sectionTitle}>
                  <FiFileText size={24} />
                  Documents du projet
                </h2>
                <div className={styles.documentsList}>
                  {project.documents.map((doc) => (
                    <a 
                      key={doc.id} 
                      href={doc.url} 
                      className={styles.documentCard}
                      download
                    >
                      <div className={styles.documentIcon}>
                        <FiFileText size={32} />
                      </div>
                      <div className={styles.documentInfo}>
                        <h3 className={styles.documentTitle}>{doc.title}</h3>
                        <div className={styles.documentMeta}>
                          <span className={styles.documentType}>{doc.type}</span>
                          <span className={styles.documentSize}>{doc.size}</span>
                        </div>
                      </div>
                      <div className={styles.documentDownload}>
                        <FiDownload size={20} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            {project.steps.length > 0 && (
              <div className={styles.stepsSection}>
                <h2 className={styles.sectionTitle}>
                  <FiCheckCircle size={24} />
                  Étapes du projet
                </h2>
                <div className={styles.stepsList}>
                  {project.steps.map((step, index) => {
                    const stepBadge = getStatusBadge(step.status);
                    return (
                      <div key={step.id} className={styles.stepItem}>
                        <div className={styles.stepHeader}>
                          <div className={styles.stepNumber}>{index + 1}</div>
                          <div className={styles.stepInfo}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <span className={`${styles.stepStatus} ${stepBadge.color}`}>
                              {stepBadge.label}
                            </span>
                          </div>
                        </div>
                        <p className={styles.stepDate}>
                          <FiCalendar size={14} />
                          {step.date}
                        </p>
                        <p className={styles.stepDescription}>{step.description}</p>
                        {step.images && step.images.length > 0 && (
                          <div className={styles.stepGallery}>
                            {step.images.slice(0, 3).map((img, imgIndex) => (
                              <div 
                                key={img.id} 
                                className={styles.stepImage}
                                onClick={() => openLightbox(step.images!, imgIndex)}
                              >
                                <img src={img.thumbnail} alt={img.caption || `Étape ${index + 1}`} />
                                <div className={styles.stepImageOverlay}>
                                  <FiImage size={16} />
                                </div>
                              </div>
                            ))}
                            {step.images.length > 3 && (
                              <div className={styles.stepImageMore}>
                                +{step.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiShare2 size={18} />
                Partager le projet
              </h3>
              <div className={styles.shareButtons}>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('twitter')}
                  aria-label="Partager sur Twitter"
                >
                  <FiTwitter size={18} />
                  <span>Twitter</span>
                </button>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('facebook')}
                  aria-label="Partager sur Facebook"
                >
                  <FiFacebook size={18} />
                  <span>Facebook</span>
                </button>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('linkedin')}
                  aria-label="Partager sur LinkedIn"
                >
                  <FiLinkedin size={18} />
                  <span>LinkedIn</span>
                </button>
                <button 
                  className={styles.shareButton}
                  onClick={() => handleShare('copy')}
                  aria-label="Copier le lien"
                >
                  <FiLink size={18} />
                  <span>Copier</span>
                </button>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiTarget size={18} />
                Impact
              </h3>
              <div className={styles.impactInfo}>
                <p className={styles.impactText}>{project.impact}</p>
                <div className={styles.impactStat}>
                  <FiUsers size={20} />
                  <span>{project.beneficiaries} bénéficiaires</span>
                </div>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiTag size={18} />
                Catégorie
              </h3>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryTag}>{project.category}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {lightboxOpen && currentGallery[currentImageIndex] && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>
            <FiX size={32} />
          </button>

          <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FiChevronLeft size={40} />
          </button>

          <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FiChevronRight size={40} />
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {currentGallery[currentImageIndex].type === 'video' ? (
              <video 
                src={currentGallery[currentImageIndex].url} 
                controls 
                autoPlay
                className={styles.lightboxMedia}
              />
            ) : (
              <img 
                src={currentGallery[currentImageIndex].url} 
                alt={currentGallery[currentImageIndex].caption || 'Photo'} 
                className={styles.lightboxMedia}
              />
            )}
            {currentGallery[currentImageIndex].caption && (
              <div className={styles.lightboxCaption}>
                <p>{currentGallery[currentImageIndex].caption}</p>
              </div>
            )}
          </div>

          <div className={styles.lightboxCounter}>
            {currentImageIndex + 1} / {currentGallery.length}
          </div>
        </div>
      )}
    </article>
  );
}
