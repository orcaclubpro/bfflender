'use client';

import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import styles from './styles/PLChallenge.module.css';

const PLChallenge = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>The P&L Challenge</h2>
          <p className={styles.subtitle}>
            We're so confident in our competitive model, we're willing to bet on it.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.iconContainer}>
              <BarChart2 className={styles.icon} />
            </div>
            <div className={styles.contentBox}>
              <h3 className={styles.cardTitle}>
                We'll Compare Your Existing P&L With Ours
              </h3>
              <p className={styles.cardText}>
                If we cannot demonstrate a better financial model, we'll give you two tickets to a Las Vegas show of your choice.
              </p>
              <p className={styles.cardSubtext}>
                Our transparent approach to mortgage lending means we're confident in showing you exactly how our model outperforms the competition.
              </p>
              <button className={styles.button}>
                Take the Challenge <ArrowRight className={styles.iconRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PLChallenge; 