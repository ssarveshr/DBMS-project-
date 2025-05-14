import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
const FacultyDashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/faculty', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (Array.isArray(res.data)) {
        setEvents(res.data);
        setMessage('');
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error fetching events.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (event) => {
    try {
      await axios.put(
        '/api/faculty/approve-event',
        {
          organiserName: event.organiserName,
          title: event.title,
          facultyName: event.facultyName
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setEvents(events.filter(e => e._id !== event._id));
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleDeny = async (event) => {
    try {
      await axios.delete('/api/faculty/deny-event', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          organiserName: event.organiserName,
          title: event.title,
          facultyName: event.facultyName
        }
      });
      setEvents(events.filter(e => e._id !== event._id));
    } catch (error) {
      console.error('Error denying event:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (message) return <p className="text-center mt-8 text-gray-600">{message}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => (
        <div
          key={event._id}
          className="bg-white p-4 rounded-xl shadow-lg border flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p><strong>Organizer:</strong> {event.organiserName}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleApprove(event)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleDeny(event)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyDashboard;
