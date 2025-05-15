import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { jwtDecode } from "jwt-decode";

const NavBar = ({ onContactScroll }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState(null); // Initialize as null
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("userAuth");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setPayload(decoded);
        setUserRole(decoded.Role); // Assuming the role is stored in 'Role'
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserRole(null);
      }
    }
  }, []); // Empty dependency array to run only once on mount

  // Handle navigation
  const handleNavigation = (path) => {
    if (path === "/contact") {
      onContactScroll();
    } else {
      navigate(path);
    }
    setMenuOpen(false);
  };

  // Check if current page is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Render role-specific tab
  const renderRoleTab = () => {
    if (!userRole) return null; // Don't render if no role

    let rolePath, roleName;

    switch (userRole.toLowerCase()) {
      case "student":
        rolePath = "/studentdashboard";
        roleName = "Student Portal";
        break;
      case "faculty":
        rolePath = "/facultydashboard";
        roleName = "Faculty Portal";
        break;
      case "organizer":
        rolePath = "/organizerdashboard";
        roleName = "Organizer Portal";
        break;
      default:
        return null;
    }

    return (
      <li>
        <button
          onClick={() => handleNavigation(rolePath)}
          className={isActive(rolePath) ? styles.active : ""}
        >
          {roleName}
        </button>
      </li>
    );
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo} onClick={() => handleNavigation("/")}>
        <h1>Campus Events</h1>
      </div>

      {/* Mobile menu button */}
      <div className={styles.mobileMenuBtn} onClick={toggleMenu}>
        <div
          className={`${styles.menuBar} ${menuOpen ? styles.open : ""}`}
        ></div>
        <div
          className={`${styles.menuBar} ${menuOpen ? styles.open : ""}`}
        ></div>
        <div
          className={`${styles.menuBar} ${menuOpen ? styles.open : ""}`}
        ></div>
      </div>

      {/* Navigation Links */}
      <ul
        className={`${styles.navLinks} ${
          menuOpen ? styles.showMobileMenu : ""
        }`}
      >
        <li>
          <button
            onClick={() => handleNavigation("/")}
            className={isActive("/") ? styles.active : ""}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/event")}
            className={isActive("/event") ? styles.active : ""}
          >
            Events
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/calendar")}
            className={isActive("/calendar") ? styles.active : ""}
          >
            Calendar
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/about")}
            className={isActive("/about") ? styles.active : ""}
          >
            About
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/contact")}>Contact</button>
        </li>

        {/* Dynamically rendered role tab */}
        {renderRoleTab()}
      </ul>

      {/* Auth Buttons - Conditionally render based on login status */}
      <div
        className={`${styles.authButtons} ${
          menuOpen ? styles.showMobileMenu : ""
        }`}
      >
        {userRole ? (
          <button
            className={styles.signupBtn}
            onClick={() => {
              sessionStorage.removeItem("userAuth");
              setUserRole(null);
              navigate("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>
            <button
              className={styles.signupBtn}
              onClick={() => handleNavigation("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
