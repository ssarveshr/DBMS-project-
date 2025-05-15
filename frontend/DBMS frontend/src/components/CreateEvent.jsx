

import React, { useState } from 'react';
import styles from './CreateEvent.module.css';

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
    if (name in eventDetails) {
      setEventDetails(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle adding a task
  const addTask = (task) => {
    setTasks([...tasks, task]);
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
        <form className={styles.createEventForm}>
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
              onChange={(e) => {
                setEventDetails(prevState => ({
                  ...prevState,
                  location: {
                    ...prevState.location,
                    venue: e.target.value,
                  }
                }));
              }}
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

