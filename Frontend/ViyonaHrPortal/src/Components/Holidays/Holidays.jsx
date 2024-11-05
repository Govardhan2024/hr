import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from 'react';
import './Holidays.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Skeleton } from '@mui/material';

const Holidays = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [holidayTitle, setHolidayTitle] = useState('');
    const [holidayDate, setHolidayDate] = useState(null);
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch holidays from the backend on component mount
    useEffect(() => {
        const fetchHolidays = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:8000/all_holidays');
                const data = await response.json();
                console.log('Fetched holidays:', data);
                setHolidays(data);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }finally {
                setLoading(false); // End loading
            }
        };

        fetchHolidays();
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setHolidayTitle('');
        setHolidayDate(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHoliday = {
            leave_type: holidayTitle,
            start_date: holidayDate ? holidayDate.toISOString() : null, // Format to ISO string
            end_date: holidayDate ? holidayDate.toISOString() : null,   // Format to ISO string
            reason: holidayTitle, // Same as leave_type in this case
            status: "Approved", // Default status
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/add_holidays', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHoliday),
            });

            if (response.ok) {
                const addedHoliday = await response.json();
                setHolidays([...holidays, addedHoliday]);
            } else {
                console.error('Failed to add holiday:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding holiday:', error);
        }

        handleClosePopup();
    };

    // Check if holidays is an array before filtering
    const filteredHolidays = Array.isArray(holidays) ? holidays.filter((holiday) => {
        const matchesSearch =
            holiday.leave_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            holiday.reason.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    }) : [];

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
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head">Holidays</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>
            <div className="holiday-list-container">

                {/* Header with search bar */}
                <div className="header">
                    <h1>Holidays List</h1>
                    <div>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search holidays..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="event-button" onClick={handleOpenPopup}>Add Holiday</button>
                    </div>
                </div>

                {/* Holidays Table */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Holiday Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            // Render skeleton loaders if loading
                            Array.from({ length: entriesPerPage }).map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton width={10} /></td>
                                    <td><Skeleton width={150} /></td>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton width={100} /></td>
                                </tr>
                            ))
                        ) : (
                            currentEntries.map((holiday, index) => (
                                <tr key={holiday.id}>
                                    <td>{index + 1}</td>
                                    <td>{holiday.leave_type}</td>
                                    <td>{new Date(holiday.start_date).toLocaleDateString()}</td>
                                    <td>{new Date(holiday.end_date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>    

                {/* Pagination Controls */}
                <div className="pagination">
                    <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries</span>
                    <div className="pagination-controls">
                        <button className="previous-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : 'number-button'}>
                                {number}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2 style={{textAlign:'start'}}>Add Holiday</h2>
                        <form onSubmit={handleSubmit}>
                           <div>
                                <input
                                className="selectdate"
                                    placeholder="Holiday Name"
                                    type="text"
                                    value={holidayTitle}
                                    onChange={(e) => setHolidayTitle(e.target.value)}
                                    required
                                />
                           
                         
                            
                                <DatePicker
                                    className="selectdate"
                                    selected={holidayDate}
                                    onChange={(date) => setHolidayDate(date)}
                                    required
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Select a date"
                                />
                                </div>
                       
                            <div className="popup-buttons">
                                <button className="submitbtn" type="submit">Submit</button>
                                <button  className="popupcancletbtn" type="button" onClick={handleClosePopup}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Holidays;
