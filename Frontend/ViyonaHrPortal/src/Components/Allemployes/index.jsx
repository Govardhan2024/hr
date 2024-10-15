import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css';

const initialEmployees = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
     


];

const Employees = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        id: null,
        employeeName: '',
        employeePersonalEmail: '',
        employeeWorkingEmail: '',
        employeePhoneNumber: '',
        joinDate: '',
        jobrole: '',
        role: '',
        pictureUpload: '',
        password: ''
    });

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.includes(searchTerm)
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
        event.preventDefault(); // Prevent the default form submission behavior

        if (newEmployee.employeeName && newEmployee.employeePersonalEmail && newEmployee.employeePhoneNumber) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/create-employee', newEmployee);
                if (response.data) {
                    const addedEmployee = { id: response.data.id, ...newEmployee };
                    setEmployees([...employees, addedEmployee]); // Update the employees state
                    setShowPopup(false); // Close the popup
                    resetNewEmployee(); // Reset form fields
                    toast.success('Employee successfully added!'); // Display success message

                    // Set a timer to reload the page after 1 second
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error("There was an error creating the employee!", error);
                toast.error('Error adding employee.');
            }
        } else {
            toast.error('Please fill in all required fields.'); // Show error if required fields are empty
        }
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    const handleEditEmployee = (id) => {
        const employeeToEdit = employees.find(employee => employee.id === id);
        setNewEmployee(employeeToEdit);
        setShowPopup(true);
    };

    const handleSaveEditEmployee = () => {
        setEmployees(employees.map(emp => emp.id === newEmployee.id ? newEmployee : emp));
        setShowPopup(false);
        resetNewEmployee();
        toast.success('Employee details successfully updated!'); 
    };

    const resetNewEmployee = () => {
        setNewEmployee({
            id: null,
            employeeName: '',
            employeePersonalEmail: '',
            employeeWorkingEmail: '',
            employeePhoneNumber: '',
            joinDate: '',
            jobrole: '',
            role: '',
            pictureUpload: '',
            password: ''
        });
    };

    useEffect(() => {
        let intervalId;

        if (showPopup) {
            // Set an interval to reload the page every minute when the popup is open
            intervalId = setInterval(() => {
                window.location.reload(); // Reload the page
            }, 60000); // 60000 milliseconds = 1 minute
        }

        return () => {
            clearInterval(intervalId); // Cleanup interval on component unmount or when popup closes
        };
    }, [showPopup]);

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

            <div className="employee-list-container">
                <div className="header">
                    <div className="entries-dropdown">
                        <label htmlFor="entriesPerPage">Show Entries:</label>
                        <select
                            id="entriesPerPage"
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="header-actions">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="add-employee-button" onClick={() => setShowPopup(!showPopup)}>
                            {showPopup ? 'X Close' : 'Add Employee'}
                        </button>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Join Date</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.joinDate}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEditEmployee(employee.id)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
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
                        <h2>{newEmployee.id ? 'Edit Employee' : 'Add New Employee'}</h2>
                        <form onSubmit={newEmployee.id ? handleSaveEditEmployee : handleAddEmployee}>
                            <input
                                type="text"
                                placeholder="Employee Name"
                                value={newEmployee.employeeName}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeeName: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Employee Personal Email"
                                value={newEmployee.employeePersonalEmail}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeePersonalEmail: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Employee Working Email"
                                value={newEmployee.employeeWorkingEmail}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeeWorkingEmail: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Employee Phone Number"
                                value={newEmployee.employeePhoneNumber}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeePhoneNumber: e.target.value })}
                            />
                            <input
                                type="date"
                                value={newEmployee.joinDate}
                                onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Job Role"
                                value={newEmployee.jobrole}
                                onChange={(e) => setNewEmployee({ ...newEmployee, jobrole: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={newEmployee.role}
                                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                            />
                            <input
                                type="file"
                                placeholder="Profile Pic"
                                accept="image/*"
                                onChange={(e) => setNewEmployee({ ...newEmployee, pictureUpload: e.target.files[0]?.name })}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newEmployee.password}
                                onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                            />

                            <button type="submit">
                                {newEmployee.id ? 'Save' : 'Add'}
                            </button>
                            <button type="button" onClick={() => setShowPopup(false)}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
