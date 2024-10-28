import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const initialEmployees = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
];

const EmployeEmployesalary = () => {
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

    const handleSendPayslip = async (id, email) => {
        try {
            // Make an API call to send the payslip to the employee's email
            await axios.post('http://127.0.0.1:8000/send-payslip', { employeeId: id, email });
            toast.success(`Payslip sent to ${email}`);
        } catch (error) {
            console.error("Error sending payslip:", error);
            toast.error('Error sending payslip.');
        }
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
                    <h1 className="main-home-head">Employees</h1>
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

                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>EmployeID</th>
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
                                <td><img  className="td-img" src="../../../public/images/image (2).svg"/></td>
                                <td>{employee.name}</td>
                                <td>{employee.id}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.joinDate}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <button className="send-payslip-button" onClick={() => handleSendPayslip(employee.id, employee.employeeWorkingEmail)}>
                                        Payslip
                                    </button>
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
                        <h2 className="addhead">{newEmployee.id ? 'Edit Employee' : 'Add New Employee'}</h2>
                        <form onSubmit={newEmployee.id ? handleSaveEditEmployee : handleEditEmployee}>
                            <div style={{ display:'flex',gap:'20px'}}>
                            <input
                                className="editinput"
                                type="text"
                                placeholder="Employee Name"
                                value={newEmployee.employeeName}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeeName: e.target.value })}
                            />
                            <input
                             className="editinput"   
                                type="text"
                                placeholder="Phone Number"
                                value={newEmployee.employeePhoneNumber}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeePhoneNumber: e.target.value })}
                            />
                            </div>
                            <div style={{ display:'flex',gap:'20px',marginTop:'30px'}}>
                            <input
                             className="editinput"
                                type="date"
                                placeholder="Join Date"
                                value={newEmployee.joinDate}
                                onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                            />
                            <input
                             className="editinput"
                                type="text"
                                placeholder="Role"
                                value={newEmployee.role}
                                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                            />
                            </div>
                            <div style={{display:'flex',justifyContent:'space-between',marginTop:'50px'}}>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                        <button type="submit">{newEmployee.id ? 'Save Changes' : 'Add Employee'}</button>        
                    </div>
                        </form>
                        
                    </div>  
                </div>
            )}


        </div>
    );
};

export default EmployeEmployesalary;
