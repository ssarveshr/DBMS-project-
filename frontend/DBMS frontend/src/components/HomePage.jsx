import React, { useState, useEffect, useRef } from 'react';
import styles from './HomePage.module.css'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const footerRef = useRef(null);

  const handleContactScroll = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };  

  const navigate = useNavigate(); // Ensure this is defined

  // Redirect function for login
  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the login page
  };

  // Redirect function for signup
  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  // Redirect function for About page
  const handleAboutRedirect = () => {
    navigate('/about'); // Navigate to the About page
  };

  // Redirect function for Events page
  const handleEventRedirect = () => {
    navigate('/event'); // Navigate to the event page
  };

  // Mock data for events - replace with actual API calls in production
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Tech Symposium",
      description: "Join us for a day of innovation and technological advancements featuring keynote speakers from leading tech companies.",
      date: "May 10, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      image: "/api/placeholder/800/400",
      isOngoing: true
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with potential employers from various industries and explore internship and job opportunities.",
      date: "May 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Cultural Festival",
      description: "Celebrate diversity with performances, food, and activities representing cultures from around the world.",
      date: "May 20, 2025",
      time: "12:00 PM - 8:00 PM",
      location: "Campus Quad",
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "Research Symposium",
      description: "Undergraduate and graduate students present their latest research findings across all disciplines.",
      date: "May 25, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Science Building",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Alumni Networking Night",
      description: "Connect with successful alumni and build your professional network in a relaxed setting.",
      date: "June 1, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "University Club",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with potential employers from various industries and explore internship and job opportunities.",
      date: "May 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with potential employers from various industries and explore internship and job opportunities.",
      date: "May 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with potential employers from various industries and explore internship and job opportunities.",
      date: "May 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with potential employers from various industries and explore internship and job opportunities.",
      date: "May 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      image: "/api/placeholder/400/300"
    },
  ]);

  // Get ongoing event
  const ongoingEvent = events.find(event => event.isOngoing);
  const upcomingEvents = events.filter(event => !event.isOngoing);

  // Carousel functionality
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  
  // Function to handle manual scroll with buttons
  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    // Stop auto-scrolling when manual control is used
    setIsAutoScrolling(false);
    
    const container = scrollContainerRef.current;
    const scrollAmount = 320; // Approximate card width + margin
    
    // Calculate new scroll position
    const newPosition = direction === 'left' 
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);
    
    // Apply smooth scroll
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    // Update current position for tracking
    setCurrentScrollPosition(newPosition);
  };
  
  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !isAutoScrolling) return;
    
    let animationFrameId;
    let scrollPosition = currentScrollPosition;
    const scrollSpeed = 1; // Reduced speed for better UX
    
    const scrollCarousel = () => {
      if (!isAutoScrolling) return;
      
      // Calculate max scroll width (content width - visible width)
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Only continue if we have content to scroll
      if (maxScroll <= 0) {
        cancelAnimationFrame(animationFrameId);
        return;
      }
      
      // Increment scroll position
      scrollPosition += scrollSpeed;
      
      // Reset when reaching the end
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      // Apply scroll position
      scrollContainer.scrollLeft = scrollPosition;
      setCurrentScrollPosition(scrollPosition);
      
      // Continue animation
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };
    
    // Start scrolling animation
    animationFrameId = requestAnimationFrame(scrollCarousel);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoScrolling, currentScrollPosition]);
  
  // Pause/resume auto-scrolling when user interacts
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const handleMouseEnter = () => setIsAutoScrolling(false);
    const handleMouseLeave = () => setIsAutoScrolling(true);
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up event listeners
    return () => {
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1>Campus Events</h1>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#" className={styles.active}>Home</a></li>
          <li><a href="#" onClick={handleEventRedirect}>Events</a></li>
          <li><a href="#">Calendar</a></li>
          <li><a href="#">Registered</a></li>
          <li><a href="#" onClick={handleAboutRedirect}>About</a></li>
          <li><a href="#" onClick={handleContactScroll}>Contact</a></li>

        </ul>
        <div className={styles.authButtons}>
          <button className={styles.loginBtn} onClick={handleLoginRedirect}>Login</button>
          <button className={styles.signupBtn} onClick={handleSignupRedirect}>Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Featured Ongoing Event */}
        {ongoingEvent && (
          <section className={styles.ongoingEventSection}>
            <h2 className={styles.sectionTitle}>Happening Now</h2>
            <div className={styles.ongoingEvent}>
              <div className={styles.eventImage}>
                <img src={ongoingEvent.image} alt={ongoingEvent.title} />
                <div className={styles.liveTag}>LIVE</div>
              </div>
              <div className={styles.eventInfo}>
                <h3>{ongoingEvent.title}</h3>
                <p className={styles.eventDescription}>{ongoingEvent.description}</p>
                <div className={styles.eventDetails}>
                  <p><strong>Date:</strong> {ongoingEvent.date}</p>
                  <p><strong>Time:</strong> {ongoingEvent.time}</p>
                  <p><strong>Location:</strong> {ongoingEvent.location}</p>
                </div>
                <button className={styles.joinBtn}>Join Now</button>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events Section with Carousel */}
        <section className={styles.upcomingEventsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <div className={styles.viewAllLink}>
              <a href="#">View All</a>
            </div>
          </div>
          
          <div className={styles.carouselContainer}>
            <div 
              ref={scrollContainerRef}
              className={styles.upcomingEventsContainer}
            >
              {upcomingEvents.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.cardImage}>
                    <img src={event.image} alt={event.title} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{event.title}</h3>
                    <p className={styles.eventDate}>{event.date} • {event.time}</p>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <button className={styles.detailsBtn}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Controls */}
            <div className={styles.carouselControls}>
              <button 
                className={styles.carouselButton}
                onClick={() => handleScroll('left')}
                aria-label="Previous events"
              >
                &lt;
              </button>
              <button 
                className={styles.carouselButton}
                onClick={() => handleScroll('right')}
                aria-label="Next events"
              >
                &gt;
              </button>
            </div>
          </div>
          
          {/* Carousel dots indicator */}
          <div className={styles.carouselDots}>
            {[...Array(Math.ceil(upcomingEvents.length / 5))].map((_, index) => (
              <span 
                key={index} 
                className={`${styles.dot} ${index === Math.floor(currentScrollPosition / (320 * 3)) ? styles.activeDot : ''}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const newPosition = index * 320 * 5;
                    scrollContainerRef.current.scrollTo({
                      left: newPosition,
                      behavior: 'smooth'
                    });
                    setCurrentScrollPosition(newPosition);
                    setIsAutoScrolling(false);
                  }
                }}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
            <footer className={styles.footer} ref={footerRef}>
              <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                  <h3>Campus Events</h3>
                  <p>Your one-stop platform for all campus activities and events.</p>
                  <div className={styles.socialIcons}>
                    <a href="#" aria-label="Facebook"><img src="/facebook.svg" alt=""/></a>
                    <a href="#" aria-label="Twitter"><img src="/twitter2.svg" alt="" /></a>
                    <a href="#" aria-label="Instagram"><img src="/insta.svg" alt="" /></a>
                    <a href="#" aria-label="LinkedIn"><img src="/linkedin.svg" alt="" /></a>
                  </div>
                </div>
                <div className={styles.footerSection}>
                  <h3>Quick Links</h3>
                  <ul>
                    <li><a href="#">Events Calendar</a></li>
                    <li><a href="#">Student Organizations</a></li>
                    <li><a href="#">Submit an Event</a></li>
                    <li>
                      <a href="https://www.google.com/maps/place/RNS+INSTITUTE+OF+TECHNOLOGY/@12.9021197,77.5183721,19.86z/data=!4m14!1m7!3m6!1s0x3bae3fa7243af9c3:0x9bed6669a38d1c3!2sRNS+INSTITUTE+OF+TECHNOLOGY!8m2!3d12.9021902!4d77.518582!16s%2Fm%2F07kddf8!3m5!1s0x3bae3fa7243af9c3:0x9bed6669a38d1c3!8m2!3d12.9021902!4d77.518582!16s%2Fm%2F07kddf8?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                        Campus Map
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={styles.footerSection}>
                  <h3>Contact Us</h3>
                  <p>RNS Institute Of Technology</p>
                  <p>Channasandra, Banglore-98</p>
                  <p><a href="mailto:forprojectdbonly@gmail.com">forprojectdbonly@gmail.com</a></p>
                  <p>(+91) 8394-3480-38</p>
                </div>
                <div className={styles.footerSection}>
                  <h3>Newsletter</h3>
                  <p>Subscribe to get updates on upcoming events</p>
                  <div className={styles.newsletterForm}>
                    <input type="email" placeholder="Your email" aria-label="Email for newsletter" />
                    <button>Subscribe</button>
                  </div>
                </div>
              </div>
              <div className={styles.copyright}>
                <p>&copy; 2025 Campus Events. All rights reserved.</p>
              </div>
            </footer>
    </div>
  );
};

export default HomePage;