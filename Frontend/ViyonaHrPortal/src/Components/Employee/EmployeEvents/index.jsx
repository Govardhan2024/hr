import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./index.css";
import EmployeCalendar from "../EmployeCalender";
import Employeaddevent from "../Employeaddevent";

const EmployeEvents = () => {
  const [events, setEvents] = useState([
    { title: 'Conference', start: new Date(2024, 9, 20, 10, 0), end: new Date(2024, 9, 20, 12, 0) },
    { title: 'Meeting', start: new Date(2024, 9, 21, 14, 0), end: new Date(2024, 9, 21, 15, 0) },
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <>
      <div className="dashboard-text">
        <div className="flex-dashboard-text">
          <FaArrowLeft width={12} height={14} color="#3408A4" />
          <h1 className="main-home-head">Events</h1>
        </div>
        <div>
          <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Employe</span></p>
        </div>
      </div>
    <div className="main-addeventcontainer">
      <div style={{ display: "flex" ,marginTop:30}}>
        <div className="calender">
          <EmployeCalendar events={events} />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <Employeaddevent events={events} addEvent={addEvent} />
        </div>
      </div>
      </div>
    </>
  );
};

export default EmployeEvents;
