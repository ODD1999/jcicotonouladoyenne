'use client';

import React from 'react';
import styles from './presence.module.scss';
import PresenceForm from '@/components/events/PresenceForm';

export default function PresencePage() {
  return (
    <div className={styles.presencePage}>
      <PresenceForm />
    </div>
  );
}
