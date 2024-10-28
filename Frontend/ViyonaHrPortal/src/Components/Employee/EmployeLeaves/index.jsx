/* eslint-disable no-undef */
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const initialEmployees = [
    { id: 1, name: 'John Doe', employeeId: 'EMP001', leaveType: 'Casual Leave', date: '2024-03-10' },
    { id: 2, name: 'Jane Smith', employeeId: 'EMP002', leaveType: 'Medical Leave', date: '2024-02-15' },
];


const EmployeLeaves = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [newLeave, setNewLeave] = useState({
        id: null,
        employeeName: '',
        leaveType: '',
        fromDate: '',
        reason: ''
    });

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalEntries = filteredEmployees.length;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEmployees.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleAddLeave = async (event) => {
        event.preventDefault();

        if (newLeave.employeeName && newLeave.leaveType && newLeave.fromDate && newLeave.reason) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/create-leave', newLeave);
                if (response.data) {
                    const addedLeave = { id: response.data.id, ...newLeave };
                    setEmployees([...employees, addedLeave]);
                    setShowPopup(false);
                    resetNewLeave();
                    toast.success('Leave request successfully added!');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error("Error creating leave request!", error);
                toast.error('Error adding leave request.');
            }
        } else {
            toast.error('Please fill in all required fields.');
        }
    };

    const handleApproveLeave = (id) => {
        toast.success(`Leave request with ID ${id} approved!`);
    };

    const handleRejectLeave = (id) => {
        toast.error(`Leave request with ID ${id} rejected!`);
    };

    const resetNewLeave = () => {
        setNewLeave({
            id: null,
            employeeName: '',
            leaveType: '',
            fromDate: '',
            reason: ''
        });
    };

    useEffect(() => {
        let intervalId;

        if (showPopup) {
            intervalId = setInterval(() => {
                window.location.reload();
            }, 60000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [showPopup]);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head">Leave Requests</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>

            <div className="department-list-container ">
                <div className="header">
                    <div className="entries-dropdown">
                        <label htmlFor="entriesPerPage">Show </label>
                        <select
                            id="entriesPerPage"
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                        <label htmlFor="entriesPerPage"> Entries</label>
                    </div>

                    <div className="header-actions">
                        <div className="btn-card">
                            <button className="add-employee-button" onClick={() => setShowPopup(!showPopup)}>
                                {showPopup ? 'X Close' : 'Add Leave'}
                            </button>
                        </div>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Employee ID</th> {/* Updated Header */}
                            <th>Leave Type</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td><img  className="td-img" src="../../../public/images/image (2).svg"/></td>
                                <td>{employee.name}</td>
                                <td>{employee.employeeId}</td> {/* Updated Employee ID */}
                                <td>{employee.leaveType}</td>
                                <td>{employee.date}</td>
                                <td>
                                    <button className="approve-button" onClick={() => handleApproveLeave(employee.id)}>
                                        <FaCheck color="green" />
                                    </button>
                                    <button className="reject-button" onClick={() => handleRejectLeave(employee.id)}>
                                        <FaTimes color="red" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2 className="addhead">{newLeave.id ? 'Edit Leave Request' : 'Add New Leave Request'}</h2>
                        <form onSubmit={newLeave.id ? handleSaveEditEmployee : handleAddLeave}>
                           <div>
                            <select
                                className="select"
                                value={newLeave.leaveType}
                                onChange={(e) => setNewLeave({ ...newLeave, leaveType: e.target.value })}
                            >
                                <option value="">Select Leave Type</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Medical Leave">Medical Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                            </select>
                            </div>
                            <div style={{display:"flex",gap:'5px'}}>
                            <input
                                className="addleave"
                                type="text"
                                placeholder="Employee Name"
                                value={newLeave.employeeName}
                                onChange={(e) => setNewLeave({ ...newLeave, employeeName: e.target.value })}
                            />

                            <input
                                className="addleave"
                                type="date"
                                value={newLeave.fromDate}
                                onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
                            />
                            </div>
                            <textarea
                                className="textare"
                                placeholder="Reason"
                                value={newLeave.reason}
                                onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                            />
                            <div style={{display:'flex',justifyContent:'flex-end',marginTop:"30px"}}>
                            <button className="add-btn" type="submit">{newLeave.id ? 'Save' : 'Add'}</button>
                            <button type="button" onClick={() => setShowPopup(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeLeaves;
