import React, { useState, useEffect } from "react";
import styles from "./StudentPortal.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: "",
    usn: "",
    email: "",
    image: "", // Placeholder image
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
          axios
            .get("http://localhost:5000/api/auth/Student/current", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              if (!res) {
                console.error("Error fetching student details:", res);
                return;
              }
              // console.log('This is the value of result from the axios request : ',res)
              const Info = res.data;
              setStudent((prevState) => ({
                ...prevState,
                name: Info.studentInfo.name || prevState.name,
                email: Info.email || prevState.email,
                usn: Info.studentInfo.usn || prevState.usn,
                image: Info.image || prevState.photo,
              }));
              console.log('This is the value of student image : ',res.data.image)
            })
            .catch((err) => {
              console.log("Api failed to fetch data : ", err);
            });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("userAuth");
    if (!token) {
      console.log("Counldn't get token");
    }
    try {
      axios
        .get("http://localhost:5000/api/auth/Student/my-events", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log("This is the value of result : ", res.data);
          setTimeout(() => {
            setRegisteredEvents(res.data);
            setLoading(false);
          }, 500);
        })
        .catch((err) => {
          console.log("This is the error from the get request : ", err);
        });

      // Simulate API delay
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
    setRegisteredEvents(
      registeredEvents.filter((event) => event.event.id !== eventId)
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.dashboardContent}>
        <section className={styles.profileSection}>
          <h2>My Profile</h2>

          <div className={styles.profileCard}>
            <div className={styles.profilePhoto}>
              <img src={student.image} alt="Student" />
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

              {/* <button className={styles.editProfileBtn}>Edit Profile</button> */}
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
              <a href="/event" className={styles.browseEventsBtn}>
                Browse Events
              </a>
            </div>
          ) : (
            <div className={styles.eventsGrid}>
              {registeredEvents.map((event) => (
                <div key={event.event.id} className={styles.eventCard}>
                  <div className={styles.cardImage}>
                    <img src={event.event.image} alt={event.event.title} />
                  </div>

                  <div className={styles.cardContent}>
                    <h3>{event.event.eventName}</h3>
                    <p className={styles.eventDate}>{event.event.date}</p>
                    {/* <p className={styles.eventTime}>{event.event.time}</p> */}
                    <p className={styles.eventLocation}>{event.event.loca}</p>
                    <p className={styles.description}>{event.event.desc}</p>

                    <div className={styles.cardActions}>
                      <button
                        className={styles.detailsBtn}
                        onClick={() => handleViewDetails(event.event.id)}
                      >
                        View Details
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => handleCancelRegistration(event.event.id)}
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
