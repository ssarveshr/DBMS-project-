import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Events.module.css';

const Events = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const footerRef = useRef(null);
  
  // Mock data for events - replace with actual API calls in production
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Tech Symposium",
      description: "Join us for a day of innovation and technological advancements featuring keynote speakers from leading tech companies. The symposium will include interactive workshops, panel discussions, and networking opportunities. Participants will get to explore the latest trends in artificial intelligence, blockchain, cybersecurity, and more. This is a great opportunity to learn from industry experts and connect with like-minded professionals.",
      date: "May 10, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      image: "/api/placeholder/800/400",
      isOngoing: true,
      organizer: "Computer Science Department",
      contact: "techsymposium@campus.edu"
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with potential employers from various industries and explore internship and job opportunities. Over 50 companies will be present at this event, representing fields including technology, finance, healthcare, and more. Bring your resume and be prepared for on-the-spot interviews. Professional attire is recommended. There will also be resume review sessions and interview preparation workshops throughout the day.",
      date: "May 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      image: "/api/placeholder/800/400",
      organizer: "Career Services",
      contact: "careers@campus.edu"
    },
    {
      id: 3,
      title: "Cultural Festival",
      description: "Celebrate diversity with performances, food, and activities representing cultures from around the world. This annual festival showcases traditional dances, music, art, and cuisine from over 30 different countries. Student organizations will host booths with interactive activities and educational displays. The event includes a main stage for performances throughout the day and a food court featuring international cuisine prepared by local restaurants and student groups.",
      date: "May 20, 2025",
      time: "12:00 PM - 8:00 PM",
      location: "Campus Quad",
      image: "/api/placeholder/800/400",
      organizer: "International Student Association",
      contact: "culturefest@campus.edu"
    },
    {
      id: 4,
      title: "Research Symposium",
      description: "Undergraduate and graduate students present their latest research findings across all disciplines. The symposium will feature oral presentations, poster sessions, and roundtable discussions covering topics from the humanities, social sciences, natural sciences, and engineering. This is an excellent opportunity to learn about cutting-edge research happening on campus and to practice your presentation skills in a supportive environment. Faculty members will serve as judges and provide valuable feedback.",
      date: "May 25, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Science Building",
      image: "/api/placeholder/800/400",
      organizer: "Office of Research",
      contact: "research@campus.edu"
    },
    {
      id: 5,
      title: "Alumni Networking Night",
      description: "Connect with successful alumni and build your professional network in a relaxed setting. Alumni from diverse career fields will be present to share their experiences and advice. This is a great opportunity for current students to learn about different career paths, make industry connections, and get insights into the job market. Light refreshments will be served, and there will be structured networking activities to help break the ice.",
      date: "June 1, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "University Club",
      image: "/api/placeholder/800/400",
      organizer: "Alumni Relations",
      contact: "alumni@campus.edu"
    },
    {
      id: 6,
      title: "Hackathon Challenge",
      description: "A 24-hour coding competition where students form teams to solve real-world problems through technology. Participants will have access to mentors from tech companies, workshops on emerging technologies, and plenty of food and drinks to keep energy levels up throughout the event. Prizes will be awarded for the most innovative solutions, best technical implementation, and best UI/UX design. All skill levels are welcome!",
      date: "June 5-6, 2025",
      time: "10:00 AM - 10:00 AM (next day)",
      location: "Engineering Building",
      image: "/api/placeholder/800/400",
      organizer: "Tech Club",
      contact: "hackathon@campus.edu"
    },
    {
      id: 7,
      title: "Environmental Sustainability Workshop",
      description: "Learn practical ways to reduce your ecological footprint and promote sustainability on campus. This interactive workshop will cover topics such as waste reduction, energy conservation, sustainable food choices, and campus initiatives you can get involved with. Participants will develop a personal sustainability plan and learn about opportunities to join environmental projects. The workshop will include hands-on activities and group discussions.",
      date: "June 12, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Green Sciences Hall",
      image: "/api/placeholder/800/400",
      organizer: "Sustainability Office",
      contact: "green@campus.edu"
    },
    {
      id: 8,
      title: "Leadership Conference",
      description: "Develop your leadership skills through workshops, keynote speeches, and team-building activities. The conference will focus on topics such as effective communication, conflict resolution, inclusive leadership, and project management. Participants will have the opportunity to network with student leaders from various organizations and learn from experienced professionals. A certificate of completion will be provided to all attendees.",
      date: "June 18, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Business School",
      image: "/api/placeholder/800/400",
      organizer: "Student Leadership Center",
      contact: "leadership@campus.edu"
    }
  ]);

  // Get selected event if eventId is provided
  const selectedEvent = eventId ? events.find(event => event.id === parseInt(eventId)) : null;
  
  const handleContactScroll = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleEventDetails = (id) => {
    navigate(`/event/${id}`);
  };
  
  const handleReturnToAllEvents = () => {
    navigate('/event');
  };

  // Redirect functions for navigation
  const handleHomeRedirect = () => {
    navigate('/');
  };
  
  const handleLoginRedirect = () => {
    navigate('/login');
  };
  
  const handleSignupRedirect = () => {
    navigate('/signup');
  };
  
  const handleAboutRedirect = () => {
    navigate('/about');
  };

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={handleHomeRedirect}>
          <h1>Campus Events</h1>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#" onClick={handleHomeRedirect}>Home</a></li>
          <li><a href="#" className={styles.active}>Events</a></li>
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
        {selectedEvent ? (
          /* Single Event Detail View */
          <section className={styles.eventDetailSection}>
            <div className={styles.eventDetailHeader}>
              <button className={styles.backButton} onClick={handleReturnToAllEvents}>
                &larr; Back to All Events
              </button>
              <h1>{selectedEvent.title}</h1>
            </div>
            
            <div className={styles.eventDetailContent}>
              <div className={styles.eventDetailImage}>
                <img src={selectedEvent.image} alt={selectedEvent.title} />
                {selectedEvent.isOngoing && <div className={styles.liveTag}>LIVE</div>}
              </div>
              
              <div className={styles.eventDetailInfo}>
                <div className={styles.detailCard}>
                  <h3>Event Details</h3>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Date:</span>
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Time:</span>
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Location:</span>
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Organizer:</span>
                    <span>{selectedEvent.organizer}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Contact:</span>
                    <span>{selectedEvent.contact}</span>
                  </div>
                </div>
                
                <div className={styles.registerCard}>
                  <button className={styles.registerBtn}>Register Now</button>
                  <button className={styles.saveBtn}>Save to Calendar</button>
                  <div className={styles.shareOptions}>
                    <span>Share: </span>
                    <div className={styles.socialIcons}>
                      <a href="#" aria-label="Share on Facebook">FB</a>
                      <a href="#" aria-label="Share on Twitter">TW</a>
                      <a href="#" aria-label="Share on LinkedIn">LI</a>
                      <a href="#" aria-label="Share via Email">@</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.eventDescription}>
                <h3>About This Event</h3>
                <p>{selectedEvent.description}</p>
              </div>
            </div>
          </section>
        ) : (
          /* All Events View */
          <section className={styles.allEventsSection}>
            <div className={styles.sectionHeader}>
              <h1>All Campus Events</h1>
              <div className={styles.eventFilters}>
                <select className={styles.filterDropdown} defaultValue="">
                  <option value="" disabled>Filter by Category</option>
                  <option value="all">All Categories</option>
                  <option value="academic">Academic</option>
                  <option value="cultural">Cultural</option>
                  <option value="career">Career</option>
                  <option value="sports">Sports</option>
                </select>
                <select className={styles.filterDropdown} defaultValue="">
                  <option value="" disabled>Sort by Date</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <div className={styles.searchBox}>
                  <input type="text" placeholder="Search events..." />
                  <button className={styles.searchBtn}>Search</button>
                </div>
              </div>
            </div>
            
            <div className={styles.eventsGrid}>
              {events.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.cardImage}>
                    <img src={event.image} alt={event.title} />
                    {event.isOngoing && <div className={styles.liveTag}>LIVE</div>}
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{event.title}</h3>
                    <p className={styles.eventDate}>{event.date}</p>
                    <p className={styles.eventTime}>{event.time}</p>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <p className={styles.eventBrief}>
                      {event.description.length > 120 
                        ? `${event.description.substring(0, 120)}...` 
                        : event.description}
                    </p>
                    <button 
                      className={styles.detailsBtn} 
                      onClick={() => handleEventDetails(event.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.pagination}>
              <button className={`${styles.pageBtn} ${styles.activePageBtn}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <button className={styles.pageBtn}>Next &rarr;</button>
            </div>
          </section>
        )}
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

export default Events;