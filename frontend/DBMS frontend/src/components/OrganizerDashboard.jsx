// import React from 'react';
// import styles from './OrganizerDashboard.module.css';

// const OrganizerDashboard = () => {
//   // Sample data - replace with your actual data or state management
//   const organizationInfo = {
//     name: "Tech Conference Org",
//     contact: "Jane Doe",
//     email: "jane@techconf.org",
//     phone: "+1 (555) 123-4567"
//   };

//   const eventDetails = {
//     title: "Annual Tech Summit 2023",
//     date: "10/15/2023 - 10/17/2023",
//     location: {
//       venue: "Convention Center",
//       address: "123 Tech Blvd, San Francisco, CA 94107"
//     },
//     description: "Join us for the biggest technology conference of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders."
//   };

//   const facultyMembers = [
//     {
//       id: 1,
//       name: "Dr. Sarah Johnson",
//       role: "Keynote Speaker - AI Ethics",
//       contact: "sarah@university.edu",
//       sessions: "Day 1: 10:00 AM - 11:30 AM"
//     },
//     {
//       id: 2,
//       name: "Prof. Michael Chen",
//       role: "Workshop Leader - Cloud Computing",
//       contact: "michael@techinstitute.com",
//       sessions: "Day 2: 2:00 PM - 4:00 PM"
//     }
//   ];

//   const upcomingTasks = [
//     "Finalize catering order - Due 10/01/2023",
//     "Send speaker reminders - Due 10/05/2023",
//     "Print event materials - Due 10/10/2023"
//   ];

//   return (
//     <div className={styles.dashboardContainer}>
//       {/* Header Section */}
//       <header className={styles.header}>
//         <h1>Event Organizer Dashboard</h1>
//         <div className={styles.orgInfo}>
//           <h2>{organizationInfo.name}</h2>
//           <p>Contact: {organizationInfo.contact} | {organizationInfo.email} | {organizationInfo.phone}</p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         {/* Event Details Section */}
//         <section className={styles.eventSection}>
//           <h2>Current Event</h2>
//           <div className={styles.eventCard}>
//             <h3>{eventDetails.title}</h3>
//             <p><strong>Date:</strong> {eventDetails.date}</p>
//             <div className={styles.location}>
//               <h4>Location</h4>
//               <p><strong>Venue:</strong> {eventDetails.location.venue}</p>
//               <p><strong>Address:</strong> {eventDetails.location.address}</p>
//               <div className={styles.mapPlaceholder}>[Map will be displayed here]</div>
//             </div>
//             <div className={styles.description}>
//               <h4>Description</h4>
//               <p>{eventDetails.description}</p>
//             </div>
//           </div>
//         </section>

//         {/* Faculty Section */}
//         <section className={styles.facultySection}>
//           <div className={styles.sectionHeader}>
//             <h2>Faculty Assigned</h2>
//             <button className={styles.addButton}>+ Add Faculty</button>
//           </div>
//           <div className={styles.facultyGrid}>
//             {facultyMembers.map(faculty => (
//               <div key={faculty.id} className={styles.facultyCard}>
//                 <div className={styles.facultyAvatar}>{faculty.name.charAt(0)}</div>
//                 <h3>{faculty.name}</h3>
//                 <p><strong>Role:</strong> {faculty.role}</p>
//                 <p><strong>Contact:</strong> {faculty.contact}</p>
//                 <p><strong>Sessions:</strong> {faculty.sessions}</p>
//                 <div className={styles.facultyActions}>
//                   <button className={styles.actionButton}>Edit</button>
//                   <button className={styles.actionButton}>Message</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Quick Actions and Stats */}
//         <section className={styles.actionsSection}>
//           <div className={styles.quickActions}>
//             <h3>Quick Actions</h3>
//             <button className={styles.actionButton}>Update Event Details</button>
//             <button className={styles.actionButton}>Send Reminder to Faculty</button>
//             <button className={styles.actionButton}>Generate Participant List</button>
//             <button className={styles.actionButton}>Print Event Schedule</button>
//           </div>
//           <div className={styles.stats}>
//             <h3>Event Statistics</h3>
//             <div className={styles.statItem}>
//               <span>Total Registrations</span>
//               <strong>248</strong>
//             </div>
//             <div className={styles.statItem}>
//               <span>Faculty Confirmed</span>
//               <strong>5/8</strong>
//             </div>
//             <div className={styles.statItem}>
//               <span>Sessions Scheduled</span>
//               <strong>12</strong>
//             </div>
//           </div>
//         </section>

//         {/* Upcoming Tasks */}
//         <section className={styles.tasksSection}>
//           <h3>Upcoming Deadlines</h3>
//           <ul className={styles.taskList}>
//             {upcomingTasks.map((task, index) => (
//               <li key={index} className={styles.taskItem}>
//                 <input type="checkbox" id={`task-${index}`} />
//                 <label htmlFor={`task-${index}`}>{task}</label>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };
// export default OrganizerDashboard;
import React from 'react';
import styles from './OrganizerDashboard.module.css';

const OrganizerDashboard = () => {
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
            <button className={styles.addButton}>+ Add Event</button>
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
