
import MyCalendar from "../MyCalendar";
import { FaArrowLeft } from "react-icons/fa";
import "./index.css"; // Ensure this file exists and has styles

const Events = () => {

  return (
    <>
      <div className='dashboard-text'>
        <div className="flex-dashboard-text">
          <FaArrowLeft width={12} height={14} color="#3408A4" />
          <h1 className="main-home-head">Employees</h1>
        </div>
        <div>
          <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
        </div>
      </div>
      <div className='calender'>
        <MyCalendar />
      </div>
    </>


  );
};

export default Events;
