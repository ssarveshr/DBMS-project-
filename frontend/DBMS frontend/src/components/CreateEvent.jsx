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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Details:", eventDetails);
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
          <div className={styles.formGroup}>
            <label htmlFor="date">Faculty Allo</label>
            <input
              type="text"
              id="date"
              name="date"
              placeholder="Event Date"
              value={eventDetails.date}
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

