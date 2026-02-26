'use client';

import React from 'react';
import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import styles from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    organisation: [
      { href: '/a-propos', label: 'À Propos' },
      { href: '/gouvernance', label: 'Gouvernance' },
      { href: '/mandat-actuel', label: 'Mandat Actuel' },
      { href: '/mandats-historiques', label: 'Historique' },
    ],
    engagement: [
      { href: '/projets', label: 'Nos Projets' },
      { href: '/evenements', label: 'Événements' },
      { href: '/actualites', label: 'Actualités' },
      { href: '/galerie', label: 'Galerie' },
    ],
    rejoindre: [
      { href: '/nous-rejoindre', label: 'Devenir Membre' },
      { href: '/contact', label: 'Contact' },
      { href: '/connexion', label: 'Espace Membre' },
    ],
  };

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>JCI</div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>Cotonou la Doyenne</span>
                <span className={styles.logoSubtitle}>Jeune Chambre Internationale</span>
              </div>
            </div>
            <p className={styles.description}>
              Former de jeunes citoyens actifs et engagés pour créer un impact positif dans notre communauté et au-delà.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Organisation</h4>
              <ul className={styles.linkList}>
                {footerLinks.organisation.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Engagement</h4>
              <ul className={styles.linkList}>
                {footerLinks.engagement.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Nous Rejoindre</h4>
              <ul className={styles.linkList}>
                {footerLinks.rejoindre.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <FiMapPin size={16} />
                  <span>Cotonou, Bénin</span>
                </li>
                <li className={styles.contactItem}>
                  <FiMail size={16} />
                  <span>contact@jci-cld.org</span>
                </li>
                <li className={styles.contactItem}>
                  <FiPhone size={16} />
                  <span>+229 XX XX XX XX</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} JCI Cotonou la Doyenne. Tous droits réservés.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/mentions-legales" className={styles.legalLink}>
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className={styles.legalLink}>
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
