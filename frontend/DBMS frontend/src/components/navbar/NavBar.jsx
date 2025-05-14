import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ onContactScroll }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navigation
  const handleNavigation = (path) => {
    if (path === '/contact') {
      onContactScroll();
    } else {
      navigate(path);
    }
    setMenuOpen(false); // Close mobile menu after navigation
  };

  // Check if current page is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => handleNavigation('/')}>
        <h1>Campus Events</h1>
      </div>
      
      {/* Mobile menu button */}
      <div className={styles.mobileMenuBtn} onClick={toggleMenu}>
        <div className={`${styles.menuBar} ${menuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.menuBar} ${menuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.menuBar} ${menuOpen ? styles.open : ''}`}></div>
      </div>
      
      {/* Navigation Links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMobileMenu : ''}`}>
        <li>
          <button 
            onClick={() => handleNavigation('/')} 
            className={isActive('/') ? styles.active : ''}
          >
            Home
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/event')} 
            className={isActive('/event') ? styles.active : ''}
          >
            Events
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/calendar')} 
            className={isActive('/calendar') ? styles.active : ''}
          >
            Calendar
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/organizations')} 
            className={isActive('/organizations') ? styles.active : ''}
          >
            Organizations
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/about')} 
            className={isActive('/about') ? styles.active : ''}
          >
            About
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/contact')}>
            Contact
          </button>
        </li>
      </ul>
      
      {/* Auth Buttons */}
      <div className={`${styles.authButtons} ${menuOpen ? styles.showMobileMenu : ''}`}>
        <button 
          className={styles.loginBtn} 
          onClick={() => handleNavigation('/login')}
        >
          Login
        </button>
        <button 
          className={styles.signupBtn} 
          onClick={() => handleNavigation('/signup')}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;