import React, { useState, useEffect } from "react";
import styles from "./StudentPortal.module.css";
import styles1 from "../CreateEvent.module.css";
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

  // New states for profile photo editing
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

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
              console.log(
                "This is the value of student image : ",
                res.data.image
              );
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

  const handleCancelRegistration = async (eventId) => {
  const token = sessionStorage.getItem("userAuth");
  if (!token) {
    console.error("User is not authenticated.");
    return;
  }

  try {
    await axios.delete(`http://localhost:5000/api/auth/Student/cancel-registration/${eventId}`, {
      headers: {
        Authorization: token,
      },
    });

    // Remove event from UI
    setRegisteredEvents(
      registeredEvents.filter((event) => event.event.id !== eventId)
    );
  } catch (error) {
    console.error("Error cancelling registration:", error);
  }
};


  // --- Profile Photo Edit Logic ---
  const handleEditPhotoClick = () => {
    setIsEditingPhoto(true);
    setUploadError("");
    setUploadSuccess(false);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadError("");
    setUploadSuccess(false);
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please select an image file.");
      return;
    }
    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    const token = sessionStorage.getItem("userAuth");
    if (!token) {
      setUploadError("You are not logged in!");
      setUploading(false);
      return;
    }

    try {
      // 1. Upload image to /upload endpoint
      const formData = new FormData();
      formData.append("image", selectedFile);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = uploadRes.data.url;

      // 2. Update student profile with new image URL
      // await axios.put(
      //   "http://localhost:5000/api/auth/Student/update-photo",
      //   { image: imageUrl },
      //   {
      //     headers: {
      //       Authorization: token,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // // 3. Update UI
      // setStudent((prev) => ({
      //   ...prev,
      //   image: imageUrl,
      // }));
      setUploadSuccess(true);
      setIsEditingPhoto(false);
      setSelectedFile(null);
    } catch (err) {
      setUploadError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };
  // --- End Profile Photo Edit Logic ---

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.dashboardContent}>
        <section className={styles.profileSection}>
          <h2>My Profile</h2>

          <div className={styles.profileCard}>
            <div className={styles.profilePhoto}>
              <img src={student.image} alt="Student" />
              <button
                className={styles.editPhotoBtn}
                onClick={handleEditPhotoClick}
                disabled={uploading}
              >
                Edit Photo
              </button>
              {isEditingPhoto && (
                <form
                  className={styles.formGroup}
                  onSubmit={handlePhotoUpload}
                  style={{ marginTop: "1rem" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <button
                    type="submit"
                    className={styles.detailsBtn}
                    disabled={uploading}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {uploading ? "Uploading..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsEditingPhoto(false);
                      setSelectedFile(null);
                      setUploadError("");
                    }}
                    disabled={uploading}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Cancel
                  </button>
                  {uploadError && (
                    <div style={{ color: "red", marginTop: "0.5rem" }}>
                      {uploadError}
                    </div>
                  )}
                  {uploadSuccess && (
                    <div style={{ color: "green", marginTop: "0.5rem" }}>
                      Photo updated successfully!
                    </div>
                  )}
                </form>
              )}
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
