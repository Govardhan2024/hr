import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import "./index.css";

const Users = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newEmployee, setNewEmployee] = useState({
    id: null,
    firstName: "",
    lastName: "",
    emailId: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    adminType: "",
    employeeId: "",
    permissions: {
      read: false,
      write: false,
      delete: false,
    },
  });

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_all_users");
        setEmployees(response.data);
        toast.success(" All employees.");
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Error fetching employees.");
      } finally {
        setLoading(false); 
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredEmployees.length;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEmployees.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleAddEmployee = async (event) => {
    event.preventDefault();

    if (
      newEmployee.firstName &&
      newEmployee.emailId &&
      newEmployee.mobileNumber &&
      newEmployee.password === newEmployee.confirmPassword
    ) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/create-employee",
          newEmployee
        );
        if (response.data) {
          const addedEmployee = {
            id: response.data.id,
            name: `${newEmployee.firstName} ${newEmployee.lastName}`,
            ...newEmployee,
          };
          setEmployees([...employees, addedEmployee]);
          setShowPopup(false);
          resetNewEmployee();
          toast.success("User successfully added!");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.error("There was an error creating the employee!", error);
        toast.error("Error adding user.");
      }
    } else {
      toast.error(
        "Please fill in all required fields and ensure passwords match."
      );
    }
  };

  const resetNewEmployee = () => {
    setNewEmployee({
      id: null,
      firstName: "",
      lastName: "",
      emailId: "",
      username: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      adminType: "",
      employeeId: "",
      permissions: {
        read: false,
        write: false,
        delete: false,
      },
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <div className="dashboard-text">
        <div className="flex-dashboard-text">
          <FaArrowLeft width={12} height={14} color="#3408A4" />
          <h1 className="main-home-head">Employees</h1>
        </div>
        <div>
          <p>
            <span className="viyona-text">VIYONA</span>{" "}
            <span className="viyona-span">/ Dashboard</span>
          </p>
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
              <button
                className="add-employee-button"
                onClick={() => setShowPopup(!showPopup)}
              >
                {showPopup ? "X Close" : "New User"}
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: entriesPerPage }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={10} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    
                  </tr>
                )):


                  currentEntries.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + indexOfFirstEntry + 1}</td>
                      <td>{employee.userName}</td>
                      <td>{employee.email}</td>
                      <td>{employee.role}</td>
                      <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                      </td>
                    </tr>
                  ))



            
          }
          </tbody>
        </table>

        <div className="pagination">
          <span>
            Showing {indexOfFirstEntry + 1} to{" "}
            {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
          </span>
          <div className="pagination-controls">
            <button
              className="previous-button"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? "active" : "number-button"}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popupuser">
          <div className="popup-contentuser">
            <h2 className="addhead">
              {newEmployee.id ? "Edit User" : "Add New User"}
            </h2>
            <div className="popuplineusre"></div>
            <form onSubmit={handleAddEmployee}>
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, lastName: e.target.value })
                  }
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                value={newEmployee.emailId}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, emailId: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Username"
                required
                value={newEmployee.username}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, username: e.target.value })
                }
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={newEmployee.password}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={newEmployee.confirmPassword}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Mobile Number"
                required
                value={newEmployee.mobileNumber}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, mobileNumber: e.target.value })
                }
              />
              <div>
                <button type="submit" className="add-user-button">
                  {newEmployee.id ? "Update" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
