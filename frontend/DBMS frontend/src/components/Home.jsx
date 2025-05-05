import React, { useState, useEffect, useRef } from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
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
    }
  ]);

  // Get ongoing event
  const ongoingEvent = events.find(event => event.isOngoing);
  const upcomingEvents = events.filter(event => !event.isOngoing);

  // Auto-scroll functionality for upcoming events
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 1.5; // Adjust speed as needed
    
    const scrollCarousel = () => {
      if (!isScrolling) return;
      
      // Calculate max scroll width (content width - visible width)
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Increment scroll position
      scrollPosition += scrollSpeed;
      
      // Reset when reaching the end
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      // Apply scroll position
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      
      // Continue animation
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };
    
    // Start scrolling animation
    animationFrameId = requestAnimationFrame(scrollCarousel);
    
    // Pause scrolling when user interacts
    const handleMouseEnter = () => setIsScrolling(false);
    const handleMouseLeave = () => setIsScrolling(true);
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isScrolling]);

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

        {/* Upcoming Events Section with Manual Navigation Controls */}
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
            <div className={styles.carouselControls}>
              <button 
                className={styles.carouselButton}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft -= 320;
                  }
                }}
              >
                &lt;
              </button>
              <button 
                className={styles.carouselButton}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft += 320;
                  }
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Campus Events</h3>
            <p>Your one-stop platform for all campus activities and events.</p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Events Calendar</a></li>
              <li><a href="#">Student Organizations</a></li>
              <li><a href="#">Submit an Event</a></li>
              <li><a href="#">Campus Map</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Contact Us</h3>
            <p>123 University Ave</p>
            <p>Campus City, State 12345</p>
            <p>info@campusevents.edu</p>
            <p>(123) 456-7890</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Newsletter</h3>
            <p>Subscribe to get updates on upcoming events</p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Your email" />
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