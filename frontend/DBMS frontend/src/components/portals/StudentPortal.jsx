import React, { useState, useEffect } from "react";
import styles from "./StudentPortal.module.css";
import { jwtDecode } from "jwt-decode";

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: "John Doe",
    usn: "1XX20CS123",
    email: "john.doe@example.com",
    photo: "/api/placeholder/150/150" // Placeholder image
  });
  
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user info from token
    const token = sessionStorage.getItem("userAuth");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.Role.toLowerCase() === "student") {
          // In a real app, you would fetch student details from an API
          // For now we're using placeholder data with the email from token
          setStudent(prevState => ({
            ...prevState,
            name: decoded.Name || prevState.name,
            email: decoded.Email || prevState.email,
            usn: decoded.USN || prevState.usn
          }));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Fetch registered events
    // In production, you would call your API with the student ID from the token
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch from an API endpoint like:
      // const response = await axios.get(`http://localhost:5000/api/students/${studentId}/events`);
      
      // Mock data for demonstration
      const mockEvents = [
        {
          _id: "1",
          title: "Tech Symposium 2025",
          date: "June 15, 2025",
          time: "10:00 AM - 4:00 PM",
          location: "Main Auditorium",
          image: "/api/placeholder/300/200",
          description: "Annual technology symposium featuring the latest advancements in computing and engineering.",
          organizer: "Computer Science Department"
        },
        {
          _id: "2",
          title: "Cultural Fest",
          date: "July 10, 2025",
          time: "5:30 PM - 9:00 PM",
          location: "Open Air Theater",
          image: "/api/placeholder/300/200",
          description: "A celebration of diverse cultures through music, dance, and art performances.",
          organizer: "Cultural Committee"
        },
        {
          _id: "3",
          title: "Career Fair 2025",
          date: "August 5, 2025",
          time: "9:00 AM - 2:00 PM",
          location: "Science Block",
          image: "/api/placeholder/300/200",
          description: "Connect with leading companies for internship and job opportunities.",
          organizer: "Placement Cell"
        },
        {
          _id: "3",
          title: "Career Fair 2025",
          date: "August 5, 2025",
          time: "9:00 AM - 2:00 PM",
          location: "Science Block",
          image: "/api/placeholder/300/200",
          description: "Connect with leading companies for internship and job opportunities.",
          organizer: "Placement Cell"
        }
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setRegisteredEvents(mockEvents);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Error fetching registered events:", error);
      setLoading(false);
    }
  };

  const handleViewDetails = (eventId) => {
    window.location.href = `/event/${eventId}`;
  };

  const handleCancelRegistration = (eventId) => {
    // In production, you would call an API to cancel registration
    console.log("Cancelling registration for event:", eventId);
    
    // For demo, just filter out the event
    setRegisteredEvents(registeredEvents.filter(event => event._id !== eventId));
  };

  return (
    <div className={styles.dashboardContainer}>
      
      <main className={styles.dashboardContent}>
        <section className={styles.profileSection}>
          <h2>My Profile</h2>
          
          <div className={styles.profileCard}>
            <div className={styles.profilePhoto}>
              <img src={student.photo} alt="Student" />
              <button className={styles.editPhotoBtn}>Edit Photo</button>
            </div>
            
            <div className={styles.profileDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Name</span>
                <span className={styles.detailValue}>{student.name}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>USN</span>
                <span className={styles.detailValue}>{student.usn}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{student.email}</span>
              </div>
              
              <button className={styles.editProfileBtn}>Edit Profile</button>
            </div>
          </div>
        </section>
        
        <section className={styles.eventsSection}>
          <h2>My Registered Events</h2>
          
          {loading ? (
            <div className={styles.loadingMessage}>Loading your events...</div>
          ) : registeredEvents.length === 0 ? (
            <div className={styles.noEventsMessage}>
              <p>You haven't registered for any events yet.</p>
              <a href="/event" className={styles.browseEventsBtn}>Browse Events</a>
            </div>
          ) : (
            <div className={styles.eventsGrid}>
              {registeredEvents.map((event) => (
                <div key={event._id} className={styles.eventCard}>
                  <div className={styles.cardImage}>
                    <img src={event.image} alt={event.title} />
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3>{event.title}</h3>
                    <p className={styles.eventDate}>{event.date}</p>
                    <p className={styles.eventTime}>{event.time}</p>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <p className={styles.eventBrief}>
                      {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description}
                    </p>
                    
                    <div className={styles.cardActions}>
                      <button 
                        className={styles.detailsBtn}
                        onClick={() => handleViewDetails(event._id)}
                      >
                        View Details
                      </button>
                      <button 
                        className={styles.cancelBtn}
                        onClick={() => handleCancelRegistration(event._id)}
                      >
                        Cancel Registration
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;