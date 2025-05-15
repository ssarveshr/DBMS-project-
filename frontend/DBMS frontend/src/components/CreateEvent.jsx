import React, { useState } from "react";
import styles from "./CreateEvent.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [loca, setloca] = useState("");
  const [desc, setdesc] = useState("");
  const [faculty, setFaculty] = useState("");
  const [Orgname, setOrgName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = sessionStorage.getItem("userAuth");
    if (!token) {
      toast.warning("You are not logged in!");
      setIsSubmitting(false);
      return;
    }

    const Data = {
      Orgname,
      title,
      loca,
      desc,
      faculty,
    };

    console.log("Data:", Data);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/Organiser/create-events",
        Data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res) {
        console.log("Event Created:", res.data);
        toast.success("Event created successfully!");

        // Reset form after successful submission
        setTitle("");
        setloca("");
        setdesc("");
        setFaculty("");
        setOrgName("");
      }
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message);
    } finally {
      setIsSubmitting(false);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="orgName">Organisation Name</label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              placeholder="Organisation Name"
              value={Orgname}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="loca">Event loca</label>
            <input
              type="text"
              id="loca"
              name="loca"
              placeholder="loca"
              value={loca}
              onChange={(e) => setloca(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="desc">Event desc</label>
            <textarea
              id="desc"
              name="desc"
              placeholder="Event desc"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="faculty">Faculty Co-ordinator</label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              placeholder="Faculty Co-ordinator"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.createEventButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateEvent;
