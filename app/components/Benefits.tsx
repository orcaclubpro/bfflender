'use client';

import React from 'react';
import { Layout, CheckCircle, Users, Award, Calendar } from 'lucide-react';
import styles from './styles/Benefits.module.css';

const Benefits = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Why Choose BFFLender?
          </h2>
          <p className={styles.subtitle}>
            We're more than just competitive rates. We're your mortgage BFF.
          </p>
        </div>
        
        <div className={styles.grid}>
          {/* Benefit Card 1 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Layout className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Wide Product Set</h3>
            <p className={styles.cardText}>
              Access a comprehensive range of mortgage products tailored to your unique needs, from conventional loans to specialized programs.
            </p>
          </div>
          
          {/* Benefit Card 2 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <CheckCircle className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Transparency</h3>
            <p className={styles.cardText}>
              No hidden fees or complicated jargon. We provide complete transparency in our financials and margins to build lasting trust.
            </p>
          </div>
          
          {/* Benefit Card 3 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Users className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Flat Organization</h3>
            <p className={styles.cardText}>
              Direct access to decision-makers means faster approvals and personalized service without unnecessary bureaucracy.
            </p>
          </div>
          
          {/* Benefit Card 4 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Award className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Personal Branding</h3>
            <p className={styles.cardText}>
              Stand out with customized marketing support that helps you build your personal brand while leveraging our trusted name.
            </p>
          </div>
          
          {/* Benefit Card 5 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Calendar className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>Open House Tools</h3>
            <p className={styles.cardText}>
              Access cutting-edge technology and resources designed to make your open houses more effective and client-friendly.
            </p>
          </div>
          
          {/* CTA Card */}
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ready to see the difference?</h3>
            <p className={styles.ctaText}>
              Join the hundreds of mortgage professionals who've boosted their business with BFFLender.
            </p>
            <button className={styles.ctaButton}>
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits; 