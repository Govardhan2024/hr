import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css';

const initialDepartments = [
    { id: 1, departmentName: 'IT', departmentHead: 'John Doe', totalEmployees: 25 },
    { id: 2, departmentName: 'HR', departmentHead: 'Jane Smith', totalEmployees: 15 },
];

const Departments = () => {
    const [departments, setDepartments] = useState(initialDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [newDepartment, setNewDepartment] = useState({
        id: null,
        departmentName: '',
        departmentHead: '',
        totalEmployees: '',
    });

    const filteredDepartments = departments.filter(department =>
        department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalEntries = filteredDepartments.length;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredDepartments.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleAddDepartment = async (event) => {
        event.preventDefault();
        if (newDepartment.departmentName && newDepartment.departmentHead && newDepartment.totalEmployees) {
            try {
                if (newDepartment.id) {
                    // Edit department
                    const response = await axios.put(`http://127.0.0.1:8000/update-department/${newDepartment.id}`, newDepartment);
                    if (response.data) {
                        setDepartments(departments.map(department => 
                            department.id === newDepartment.id ? newDepartment : department
                        ));
                        toast.success('Department successfully updated!');
                    }
                } else {
                    // Add new department
                    const response = await axios.post('http://127.0.0.1:8000/create-department', newDepartment);
                    if (response.data) {
                        const addedDepartment = { id: response.data.id, ...newDepartment };
                        setDepartments([...departments, addedDepartment]);
                        toast.success('Department successfully added!');
                    }
                }
                setShowPopup(false);
                resetNewDepartment();
            } catch (error) {
                console.error("Error saving department!", error);
                toast.error('Error saving department.');
            }
        } else {
            toast.error('Please fill in all required fields.');
        }
    };

    const handleEditDepartment = (department) => {
        setNewDepartment(department);
        setShowPopup(true);
    };

    const handleDeleteDepartment = (id) => {
        setDepartments(departments.filter(department => department.id !== id));
        toast.error(`Department with ID ${id} deleted!`);
    };

    const resetNewDepartment = () => {
        setNewDepartment({
            id: null,
            departmentName: '',
            departmentHead: '',
            totalEmployees: ''
        });
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head">Departments</h1>
                </div>
                <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
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
                        <button className="add-employee-button" onClick={() => { resetNewDepartment(); setShowPopup(true); }}>
                            {showPopup ? 'X Close' : 'Add New'}
                        </button>
                        </div>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search departments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                       
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Profile </th>
                            <th>Department Name</th>
                            <th>Department Head</th>
                            <th>No. of Employees</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((department) => (
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td><img  className="td-img" src="../../../public/images/image (2).svg"/></td>
                                <td>{department.departmentName}</td>
                                <td>{department.departmentHead}</td>
                                <td>{department.totalEmployees}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEditDepartment(department)}>
                                        <FaEdit color="blue" />
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteDepartment(department.id)}>
                                        <FaTrash color="red" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries</span>
                    <div className="pagination-controls">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
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
                        <h2 className="addhead">{newDepartment.id ? 'Edit Department' : 'Add New Department'}</h2>
                        <form onSubmit={handleAddDepartment}>
                            <div>
                            <input
                                className="depinput"
                                type="text"
                                placeholder="Department Name"
                                value={newDepartment.departmentName}
                                onChange={(e) => setNewDepartment({ ...newDepartment, departmentName: e.target.value })}
                            />
                            </div>
                            <div style={{display:'flex',gap:'5px'}}>
                            <input
                                className="depinput2"
                                type="text"
                                placeholder="Department Head"
                                value={newDepartment.departmentHead}
                                onChange={(e) => setNewDepartment({ ...newDepartment, departmentHead: e.target.value })}
                            />
                            <input
                            className="depinput2"
                                type="number"
                                placeholder="No. of Employees"
                                value={newDepartment.totalEmployees}
                                onChange={(e) => setNewDepartment({ ...newDepartment, totalEmployees: e.target.value })}
                            />
                            </div>
                            <div style={{display:'flex',justifyContent:'flex-end',marginTop:"60px"}}>
                            <button  className="add-btn" type="submit">{newDepartment.id ? 'Save' : 'Add'}</button>
                            <button type="button" onClick={() => setShowPopup(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Departments;
