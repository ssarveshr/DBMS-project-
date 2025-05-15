import React from 'react';
import styles from './Calender.module.css';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: firstDayOfMonth }, () => '');
  const calendarDays = [...emptyCells, ...daysArray];

  const handleEventRedirect = (day) => {
    if (day) {
      navigate(`/event?date=${currentYear}-${currentMonth + 1}-${day}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Event Calendar</h1>
      </div>

      <div className={styles.calendarGrid}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayOfWeek}>{day}</div>
        ))}

        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={styles.dayCell} 
            onClick={() => handleEventRedirect(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;