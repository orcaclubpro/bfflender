'use client';

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Your BFF in Home Financing
          </h1>
          <p className={styles.subtitle}>
            We&apos;re not just lenders. We&apos;re partners for life, dedicated to making your mortgage experience simple and rewarding.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>
              Start Your Journey <ArrowRight className={styles.iconRight} />
            </button>
            <button className={styles.secondaryButton}>
              How It Works
            </button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.card}>
            <div className={styles.placeholderImage}>Placeholder Image</div>
            <div className={styles.homeownerStat}>
              <div className={styles.iconBadge}>
                <CheckCircle size={24} />
              </div>
              <p className={styles.homeownerText}>5,000+ Happy Homeowners</p>
            </div>
          </div>
          <div className={styles.expBadge}>
            <p className={styles.expText}>30+ Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 