import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/about">About</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/credits">Credits</Link>
      </div>
      <p className={styles.copy}>
        © 2025 LitLog All Rights Reserved. Made by Team Book Fox with Love for Readers. Book data from Google Books API.
      </p>
    </footer>
  );
};

export default Footer;
