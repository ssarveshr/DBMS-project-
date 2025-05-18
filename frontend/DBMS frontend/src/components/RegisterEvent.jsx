import React, { useState } from "react";
import styles from "./RegisterEvent.module.css";

const RegisterEvent = () => {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [eventName, setEventName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Branch options
  const branchOptions = [
    "Computer Science and Engineering",
    "Information Science and Engineering",
    "Electronics and Communication",
    "Electrical and Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Aerospace Engineering",
    "Biotechnology"
  ];

  const handleEventSearch = (e) => {
    const value = e.target.value;
    setEventName(value);
    
/*     if (value.trim() !== "") {
      const filtered = availableEvents.filter(event => 
        event.toLowerCase().includes(value.toLowerCase())
      );
      setEventSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setEventSuggestions([]);
      setShowSuggestions(false);
    } */
  };

  const selectEvent = (event) => {
    setEventName(event);
    setShowSuggestions(false);
  };

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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Registration successful!");
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
        <div className={styles.formCard}>
          <h2>Event Registration Form</h2>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Student Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="usn">Student USN</label>
              <input
                type="text"
                id="usn"
                name="usn"
                placeholder="Enter your USN (e.g., 1XX21XXYYY)"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="branch">Branch</label>
                <select
                  id="branch"
                  name="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                  className={styles.formSelect}
                >
                  <option value="">Select your branch</option>
                  {branchOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="semester">Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                  className={styles.formSelect}
                >
                  <option value="">Select semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="eventName">Event Name</label>
              <div className={styles.suggestionContainer}>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  placeholder="Search for events"
                  value={eventName}
                  onChange={handleEventSearch}
                  onFocus={() => eventName.trim() !== "" && setShowSuggestions(true)}
                  required
                  className={styles.formInput}
                />
                {showSuggestions && eventSuggestions.length > 0 && (
                  <ul className={styles.suggestionsList}>
                    {eventSuggestions.map((event, index) => (
                      <li 
                        key={index} 
                        onClick={() => selectEvent(event)}
                        className={styles.suggestionItem}
                      >
                        {event}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterEvent;