import { useState } from "react";
import './index.css';
import { format, isToday, isTomorrow, isAfter } from 'date-fns';

const Employeaddevent = ({ addEvent, events }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleAddEvent = () => {
    const newEvent = {
      title: eventName,
      start: new Date(eventDate),
      end: new Date(eventDate),
    };
    addEvent(newEvent);
    setShowPopup(false);
    setEventName('');
    setEventDate('');
  };

  const todayEvents = events.filter((event) => isToday(new Date(event.start)));
  const tomorrowEvents = events.filter((event) => isTomorrow(new Date(event.start)));
  const upcomingEvents = events.filter(
    (event) => isAfter(new Date(event.start), new Date()) && !isToday(new Date(event.start)) && !isTomorrow(new Date(event.start))
  );

  return (
    <div className="addevent-main-card">
      <div className="add-event">
        <button className="add-event-btn" onClick={() => setShowPopup(true)}>Add New Events</button>
      </div>
      {showPopup && (
        <div className="addpopup-container">
          <div className="addpopup">
            <h3 className="addevnthead">Add Event</h3>
            <input
              className="addpopupinput"
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              className="addpopupinput"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <div style={{ gap: 10, marginTop: 100, display: 'flex', justifyContent: 'end', marginRight: "20px" }}>
              <button className="addevenbtn" onClick={handleAddEvent}>Add Event</button>
              <button className="cancelbtn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="add-event-botom-card">
        <h3 className="upcominghead">Today&apos;s Events</h3>
        <ul className="uiullistaitems">
          {todayEvents.length > 0 ? todayEvents.map((event, index) => (
            <li key={index}>
              <span>{event.title}</span> —{" "}
              <span>{format(new Date(event.start), "dd MMMM yyyy")}</span>
            </li>
          )) : <li>No events for today</li>}
        </ul>

        <h3 className="upcominghead">Tomorrow&apos;s Events</h3>
        <ul className="uiullistaitems">
          {tomorrowEvents.length > 0 ? tomorrowEvents.map((event, index) => (
            <li key={index}>
              <span>{event.title}</span> —{" "}
              <span>{format(new Date(event.start), "dd MMMM yyyy")}</span>
            </li>
          )) : <li>No events for tomorrow</li>}
        </ul>

        <h3 className="upcominghead">Upcoming Events</h3>
        <ul className="uiullistaitems">
          {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
            <li key={index}>
              <span>{event.title}</span> —{" "}
              <span>{format(new Date(event.start), "dd MMMM yyyy")}</span>
            </li>
          )) : <li>No upcoming events</li>}
        </ul>
      </div>
    </div>
  );
};

export default Employeaddevent;
