import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FacultyDashboard.module.css";

const FacultyDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("userAuth");

    axios
      .get("http://localhost:5000/api/auth/Faculty/", {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.length) setEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = (event) => {
    const token = sessionStorage.getItem("userAuth");
    axios
      .put(
        "http://localhost:5000/api/auth/Faculty/approve-event",
        {
          organiserName: event.organiserName,
          title: event.title,
          facultyName: event.facultyName,
        },
        { headers: { Authorization: token } }
      )
      .then(() => {
        setEvents((prev) => prev.filter((e) => e._id !== event._id));
      });
  };

  const handleDeny = (event) => {
    const token = sessionStorage.getItem("userAuth");
    axios
      .delete("http://localhost:5000/api/auth/Faculty/deny-event", {
        headers: { Authorization: token },
        data: {
          organiserName: event.organiserName,
          title: event.title,
          facultyName: event.facultyName,
        },
      })
      .then(() => {
        setEvents((prev) => prev.filter((e) => e._id !== event._id));
      });
  };

  return (
    <div className={styles.dashboardContainer}>
      {events.length === 0 ? (
        <div className={styles.noEvents}>No pending events to approve.</div>
      ) : (
        events.map((event) => (
          <div key={event._id} className={styles.card}>
            <div>
              <h2>{event.title}</h2>
              <p><strong>Organizer:</strong> {event.organiserName}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.approveButton} onClick={() => handleApprove(event)}>Approve</button>
              <button className={styles.denyButton} onClick={() => handleDeny(event)}>Deny</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FacultyDashboard;
