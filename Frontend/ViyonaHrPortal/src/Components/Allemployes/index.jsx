import { FaArrowLeft } from "react-icons/fa";
import  { useState } from 'react';
import './index.css';

const initialEmployees = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', joinDate: '2024-01-01', role: 'Developer' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 3, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 4, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 5, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 6, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 7, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 8, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 9, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 10, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 11, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 12, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 13, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    { id: 14, name: 'Jane Smith', phone: '987-654-3210', joinDate: '2024-02-14', role: 'Designer' },
    // Add more employee data as needed
];

const Employees = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', joinDate: '', role: '' });

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

    const handleAddEmployee = () => {
        if (newEmployee.name && newEmployee.phone && newEmployee.joinDate && newEmployee.role) {
            setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
            setShowPopup(false);
            setNewEmployee({ name: '', phone: '', joinDate: '', role: '' });
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
        setNewEmployee({ name: '', phone: '', joinDate: '', role: '' });
    };

    return (
        <div>
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
                        <input
                            type="text"
                            placeholder="Name"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone No."
                            value={newEmployee.phone}
                            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Join Date"
                            value={newEmployee.joinDate}
                            onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={newEmployee.role}
                            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        />
                        <button onClick={newEmployee.id ? handleSaveEditEmployee : handleAddEmployee}>
                            {newEmployee.id ? 'Save' : 'Add'}
                        </button>
                        <button onClick={() => setShowPopup(false)}></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
