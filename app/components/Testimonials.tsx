'use client';

import React from 'react';
import styles from './styles/Testimonials.module.css';

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            What Our Partners Say
          </h2>
          <p className={styles.subtitle}>
            Hear from mortgage professionals who&apos;ve found their perfect match with BFFLender.
          </p>
        </div>
        
        <div className={styles.grid}>
          {/* Testimonial 1 */}
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <div className={styles.avatar}></div>
              <div>
                <p className={styles.personName}>Michael Rodriguez</p>
                <p className={styles.personTitle}>Branch Manager, Phoenix</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              &quot;After taking the P&L Challenge, I was amazed at how much more profitable my branch could be. The transparency and support have been game-changing.&quot;
            </p>
          </div>
          
          {/* Testimonial 2 */}
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <div className={styles.avatar}></div>
              <div>
                <p className={styles.personName}>Sarah Johnson</p>
                <p className={styles.personTitle}>Loan Officer, Las Vegas</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              &quot;The personal branding support and flat organizational structure have allowed me to grow my business faster than I ever imagined possible.&quot;
            </p>
          </div>
          
          {/* Testimonial 3 */}
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <div className={styles.avatar}></div>
              <div>
                <p className={styles.personName}>David Thompson</p>
                <p className={styles.personTitle}>Mortgage Broker, Seattle</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              &quot;The wide product set and innovative open house tools have helped me close more deals in less time. BFFLender truly lives up to its name!&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 