import React, { useState } from 'react';
import styles from './CreateEvent.module.css';
import axios from 'axios';

const CreateEvent = () => {
  // Event data state
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    location: {
      venue: '',
      address: '',
    },
    description: '',
  });

  // Task data state
  const [tasks, setTasks] = useState([
    "Finalize catering order",
    "Send speaker reminders",
    "Print event materials"
  ]);

  // Handle input change for event data
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
    if (name in eventDetails) {
      setEventDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle venue change
  const handleVenueChange = (e) => {
    const { value } = e.target;
    console.log(`Venue: ${value}`);
    setEventDetails((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        venue: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = sessionStorage.getItem("userAuth");
  if (!token) {
    alert("You are not logged in!");
    return;
  }

  const payload = {
    Orgname: "OrganizerNameHere", // TODO: Replace with actual name or fetch from session
    title: eventDetails.title,
    loca: eventDetails.location,
    desc: eventDetails.description,
    faculty: "FacultyNameHere", // TODO: Replace with selected faculty name from dropdown or logic
    isOngoing: false // Initial state for approval
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/Organiser/create-events",
      payload,
      {
        headers: {
          Authorization: token
        }
      }
    );
    console.log("Event Created:", res.data);
    alert("Event created successfully!");
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    alert("Failed to create event");
  }
};


  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Create An Event</h1>
        <div className={styles.orgInfo}>
          <h2>Event Organization</h2>
          <p>Manage your event details and tasks</p>
        </div>
      </header>

      {/* Event Creation Section */}
      <section className={styles.eventCreationSection}>
        <h2>Create New Event</h2>
        <form className={styles.createEventForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Event Title"
              value={eventDetails.title}
              onChange={handleEventChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Event Date</label>
            <input
              type="text"
              id="date"
              name="date"
              placeholder="Event Date"
              value={eventDetails.date}
              onChange={handleEventChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="venue">Event Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              placeholder="Venue"
              value={eventDetails.location.venue}
              onChange={handleVenueChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              value={eventDetails.description}
              onChange={handleEventChange}
            />
          </div>
          <button type="submit" className={styles.createEventButton}>
            Create Event
          </button>
        </form>
      </section>

    </div>
  );
};

export default CreateEvent;

