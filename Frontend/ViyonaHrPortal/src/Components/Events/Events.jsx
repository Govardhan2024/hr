// import { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import './Events.css'; // Ensure you have the CSS styles defined

// const initialEvents = [
//   { id: 1, title: "Event 1", date: new Date(2024, 9, 5) },
//   { id: 2, title: "Event 2", date: new Date(2024, 9, 15) },
// ];

// const months = [
//   "January", "February", "March", "April", "May", "June", 
//   "July", "August", "September", "October", "November", "December"
// ];

// const Events = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [events, setEvents] = useState(initialEvents);
//   const [newEventTitle, setNewEventTitle] = useState("");

//   const handleNextMonth = () => {
//     setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
//   };

//   const handlePreviousMonth = () => {
//     setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
//   };

//   const handleToday = () => {
//     setCurrentMonth(new Date().getMonth());
//   };

//   const addEvent = (e) => {
//     e.preventDefault();
//     if (newEventTitle) {
//       const newEvent = {
//         id: events.length + 1,
//         title: newEventTitle,
//         date: new Date(new Date().getFullYear(), currentMonth, new Date().getDate()),
//       };
//       setEvents([...events, newEvent]);
//       setNewEventTitle("");
//     }
//   };

//   const filteredEvents = events.filter(event => event.date.getMonth() === currentMonth);

//   return (
//     <div>
//       <div className='dashboard-text'>
//         <div className="flex-dashboard-text">
//           <FaArrowLeft width={12} height={14} color="#3408A4" />
//           <h1 className="main-home-head"> Viyona</h1>
//         </div>
//         <div>
//           <p><span className="viyona-text">Viyona</span> <span className="viyona-span">/ Events</span></p>
//         </div>
//       </div>

//       <div className="event-table-container">
//         <header className="event-table-header">
//           <h2>{months[currentMonth]}</h2>
//           <div className="event-table-controls">
//             <button onClick={handleToday}>Today</button>
//             <button onClick={handlePreviousMonth}>Previous</button>
//             <button onClick={handleNextMonth}>Next</button>
//           </div>
//         </header>

//         <table className="event-table">
//           <thead>
//             <tr>
//               <th>Event Title</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEvents.length > 0 ? (
//               filteredEvents.map(event => (
//                 <tr key={event.id}>
//                   <td>{event.title}</td>
//                   <td>{event.date.toDateString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2">No events for this month</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <form onSubmit={addEvent} className="event-form">
//           <input 
//             type="text" 
//             value={newEventTitle} 
//             onChange={(e) => setNewEventTitle(e.target.value)} 
//             placeholder="Add new event"
//             required
//           />
//           <button type="submit">Add Event</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Events;

