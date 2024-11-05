import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import "./index.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newEmployee, setNewEmployee] = useState({
    id: null,
    employeeName: "",
    employeePersonalEmail: "",
    employeeWorkingEmail: "",
    employeePhoneNumber: "",
    joinDate: "",
    jobrole: "",
    role: "",
    pictureUpload: "",
    password: "",
  });

  useEffect(() => {

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/get_all_employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to load employees.");
      } finally {
        setLoading(false); 
      }
    };

    fetchEmployees();
  }, []);

  console.log(employees);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeePhoneNumber.includes(searchTerm)
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
      newEmployee.employeeName &&
      newEmployee.employeePersonalEmail &&
      newEmployee.employeePhoneNumber
    ) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/create-employee",
          newEmployee
        );
        if (response.data) {
          const addedEmployee = { id: response.data.id, ...newEmployee };
          setEmployees([...employees, addedEmployee]);
          setShowPopup(false);
          resetNewEmployee();
          toast.success("Employee successfully added!");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.error("There was an error creating the employee!", error);
        toast.error("Error adding employee.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/delete_employee/${id}`
      );

      if (response.status === 200) {
        setEmployees(employees.filter((employee) => employee.id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Employee not found");
      } else {
        toast.error("Failed to delete employee");
      }
    }
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setNewEmployee(employeeToEdit);
    setShowPopup(true);
  };

  const handleSaveEditEmployee = () => {
    setEmployees(
      employees.map((emp) => (emp.id === newEmployee.id ? newEmployee : emp))
    );
    setShowPopup(false);
    resetNewEmployee();
    toast.success("Employee details successfully updated!");
  };

  const resetNewEmployee = () => {
    setNewEmployee({
      id: null,
      employeeName: "",
      employeePersonalEmail: "",
      employeeWorkingEmail: "",
      employeePhoneNumber: "",
      joinDate: "",
      jobrole: "",
      role: "",
      pictureUpload: "",
      password: "",
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
              <button
                className="add-employee-button"
                onClick={() => setShowPopup(!showPopup)}
              >
                {showPopup ? "X Close" : "Add New"}
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
              <th>Phone No.</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: entriesPerPage }).map((_, index) => (
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
                ))
              : currentEntries.map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="td-img"
                        src="../../../public/images/image (2).svg"
                        alt="Profile"
                      />
                    </td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.employeePhoneNumber}</td>
                    <td>{employee.employeeWorkingEmail}</td>
                    <td>
                      {new Date(employee.joinDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td>{employee.jobrole}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEditEmployee(employee.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
        <div className="popup">
          <div className="popup-content">
            <h2 className="addhead">
              {newEmployee.id ? "Edit Employee" : "Add New Employee"}
            </h2>
            <div className="popupline"></div>
            <form
              onSubmit={
                newEmployee.id ? handleSaveEditEmployee : handleAddEmployee
              }
            >
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <input
                  className="addinput"
                  type="text"
                  placeholder="Employee Name"
                  value={newEmployee.employeeName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      employeeName: e.target.value,
                    })
                  }
                />
                <input
                  className="addinput"
                  type="email"
                  placeholder="Personal Email"
                  value={newEmployee.employeePersonalEmail}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      employeePersonalEmail: e.target.value,
                    })
                  }
                />
              </div>
              <input
                className="addinput2"
                type="email"
                placeholder="Working Email"
                value={newEmployee.employeeWorkingEmail}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    employeeWorkingEmail: e.target.value,
                  })
                }
              />
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  className="addinput3"
                  type="text"
                  placeholder="Phone Number"
                  value={newEmployee.employeePhoneNumber}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      employeePhoneNumber: e.target.value,
                    })
                  }
                />
                <input
                  className="addinput3"
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, joinDate: e.target.value })
                  }
                />
                <input
                  className="addinput3"
                  type="text"
                  placeholder="Job Role"
                  value={newEmployee.jobrole}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, jobrole: e.target.value })
                  }
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  className="addinput"
                  type="text"
                  placeholder="Role"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, role: e.target.value })
                  }
                />

                <input
                  className="addinput"
                  type="password"
                  placeholder="Password"
                  value={newEmployee.password}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, password: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  className="choosefile"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      pictureUpload: e.target.files[0]?.name,
                    })
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
              >
                <button className="add-btn" type="submit">
                  {newEmployee.id ? "Save" : "Add"}
                </button>
                <button
                  className="close-btn"
                  type="button"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
