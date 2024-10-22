import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const initialEmployees = [
    { id: 1, name: 'John Doe', adminType: 'Super Admin', createdDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', adminType: 'HR Admin', createdDate: '2024-02-14', role: 'Designer' },
];

const Users = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        id: null,
        firstName: '',
        lastName: '',
        emailId: '',
        username: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        adminType: '',
        employeeId: '',
        permissions: {
            read: false,
            write: false,
            delete: false
        }
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

    const handleAddEmployee = async (event) => {
        event.preventDefault();

        if (newEmployee.firstName && newEmployee.emailId && newEmployee.mobileNumber && newEmployee.password === newEmployee.confirmPassword) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/create-employee', newEmployee);
                if (response.data) {
                    const addedEmployee = { id: response.data.id, name: `${newEmployee.firstName} ${newEmployee.lastName}`, ...newEmployee };
                    setEmployees([...employees, addedEmployee]);
                    setShowPopup(false);
                    resetNewEmployee();
                    toast.success('User successfully added!');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error("There was an error creating the employee!", error);
                toast.error('Error adding user.');
            }
        } else {
            toast.error('Please fill in all required fields and ensure passwords match.');
        }
    };

    const resetNewEmployee = () => {
        setNewEmployee({
            id: null,
            firstName: '',
            lastName: '',
            emailId: '',
            username: '',
            password: '',
            confirmPassword: '',
            mobileNumber: '',
            adminType: '',
            employeeId: '',
            permissions: {
                read: false,
                write: false,
                delete: false
            }
        });
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head">Employees</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>

            <div className="department-list-container">
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
                                {showPopup ? 'X Close' : 'New User'}
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
                            <th>No.</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Admin</th>
                            <th>Created Date</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td><img className="td-img" src="../../../public/images/image (2).svg" /></td>
                                <td>{employee.name}</td>
                                <td>{employee.adminType}</td>
                                <td>{employee.createdDate}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <button className="edit-button">Edit</button>
                                    <button className="delete-button">Delete</button>
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
                <div className="popupuser">
                    <div className="popup-contentuser">
                        <h2 className="addhead">{newEmployee.id ? 'Edit User' : 'Add New User'}</h2>
                        <div className="popuplineusre"></div>
                        <form onSubmit={handleAddEmployee}>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <input
                                    className="addinput"
                                    type="text"
                                    placeholder="First Name"
                                    value={newEmployee.firstName}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                                />
                                <input
                                    className="addinput"
                                    type="text"
                                    placeholder="Last Name"
                                    value={newEmployee.lastName}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                                />
                            </div>
                            <input
                                className="addinput2"
                                type="email"
                                placeholder="Email ID"
                                value={newEmployee.emailId}
                                onChange={(e) => setNewEmployee({ ...newEmployee, emailId: e.target.value })}
                            />
                            <input
                                className="addinput2"
                                type="text"
                                placeholder="Username"
                                value={newEmployee.username}
                                onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    className="addinput"
                                    type="password"
                                    placeholder="Password"
                                    value={newEmployee.password}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                />
                                <input
                                    className="addinput"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={newEmployee.confirmPassword}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, confirmPassword: e.target.value })}
                                />
                            </div>
                            <input
                                className="addinput2"
                                type="text"
                                placeholder="Mobile Number"
                                value={newEmployee.mobileNumber}
                                onChange={(e) => setNewEmployee({ ...newEmployee, mobileNumber: e.target.value })}
                            />
                            <input
                                className="addinput2"
                                type="text"
                                placeholder="Employee ID"
                                value={newEmployee.employeeId}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                            />
                            <select
                                className="Selecttype"
                                value={newEmployee.adminType}
                                onChange={(e) => setNewEmployee({ ...newEmployee, adminType: e.target.value })}
                            >
                                <option value="">Select Type</option>
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "30px", gap: '15px', marginRight: '20px' }}>
                                <button type="submit" className="add-btn">
                                    {newEmployee.id ? 'Save Changes' : 'Add User'}
                                </button>
                                <button className="close-btn" type="button" onClick={() => setShowPopup(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
