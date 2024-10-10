// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Import useState
import Calendar from "react-calendar";
import { FaArrowLeft } from "react-icons/fa";
import "./index.css"; // Ensure this file exists and has styles

const Events = () => {
  const [date, setDate] = useState(new Date()); // Current selected date
  const [events, setEvents] = useState([
    { title: "Event 1", date: new Date("2024-10-09") },
    { title: "Event 2", date: new Date("2024-10-12") },
  ]);
  const [newEventTitle, setNewEventTitle] = useState(""); // New event title
  const [newEventDate, setNewEventDate] = useState(date); // New event date
  const [editingEventIndex, setEditingEventIndex] = useState(null); // Index of the event being edited
  const [editingEventTitle, setEditingEventTitle] = useState(""); // Title for editing

  // Handle date change
  const onChange = (date) => {
    setDate(date);
    setNewEventDate(date); // Update new event date when the calendar date changes
  };

  // Check if the selected date has any events
  const getEventsForDate = (date) => {
    return events.filter((event) => event.date.toDateString() === date.toDateString());
  };

  // Add new event
  const addEvent = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newEventTitle) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { title: newEventTitle, date: newEventDate },
      ]);
      setNewEventTitle(""); // Clear the input field
    }
  };

  // Edit event
  const startEditing = (index) => {
    setEditingEventIndex(index);
    setEditingEventTitle(events[index].title);
  };

  const saveEditEvent = (e) => {
    e.preventDefault();
    if (editingEventTitle) {
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex].title = editingEventTitle;
      setEvents(updatedEvents);
      setEditingEventIndex(null); // Reset editing index
      setEditingEventTitle(""); // Clear editing title
    }
  };

  // Delete event
  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className="events-container">
      <div className="dashboard-text">
        <div className="flex-dashboard-text">
          <FaArrowLeft width={12} height={14} color="#3408A4" />
          <h1 className="main-home-head">Dashboard</h1>
        </div>
        <div>
          <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={({ date }) => {
            // Highlight dates with events
            const hasEvent = getEventsForDate(date).length > 0;
            return hasEvent ? 'event-day' : null; // CSS class for highlighted event days
          }}
        />
      </div>

      {/* Event Form to Add New Events */}
      <form onSubmit={addEvent} className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {/* Display Events for Selected Date */}
      <div className="events-list">
        <h2>Events on {date.toDateString()}:</h2>
        <ul>
          {getEventsForDate(date).map((event, index) => (
            <li key={index}>
              {editingEventIndex === index ? (
                <form onSubmit={saveEditEvent}>
                  <input
                    type="text"
                    value={editingEventTitle}
                    onChange={(e) => setEditingEventTitle(e.target.value)}
                    required
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <div>
                  {event.title}
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => deleteEvent(index)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;
