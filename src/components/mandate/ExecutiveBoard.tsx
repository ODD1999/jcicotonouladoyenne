'use client';

import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import styles from './ExecutiveBoard.module.scss';

export default function ExecutiveBoard() {
  const [activeCategory, setActiveCategory] = useState('all');

  const members = [
    {
      name: 'Léonidas MEWOUSSI',
      role: 'Président',
      category: 'bureau',
      image: '/hero/hero1.jpg',
      email: 'president@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Descartes SEGBEDJI',
      role: 'Deputy President',
      category: 'bureau',
      image: '/hero/hero2.jpg',
      email: 'vp@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Servile ATTINKPASSO',
      role: 'Vice President Exécutif',
      category: 'bureau',
      image: '/hero/hero3.jpg',
      email: 'sg@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Amani KODOKPO',
      role: 'Trésorier',
      category: 'bureau',
      image: '/hero/hero4.jpg',
      email: 'tresoriere@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Ornéla OGOUTEÏBO',
      role: 'Sécrétaire Générale',
      category: 'vp',
      image: '/hero/hero3.jpg',
      email: 'dev@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Adélaïde KOKOU',
      role: 'VP Formation',
      category: 'vp',
      image: '/hero/hero2.jpg',
      email: 'formation@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Dieu Donné OUTCHI',
      role: 'VP Communication',
      category: 'vp',
      image: '/hero/hero1.jpg',
      email: 'com@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Olivia AZONNOUDO',
      role: 'VP Projets',
      category: 'vp',
      image: '/hero/hero2.jpg',
      email: 'projets@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Cédric OLOUKOÏ',
      role: 'VP Management',
      category: 'vp',
      image: '/hero/hero2.jpg',
      email: 'projets@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Onezim OGOUTEÏBO',
      role: 'VP Relations Extérieures',
      category: 'vp',
      image: '/hero/hero2.jpg',
      email: 'projets@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
    {
      name: 'Dieudonné GANDJI',
      role: 'VP Affaires et Entrepreneuriat',
      category: 'vp',
      image: '/hero/hero2.jpg',
      email: 'projets@jcicotonou.org',
      phone: '+229 XX XX XX XX',
    },
  ];

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'bureau', label: 'Comité Directeur Local' },
    { id: 'vp', label: 'Vice-Présidents' },
  ];

  const filteredMembers = activeCategory === 'all' 
    ? members 
    : members.filter(m => m.category === activeCategory);

  return (
    <section className={styles.executiveBoard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Comité <span className={styles.gradientText}>Directeur</span>
          </h2>
          <p className={styles.description}>
            Une équipe dynamique et engagée au service de l'excellence et du développement
          </p>
        </div>

        <div className={styles.filterTabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterTab} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.membersGrid}>
          {filteredMembers.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className={styles.avatarGlow}></div>
                  </div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <div className={styles.hoverHint}>Voir les contacts</div>
                </div>

                <div className={styles.cardBack}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <FiMail size={16} />
                      <span>{member.email}</span>
                    </div>
                    <div className={styles.contactItem}>
                      <FiPhone size={16} />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
