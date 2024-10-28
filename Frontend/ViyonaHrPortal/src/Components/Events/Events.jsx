
import MyCalendar from "../MyCalendar";
import { FaArrowLeft } from "react-icons/fa";
import "./index.css"; 
import Addeventform from "../Addeventform";

const Events = () => {

  return (
    <>
      <div className='dashboard-text'>
        <div className="flex-dashboard-text">
          <FaArrowLeft width={12} height={14} color="#3408A4" />
          <h1 className="main-home-head">Events</h1>
        </div>
        <div>
          <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
        </div>
      </div>
      <div className="eventadmincontar">
      <div style={{display:"flex",marginTop:30}} >
        <div className='calender'>
        <MyCalendar />
        </div>
        <div style={{marginLeft:'20px'}}>
        <Addeventform/>
        </div>  
      </div>
      </div>
    </>


  );
};

export default Events;
