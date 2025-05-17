import React, { useState } from "react";
import styles from "./RegisterEvent.module.css";

const RegisterEvent = () => {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [eventName, setEventName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name,
      usn,
      branch,
      semester,
      eventName,
    };

    console.log("Form Data:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setUsn("");
      setBranch("");
      setSemester("");
      setEventName("");
    }, 1000);
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Register for Event</h1>
        <p>Fill in your details to participate in the event</p>
      </header>

      <section className={styles.registrationSection}>
        <h2>Event Registration Form</h2>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="usn">Student USN</label>
            <input
              type="text"
              id="usn"
              name="usn"
              placeholder="Enter your USN"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              placeholder="Enter your branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="semester">Semester</label>
            <input
              type="number"
              id="semester"
              name="semester"
              placeholder="Enter your semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterEvent;
