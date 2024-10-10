import { FaArrowLeft } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Holidays.css'

const holidays = [
    { id: 1, day: 'Monday', date: '2024-01-01', holiday: 'New Year' },
    { id: 2, day: 'Tuesday', date: '2024-02-14', holiday: 'Valentine’s Day' },
    { id: 3, day: 'Friday', date: '2024-04-07', holiday: 'Good Friday' },
    { id: 4, day: 'Monday', date: '2024-05-27', holiday: 'Memorial Day' },
    { id: 5, day: 'Wednesday', date: '2024-07-04', holiday: 'Independence Day' },
    { id: 6, day: 'Monday', date: '2024-09-02', holiday: 'Labor Day' },
    { id: 7, day: 'Thursday', date: '2024-10-31', holiday: 'Halloween' },
    { id: 8, day: 'Wednesday', date: '2024-11-28', holiday: 'Thanksgiving' },
    { id: 9, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 10, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 11, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 12, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 13, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 14, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 15, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },

    { id: 16, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },  { id: 9, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 17, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 18, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
    { id: 19, day: 'Wednesday', date: '2024-12-25', holiday: 'Christmas' },
];

const Holidays = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDay, setSelectedDay] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10); // Change this number to adjust entries per page

    // Filter holidays based on search and selected day
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

    return (
        <div>
            <div className='dashborad-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head"> Hoidays</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>
            <div className="holiday-list-container">
                {/* Header with search bar */}
                <div className="header">
                    <h1>Holidays List</h1>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search holidays..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown for filtering by day */}
                <div className="filter-dropdown">
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
                    <label className="label-text" htmlFor="dayFilter">entries </label>
                </div>

                {/* Holidays Table */}
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
        </div>
    );
};

export default Holidays;
