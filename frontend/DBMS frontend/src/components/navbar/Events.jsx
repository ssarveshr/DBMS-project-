import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Events.module.css';

const Events = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    
    // Mock data - in production, replace with actual API calls
    const mockEvents = [
      {
        id: "1", // Changed to string for URL parameter compatibility
        title: "Annual Tech Symposium",
        description: "Join us for a day of innovation and technological advancements featuring keynote speakers from leading tech companies. This event includes panel discussions, workshops, networking opportunities, and demonstrations of cutting-edge technologies. Students will have the chance to interact directly with industry professionals and showcase their own projects.",
        date: "May 10, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Main Auditorium",
        image: "/api/placeholder/800/400",
        organizer: "Computer Science Department",
        capacity: "300 attendees",
        type: "academic",
        registrationDeadline: "May 8, 2025",
        registrationFee: "Free for students, ₹500 for others",
        contactPerson: "Dr. Priya Sharma",
        contactEmail: "priya.sharma@rnsit.edu",
        agenda: [
          { time: "10:00 AM - 10:30 AM", activity: "Registration & Welcome Coffee" },
          { time: "10:30 AM - 11:30 AM", activity: "Keynote: The Future of AI in Education" },
          { time: "11:45 AM - 12:45 PM", activity: "Panel Discussion: Industry 4.0" },
          { time: "12:45 PM - 1:45 PM", activity: "Lunch Break" },
          { time: "1:45 PM - 3:00 PM", activity: "Workshops (Multiple Tracks)" },
          { time: "3:15 PM - 4:00 PM", activity: "Student Project Showcase & Awards" }
        ],
        isOngoing: true
      },
      {
        id: "2",
        title: "Cultural Fest: Rhythm 2025",
        description: "Experience the vibrant cultural diversity with performances, competitions, and exhibitions showcasing talents from across the country. This two-day extravaganza will feature music concerts, dance performances, fashion shows, and much more.",
        date: "May 20-21, 2025",
        time: "9:00 AM - 9:00 PM",
        location: "Campus Central Ground",
        image: "/api/placeholder/800/400",
        organizer: "Student Cultural Committee",
        capacity: "1000+ attendees",
        type: "cultural",
        registrationDeadline: "May 15, 2025",
        registrationFee: "₹200 for students, ₹500 for others",
        contactPerson: "Rahul Mehta",
        contactEmail: "culturalcommittee@rnsit.edu",
        agenda: [
          { time: "Day 1 - 9:00 AM", activity: "Inauguration Ceremony" },
          { time: "Day 1 - 10:30 AM", activity: "Inter-College Dance Competition" },
          { time: "Day 1 - 2:00 PM", activity: "Battle of Bands" },
          { time: "Day 1 - 6:00 PM", activity: "Celebrity Performance" },
          { time: "Day 2 - 10:00 AM", activity: "Art Exhibition" },
          { time: "Day 2 - 1:00 PM", activity: "Fashion Show" },
          { time: "Day 2 - 5:00 PM", activity: "DJ Night & Closing Ceremony" }
        ],
        isOngoing: false
      },
      {
        id: "3",
        title: "Career Fair 2025",
        description: "Connect with top employers from various industries and explore internship and job opportunities. The fair will include resume workshops, mock interviews, and networking sessions to help students prepare for their professional careers.",
        date: "June 5, 2025",
        time: "10:00 AM - 5:00 PM",
        location: "Engineering Block",
        image: "/api/placeholder/800/400",
        organizer: "Placement Department",
        capacity: "500 attendees",
        type: "career",
        registrationDeadline: "June 1, 2025",
        registrationFee: "Free",
        contactPerson: "Prof. Amit Kumar",
        contactEmail: "placements@rnsit.edu",
        agenda: [
          { time: "10:00 AM - 11:00 AM", activity: "Opening Remarks & Orientation" },
          { time: "11:00 AM - 1:00 PM", activity: "Company Booths - Session 1" },
          { time: "1:00 PM - 2:00 PM", activity: "Lunch Break" },
          { time: "2:00 PM - 4:00 PM", activity: "Company Booths - Session 2" },
          { time: "4:00 PM - 5:00 PM", activity: "Networking Session" }
        ],
        isOngoing: false
      },
      {
        id: "4",
        title: "Hackathon: Code For Change",
        description: "A 24-hour coding marathon to develop solutions for real-world problems. Teams will compete to create innovative applications that address social challenges, with prizes for the best solutions.",
        date: "May 25-26, 2025",
        time: "Starts at 10:00 AM",
        location: "Computer Labs 1-4",
        image: "/api/placeholder/800/400",
        organizer: "IEEE Student Chapter",
        capacity: "200 participants (50 teams)",
        type: "academic",
        registrationDeadline: "May 20, 2025",
        registrationFee: "₹300 per team",
        contactPerson: "Ankit Singh",
        contactEmail: "ieee@rnsit.edu",
        agenda: [
          { time: "Day 1 - 9:00 AM", activity: "Registration & Team Check-in" },
          { time: "Day 1 - 10:00 AM", activity: "Problem Statement Announcement" },
          { time: "Day 1 - 11:00 AM", activity: "Hacking Begins" },
          { time: "Day 1 - 8:00 PM", activity: "Mentor Sessions" },
          { time: "Day 2 - 10:00 AM", activity: "Hacking Ends & Submission" },
          { time: "Day 2 - 11:00 AM", activity: "Presentations & Judging" },
          { time: "Day 2 - 3:00 PM", activity: "Awards Ceremony" }
        ],
        isOngoing: false
      },
      {
        id: "5",
        title: "Sports Tournament: Champions Cup",
        description: "A multi-sport tournament featuring cricket, football, basketball, and volleyball competitions between departments. Come support your department's team and witness thrilling matches!",
        date: "June 10-15, 2025",
        time: "9:00 AM - 6:00 PM",
        location: "Campus Sports Complex",
        image: "/api/placeholder/800/400",
        organizer: "Physical Education Department",
        capacity: "Teams from all departments",
        type: "sports",
        registrationDeadline: "June 5, 2025",
        registrationFee: "₹500 per team",
        contactPerson: "Coach Rajesh Kumar",
        contactEmail: "sports@rnsit.edu",
        agenda: [
          { time: "June 10", activity: "Cricket Matches" },
          { time: "June 11", activity: "Football Matches" },
          { time: "June 12", activity: "Basketball Matches" },
          { time: "June 13", activity: "Volleyball Matches" },
          { time: "June 14", activity: "Semi-Finals (All Sports)" },
          { time: "June 15", activity: "Finals & Award Ceremony" }
        ],
        isOngoing: false
      }
    ];

    // Set all events for the "All Events" section
    setAllEvents(mockEvents);

    // If eventId is provided, find the specific event
    if (eventId) {
      const foundEvent = mockEvents.find(e => e.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // Redirect to the events page if event not found
        navigate('/events');
      }
    } else {
      // Reset the event state when viewing all events
      setEvent(null);
    }

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [eventId, navigate]);

  // Function to handle registration
  const handleRegister = () => {
    // Registration logic here
    alert(`Registered for "${event.title}" successfully!`);
  };

  const handleAddToCalendar = () => {
    // Calendar logic here
    alert(`${event.title} added to your calendar!`);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Event link copied to clipboard!');
  };

  // Filter events based on search term and type
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  // If loading, show loader
  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
        <p className="loaderText">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbarContent">
          <div className="logo">
            <Link to="/">Campus Events</Link>
          </div>
          <div className="navLinks">
            <Link to="/">Home</Link>
            <Link to="/events" className="active">Events</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/registered">Registered</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="authButtons">
            <button className="loginBtn">Login</button>
            <button className="signupBtn">Sign Up</button>
          </div>
          <div className="mobileMenuBtn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <main className="main">
        {event ? (
          // Single Event Details View
          <div className="eventDetails">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumbSeparator">›</span>
              <Link to="/events">Events</Link>
              <span className="breadcrumbSeparator">›</span>
              <span>{event.title}</span>
            </div>
            
            {/* Event Header */}
            <div className="eventHeader">
              <h1>{event.title}</h1>
              {event.isOngoing && (
                <span className="liveTag">LIVE NOW</span>
              )}
            </div>
            
            {/* Event Content */}
            <div className="eventContent">
              {/* Left Column - Image */}
              <div className="eventImageContainer">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="eventImage"
                />
              </div>
              
              {/* Right Column - Event Info */}
              <div className="eventInfo">
                <div className="eventInfoGrid">
                  <div className="infoItem">
                    <div className="infoIcon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </div>
                    <div>
                      <h4>Date & Time</h4>
                      <p>{event.date}<br />{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="infoItem">
                    <div className="infoIcon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </div>
                    <div>
                      <h4>Location</h4>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="infoItem">
                    <div className="infoIcon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </div>
                    <div>
                      <h4>Organizer</h4>
                      <p>{event.organizer}</p>
                    </div>
                  </div>
                  
                  <div className="infoItem">
                    <div className="infoIcon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </div>
                    <div>
                      <h4>Registration Fee</h4>
                      <p>{event.registrationFee}</p>
                    </div>
                  </div>
                </div>
                
                <div className="registrationInfo">
                  <p>
                    <span>Registration deadline:</span> {event.registrationDeadline}
                  </p>
                  <div className="actionButtons">
                    <button 
                      onClick={handleRegister}
                      className="registerBtn"
                    >
                      Register Now
                    </button>
                    <button 
                      onClick={handleAddToCalendar}
                      className="calendarBtn"
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Description */}
            <div className="eventDescription">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </div>
            
            {/* Event Schedule */}
            <div className="eventSchedule">
              <h2>Event Schedule</h2>
              <div className="timeline">
                {event.agenda.map((item, index) => (
                  <div key={index} className="timelineItem">
                    <div className="timelineMarker"></div>
                    <div className="timelineContent">
                      <div className="timelineTime">{item.time}</div>
                      <div className="timelineActivity">{item.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="contactInfo">
              <h2>Contact Information</h2>
              <div className="contactDetails">
                <p>
                  <span>Contact Person:</span> {event.contactPerson}
                </p>
                <p>
                  <span>Email:</span>
                  <a href={`mailto:${event.contactEmail}`}>
                    {event.contactEmail}
                  </a>
                </p>
              </div>
            </div>
            
            {/* Share Section */}
            <div className="shareSection">
              <h2>Share This Event</h2>
              <div className="shareButtons">
                <button className="shareBtn facebook">
                  Facebook
                </button>
                <button className="shareBtn twitter">
                  Twitter
                </button>
                <button className="shareBtn linkedin">
                  LinkedIn
                </button>
                <button 
                  onClick={handleShareLink} 
                  className="shareBtn copyLink"
                >
                  Copy Link
                </button>
              </div>
            </div>
            
            {/* Similar Events */}
            <div className="similarEvents">
              <h2>Similar Events You Might Like</h2>
              <div className="similarEventsGrid">
                {allEvents
                  .filter(e => e.id !== event.id && e.type === event.type)
                  .slice(0, 3)
                  .map((similarEvent) => (
                    <div key={similarEvent.id} className="eventCard">
                      <img 
                        src={similarEvent.image} 
                        alt={similarEvent.title} 
                        className="cardImage"
                      />
                      <div className="cardContent">
                        <h3>{similarEvent.title}</h3>
                        <div className="cardDetails">
                          <p>{similarEvent.date}</p>
                          <p>{similarEvent.location}</p>
                        </div>
                        <Link 
                          to={`/events/${similarEvent.id}`} 
                          className="viewDetailsBtn"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          // All Events View (when no specific event ID is provided)
          <div className="eventsListContainer">
            <div className="eventsHeader">
              <h1>Campus Events</h1>
              <div className="filterControls">
                <select 
                  className="filterSelect"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Event Types</option>
                  <option value="academic">Academic</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="career">Career</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="searchInput"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="eventsList">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div key={event.id} className="eventListItem">
                    <div className="eventImageWrapper">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="eventListImage"
                      />
                      {event.isOngoing && (
                        <div className="liveIndicator">
                          LIVE
                        </div>
                      )}
                    </div>
                    <div className="eventListContent">
                      <h3>{event.title}</h3>
                      <div className="eventListDetails">
                        <div className="eventListDetail">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                          <span>{event.date}</span>
                        </div>
                        <div className="eventListDetail">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                          <span>{event.time}</span>
                        </div>
                        <div className="eventListDetail">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="eventListDescription">
                        {event.description.substring(0, 160)}...
                      </p>
                      <Link 
                        to={`/events/${event.id}`} 
                        className="eventListBtn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="noEvents">
                  <p>No events found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footerContent">
          <div className="footerSection">
            <h3>Campus Events</h3>
            <p>Your one-stop platform for all campus activities and events.</p>
            <div className="socialIcons">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">LI</a>
            </div>
          </div>
          <div className="footerSection">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Events Calendar</a></li>
              <li><a href="#">Student Organizations</a></li>
              <li><a href="#">Submit an Event</a></li>
              <li><a href="#">Campus Map</a></li>
            </ul>
          </div>
          <div className="footerSection">
            <h3>Contact Us</h3>
            <p>RNS Institute Of Technology</p>
            <p>Channasandra, Banglore-98</p>
            <p><a href="mailto:forprojectdbonly@gmail.com">forprojectdbonly@gmail.com</a></p>
            <p>(+91) 8394-3480-38</p>
          </div>
          <div className="footerSection">
            <h3>Newsletter</h3>
            <p>Subscribe to get updates on upcoming events</p>
            <div className="newsletterForm">
              <input type="email" placeholder="Your email" aria-label="Email for newsletter" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 Campus Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Events;