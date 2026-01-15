'use client';

import React from 'react';
import { FiFileText, FiBook, FiClipboard, FiDownload } from 'react-icons/fi';
import styles from './DocumentsSection.module.scss';

export default function DocumentsSection() {
  const documents = [
    {
      icon: <FiFileText size={32} />,
      title: 'Statuts',
      description: 'Les statuts définissent la structure juridique et organisationnelle de JCI Cotonou la Doyenne.',
      size: '2.4 MB',
      pages: '24 pages',
      color: 'blue',
    },
    {
      icon: <FiBook size={32} />,
      title: 'Règlement Intérieur',
      description: 'Le règlement intérieur précise les modalités de fonctionnement et les règles de vie de l\'organisation.',
      size: '1.8 MB',
      pages: '18 pages',
      color: 'yellow',
    },
    {
      icon: <FiClipboard size={32} />,
      title: 'Textes Fondamentaux',
      description: 'Les textes fondamentaux de la JCI qui guident nos principes et nos valeurs au niveau international.',
      size: '3.2 MB',
      pages: '32 pages',
      color: 'orange',
    },
  ];

  return (
    <section className={styles.documentsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Documents <span className={styles.gradientText}>Fondamentaux</span>
          </h2>
          <p className={styles.description}>
            Les textes qui régissent notre organisation et définissent notre cadre de fonctionnement
          </p>
        </div>

        <div className={styles.documentsGrid}>
          {documents.map((doc, index) => (
            <div key={index} className={styles.documentCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${styles[doc.color]}`}>
                  {doc.icon}
                </div>
                <div className={styles.documentBadge}>PDF</div>
              </div>

              <h3 className={styles.documentTitle}>{doc.title}</h3>
              <p className={styles.documentDescription}>{doc.description}</p>

              <div className={styles.documentMeta}>
                <span className={styles.metaItem}>{doc.size}</span>
                <span className={styles.metaSeparator}>•</span>
                <span className={styles.metaItem}>{doc.pages}</span>
              </div>

              <button className={styles.downloadButton}>
                <FiDownload size={20} />
                <span>Télécharger</span>
              </button>

              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>

        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>ℹ️</div>
          <div className={styles.infoContent}>
            <h4 className={styles.infoTitle}>Accès aux Documents</h4>
            <p className={styles.infoText}>
              Ces documents sont accessibles à tous les membres et partenaires. Pour toute question concernant leur contenu, 
              veuillez contacter le secrétariat général.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
