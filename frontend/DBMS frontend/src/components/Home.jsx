import React, { useState, useEffect, useRef } from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1>Campus Events</h1>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#" className={styles.active}>Home</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Calendar</a></li>
          <li><a href="#">Organizations</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      
    </div>
  );
};

export default HomePage;
