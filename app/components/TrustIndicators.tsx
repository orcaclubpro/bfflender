'use client';

import React from 'react';
import styles from './styles/TrustIndicators.module.css';

const TrustIndicators = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.item}>
            <p className={styles.number} data-value="30">30+</p>
            <p className={styles.label}>Years Experience</p>
          </div>
          <div className={styles.item}>
            <p className={styles.number} data-value="5000">5,000+</p>
            <p className={styles.label}>Happy Clients</p>
          </div>
          <div className={styles.item}>
            <p className={styles.number} data-value="4.8">4.8/5</p>
            <p className={styles.label}>Customer Rating</p>
          </div>
          <div className={styles.item}>
            <p className={styles.number} data-value="20">20+</p>
            <p className={styles.label}>States Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators; 