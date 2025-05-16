'use client';

import React from 'react';
import styles from './styles/CallToAction.module.css';

const CallToAction = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ready to Find Your Perfect Mortgage Partner?
        </h2>
        <p className={styles.description}>
          Let's start your journey together – no pressure, just friendly guidance and a partnership built to last.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.primaryButton}>
            Take the P&L Challenge
          </button>
          <button className={styles.secondaryButton}>
            Talk to a BFFLender
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 