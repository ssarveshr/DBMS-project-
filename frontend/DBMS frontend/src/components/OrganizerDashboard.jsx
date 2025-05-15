import React from 'react';
import styles from './OrganizerDashboard.module.css';

import { Navigate, useNavigate, useParams } from "react-router-dom";
const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const handleAddEvent = () => {
  navigate("/createevent");
};
  // Sample data - replace with your actual data or state management
  const organizationInfo = {
    name: "Tech Conference Org",
    contact: "Jane Doe",
    email: "jane@techconf.org",
    phone: "+1 (555) 123-4567"
  };

  const eventDetails = {
    id: 1,
    title: "Annual Tech Symposium",
    description: "Join us for a day of innovation and technological advancements featuring keynote speakers from leading tech companies. The symposium will include interactive workshops, panel discussions, and networking opportunities. Participants will get to explore the latest trends in artificial intelligence, blockchain, cybersecurity, and more.",
    date: "May 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    isOngoing: true,
    organizer: "Computer Science Department",
    contact: "techsymposium@campus.edu"
  };

  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Keynote Speaker - AI Ethics",
      contact: "sarah@university.edu",
      sessions: "Day 1: 10:00 AM - 11:30 AM"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Workshop Leader - Cloud Computing",
      contact: "michael@techinstitute.com",
      sessions: "Day 2: 2:00 PM - 4:00 PM"
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Event Organizer Dashboard</h1>
        <div className={styles.orgInfo}>
          <h2>{organizationInfo.name}</h2>
          <p>Contact: {organizationInfo.contact} | {organizationInfo.email} | {organizationInfo.phone}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Event Details Section */}
        <section className={styles.eventSection}>
          <h2>Current Event</h2>
          <div className={styles.eventCard}>
            <h3>{eventDetails.title}</h3>
            <p><strong>Date:</strong> {eventDetails.date}</p>
            <p><strong>Time:</strong> {eventDetails.time}</p>
            <p><strong>Description:</strong> {eventDetails.description}</p>
            <div className={styles.contact}>
              <h4>Contact</h4>
              <p>{eventDetails.contact}</p>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className={styles.facultySection}>
          <div className={styles.sectionHeader}>
            <h2>Faculty Assigned</h2>
            <button className={styles.addButton} onClick={handleAddEvent}>+ Add Event</button>
          </div>
          <div className={styles.facultyGrid}>
            {facultyMembers.map(faculty => (
              <div key={faculty.id} className={styles.facultyCard}>
                <div className={styles.facultyAvatar}>{faculty.name.charAt(0)}</div>
                <h3>{faculty.name}</h3>
                <p><strong>Role:</strong> {faculty.role}</p>
                <p><strong>Contact:</strong> {faculty.contact}</p>
                <p><strong>Sessions:</strong> {faculty.sessions}</p>
                <div className={styles.facultyActions}>
                  <button className={styles.actionButton}>Edit</button>
                  <button className={styles.actionButton}>Message</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
