'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiDollarSign, FiTag, FiShare2, FiTwitter, FiFacebook, FiLinkedin, FiLink, FiArrowLeft, FiCheckCircle, FiUser, FiMail, FiPhone, FiX, FiChevronLeft, FiChevronRight, FiPlay, FiImage } from 'react-icons/fi';
import Link from 'next/link';
import styles from './EventDetail.module.scss';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  caption?: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  price: string;
  status: 'upcoming' | 'ongoing' | 'past';
  image: string;
  organizer: string;
  organizerRole: string;
  organizerImage: string;
  program: string[];
  requirements: string[];
  gallery?: GalleryItem[];
}

interface RelatedEvent {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
}

interface EventDetailProps {
  event: Event;
  relatedEvents: RelatedEvent[];
}

export default function EventDetail({ event, relatedEvents }: EventDetailProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = event.title;
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '' });
    }, 2000);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (event.gallery && event.gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % event.gallery!.length);
    }
  };

  const prevImage = () => {
    if (event.gallery && event.gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + event.gallery!.length) % event.gallery!.length);
    }
  };

  const getStatusBadge = () => {
    const badges = {
      upcoming: { label: 'À venir', color: styles.upcoming },
      ongoing: { label: 'En cours', color: styles.ongoing },
      past: { label: 'Terminé', color: styles.past },
    };
    return badges[event.status];
  };

  const statusBadge = getStatusBadge();

  return (
    <article className={styles.eventDetail}>
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={event.image} alt={event.title} />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <Link href="/evenements" className={styles.backButton}>
              <FiArrowLeft size={20} />
              <span>Retour aux événements</span>
            </Link>

            <div className={styles.badges}>
              <div className={styles.typeBadge}>
                <FiTag size={16} />
                <span>{event.type}</span>
              </div>
              <div className={`${styles.statusBadge} ${statusBadge.color}`}>
                {statusBadge.label}
              </div>
            </div>

            <h1 className={styles.heroTitle}>{event.title}</h1>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <FiCalendar size={20} />
                <span>{event.date}</span>
              </div>
              <div className={styles.metaItem}>
                <FiClock size={20} />
                <span>{event.time}</span>
              </div>
              <div className={styles.metaItem}>
                <FiMapPin size={20} />
                <span>{event.location}</span>
              </div>
              <div className={styles.metaItem}>
                <FiUsers size={20} />
                <span>{event.attendees} participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.eventInfo}>
              <h2 className={styles.sectionTitle}>À propos de l'événement</h2>
              <div className={styles.description}>
                <p>{event.description}</p>
              </div>
            </div>

            {event.program.length > 0 && (
              <div className={styles.programSection}>
                <h2 className={styles.sectionTitle}>Programme</h2>
                <div className={styles.programList}>
                  {event.program.map((item, index) => (
                    <div key={index} className={styles.programItem}>
                      <div className={styles.programDot}></div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.requirements.length > 0 && (
              <div className={styles.requirementsSection}>
                <h2 className={styles.sectionTitle}>Prérequis</h2>
                <ul className={styles.requirementsList}>
                  {event.requirements.map((req, index) => (
                    <li key={index}>
                      <FiCheckCircle size={18} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.gallery && event.gallery.length > 0 && (
              <div className={styles.gallerySection}>
                <h2 className={styles.sectionTitle}>
                  <FiImage size={24} />
                  Galerie de l'événement
                </h2>
                <div className={styles.galleryGrid}>
                  {event.gallery.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={styles.galleryItem}
                      onClick={() => openLightbox(index)}
                    >
                      <img src={item.thumbnail} alt={item.caption || `Photo ${index + 1}`} />
                      <div className={styles.galleryOverlay}>
                        {item.type === 'video' ? (
                          <div className={styles.playIcon}>
                            <FiPlay size={32} />
                          </div>
                        ) : (
                          <div className={styles.zoomIcon}>
                            <FiImage size={24} />
                          </div>
                        )}
                      </div>
                      {item.caption && (
                        <div className={styles.galleryCaption}>
                          <p>{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.organizerCard}>
              <h2 className={styles.sectionTitle}>Organisateur</h2>
              <div className={styles.organizerContent}>
                <img src={event.organizerImage} alt={event.organizer} className={styles.organizerImage} />
                <div className={styles.organizerInfo}>
                  <h3 className={styles.organizerName}>{event.organizer}</h3>
                  <p className={styles.organizerRole}>{event.organizerRole}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.priceTag}>
                <FiDollarSign size={24} />
                <div className={styles.priceInfo}>
                  <span className={styles.priceLabel}>Tarif</span>
                  <span className={styles.priceValue}>{event.price}</span>
                </div>
              </div>

              {event.status === 'upcoming' && !isRegistered && (
                <form onSubmit={handleSubmit} className={styles.registrationForm}>
                  <h3 className={styles.formTitle}>S'inscrire à l'événement</h3>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="name">
                      <FiUser size={16} />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      <FiMail size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">
                      <FiPhone size={16} />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+229 XX XX XX XX"
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    S'inscrire maintenant
                  </button>
                </form>
              )}

              {isRegistered && (
                <div className={styles.successMessage}>
                  <FiCheckCircle size={48} />
                  <h3>Inscription confirmée !</h3>
                  <p>Vous recevrez un email de confirmation sous peu.</p>
                </div>
              )}

              {event.status === 'past' && (
                <div className={styles.pastEventMessage}>
                  <p>Cet événement est terminé</p>
                </div>
              )}
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FiShare2 size={18} />
                Partager l'événement
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
                <FiMapPin size={18} />
                Lieu
              </h3>
              <div className={styles.locationInfo}>
                <p className={styles.locationName}>{event.location}</p>
              </div>
            </div>
          </aside>
        </div>

        {relatedEvents.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Événements similaires</h2>
            <div className={styles.relatedGrid}>
              {relatedEvents.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/evenements/${related.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <img src={related.image} alt={related.title} />
                    <div className={styles.relatedOverlay}>
                      <span className={styles.relatedType}>{related.type}</span>
                      <span className={styles.relatedPrice}>{related.price}</span>
                    </div>
                  </div>
                  <div className={styles.relatedContent}>
                    <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                    <div className={styles.relatedMeta}>
                      <span className={styles.relatedMetaItem}>
                        <FiCalendar size={14} />
                        {related.date}
                      </span>
                      <span className={styles.relatedMetaItem}>
                        <FiClock size={14} />
                        {related.time}
                      </span>
                      <span className={styles.relatedMetaItem}>
                        <FiMapPin size={14} />
                        {related.location}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && event.gallery && event.gallery[currentImageIndex] && (
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
            {event.gallery[currentImageIndex].type === 'video' ? (
              <video 
                src={event.gallery[currentImageIndex].url} 
                controls 
                autoPlay
                className={styles.lightboxMedia}
              />
            ) : (
              <img 
                src={event.gallery[currentImageIndex].url} 
                alt={event.gallery[currentImageIndex].caption || 'Photo'} 
                className={styles.lightboxMedia}
              />
            )}
            {event.gallery[currentImageIndex].caption && (
              <div className={styles.lightboxCaption}>
                <p>{event.gallery[currentImageIndex].caption}</p>
              </div>
            )}
          </div>

          <div className={styles.lightboxCounter}>
            {currentImageIndex + 1} / {event.gallery.length}
          </div>
        </div>
      )}
    </article>
  );
}
