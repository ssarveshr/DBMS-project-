import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ onContactScroll }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => handleNavigation('/')}>
        <h1>Campus Events</h1>
      </div>

      <div className={`${styles.navContainer} ${isMenuOpen ? styles.active : ''}`}>
        <ul className={styles.navLinks}>
          <li><a href="#" onClick={() => handleNavigation('/')}>Home</a></li>
          <li><a href="#" onClick={() => handleNavigation('/event')}>Events</a></li>
          <li><a href="#">Calendar</a></li>
          <li><a href="#">Registered</a></li>
          <li><a href="#" onClick={() => handleNavigation('/about')}>About</a></li>
          <li><a href="#" onClick={onContactScroll}>Contact</a></li>
        </ul>

        <div className={styles.authButtons}>
          <button className={styles.loginBtn} onClick={() => handleNavigation('/login')}>
            Login
          </button>
          <button className={styles.signupBtn} onClick={() => handleNavigation('/signup')}>
            Sign Up
          </button>
        </div>
      </div>

      <button 
        className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className={styles.menuBar} />
        <span className={styles.menuBar} />
        <span className={styles.menuBar} />
      </button>
    </nav>
  );
};

export default Navbar;