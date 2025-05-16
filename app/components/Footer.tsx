'use client';

import React from 'react';
import styles from './styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.about}>
            <h3 className={styles.title}>BFFLender</h3>
            <p className={styles.aboutText}>
              Your Best Friend Forever in the mortgage industry, providing transparent, relationship-focused lending solutions.
            </p>
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Products</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}><a href="#" className={styles.link}>Conventional Loans</a></li>
              <li className={styles.listItem}><a href="#" className={styles.link}>FHA Loans</a></li>
              <li className={styles.listItem}><a href="#" className={styles.link}>VA Loans</a></li>
              <li className={styles.listItem}><a href="#" className={styles.link}>Jumbo Loans</a></li>
            </ul>
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Resources</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}><a href="#" className={styles.link}>Mortgage Calculator</a></li>
              <li className={styles.listItem}><a href="#" className={styles.link}>Blog</a></li>
              <li className={styles.listItem}><a href="#" className={styles.link}>FAQ</a></li>
              <li className={styles.listItem}><a href="#" className={styles.link}>Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>1234 Mortgage Lane</li>
              <li className={styles.listItem}>Las Vegas, NV 89123</li>
              <li className={styles.listItem}>contact@bfflender.com</li>
              <li className={styles.listItem}>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className={styles.divider}>
          <div className={styles.bottomSection}>
            <p className={styles.copyright}>
              © 2025 BFFLender. All rights reserved. NMLS #14210
            </p>
            <div className={styles.linkGroup}>
              <a href="#" className={styles.link}>Privacy Policy</a>
              <a href="#" className={styles.link}>Terms of Service</a>
              <a href="#" className={styles.link}>Licenses</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 