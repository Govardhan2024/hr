import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import './index.css';

const holidays = [
    { id: 1, day: 'Monday', date: '2024-01-01', holiday: 'New Year' },
    // ...existing holidays
];

const Employeeholidays = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDay, setSelectedDay] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10); 
    const [showModal, setShowModal] = useState(false);
    const [newHoliday, setNewHoliday] = useState({ holiday: '', date: '', day: '' });
    // Filter and paginate holidays
    const filteredHolidays = holidays.filter((holiday) => {
        const matchesSearch =
            holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
            holiday.date.includes(searchTerm);
        const matchesDay = selectedDay === 'All' || holiday.day === selectedDay;
        return matchesSearch && matchesDay;
    });

    const totalEntries = filteredHolidays.length;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredHolidays.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
        pageNumbers.push(i);
    }

    // Handle adding new holiday
    const handleAddHoliday = () => {
        const newDay = new Date(newHoliday.date).toLocaleDateString('en-US', { weekday: 'long' });
        holidays.push({ 
            id: holidays.length + 1, 
            day: newDay, 
            date: newHoliday.date, 
            holiday: newHoliday.holiday 
        });
        setShowModal(false);
        setNewHoliday({ holiday: '', date: '', day: '' });
    };

    return (
        <div>
            <div className='dashborad-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head"> Holidays</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>
            <div className="holiday-list-container">
                {/* Header with search bar */}
                <div className="header">
                    <div>
                    <div className="filter-dropdown">
                        <h1 className="listhead">Holidays</h1>
                        <label className="label-text" htmlFor="dayFilter">Show: </label>
                        <select
                            id="dayFilter"
                            className="select-day"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        <span className="label-text">entries</span>
                    </div>
                    </div>
                    

                   <div>
                   <div style={{marginLeft:150,marginBottom:10}}>
                    <button onClick={() => setShowModal(true)} className="add-holiday-button">AddHoliday</button>
                    </div>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search holidays..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    {/* Filter Dropdown for day */}
                  
                   </div>
                </div>

                {/* Holiday Table */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Holiday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((holiday) => (
                            <tr key={holiday.id}>
                                <td>{holiday.id}</td>
                                <td>{holiday.day}</td>
                                <td>{holiday.date}</td>
                                <td>{holiday.holiday}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="pagination">
                    <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries</span>
                    <div className="pagination-controls">
                        <button className="previous-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.map(number => (
                            <button key={number}  onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : 'number-button'}>
                                {number}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                    </div>
                </div>
            </div>

            {/* Modal for Adding Holiday */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Holiday</h2>
                        <div style={{marginTop:30}}>
                        <input
                            placeholder="Holiday name"
                            type="text"
                            value={newHoliday.holiday}
                            onChange={(e) => setNewHoliday({ ...newHoliday, holiday: e.target.value })}
                        />
                         <input
                            placeholder=" Day"
                            type="day"
                            value={newHoliday.day}
                            onChange={(e) => setNewHoliday({ ...newHoliday, day: e.target.value })}
                        />
                        <input
                            placeholder="Holiday date"
                            type="date"
                            value={newHoliday.date}
                            onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                        />
                        
                        </div>
                        <div style={{display:'flex',marginTop:'20px',justifyContent:'end',marginRight:17}}>
                        <button onClick={handleAddHoliday} className="save-button">Save</button>
                        <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employeeholidays;
