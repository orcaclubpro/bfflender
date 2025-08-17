'use client';

import React from 'react';
import styles from './styles/Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>BFFLender.com</div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Home</a>
          <a href="#" className={styles.link}>About</a>
          <a href="#" className={styles.link}>Services</a>
          <a href="#" className={styles.link}>Contact</a>
        </div>
        <button className={styles.button}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 