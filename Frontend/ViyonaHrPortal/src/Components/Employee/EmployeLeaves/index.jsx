import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import "./index.css";

const EmployeLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newLeave, setNewLeave] = useState({
    id: null,
    leaveType: "",
    fromDate: "",
    toDate: "", 
    reason: "",
  });

  useEffect(() => {
    const fetchLeaves = async () => {
      const employeeId = localStorage.getItem("userId"); 
      if (employeeId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/leave-requests/${employeeId}`
          );
          setLeaves(response.data); 
        } catch (error) {
          console.error("Error fetching leave requests!", error);
          toast.error("Error fetching leave requests.");
        } finally {
          setLoading(false); 
        }
      }
    };

    fetchLeaves();
  }, []);

  console.log(leaves);

  const handleAddLeave = async (event) => {
    event.preventDefault();

    if (
      newLeave.leaveType &&
      newLeave.fromDate &&
      newLeave.toDate &&
      newLeave.reason
    ) {
      const employeeId = localStorage.getItem("userId"); 
      try {
        const leaveRequest = {
          leave_type: newLeave.leaveType, 
          start_date: newLeave.fromDate, 
          end_date: newLeave.toDate, 
          reason: newLeave.reason, 
        };
        const response = await axios.post(
          `http://127.0.0.1:8000/leave-request/${employeeId}`,
          leaveRequest
        );

        if (response.data) {
          const addedLeave = {
            id: response.data.id,
            employeeId,
            ...leaveRequest,
          };
          setLeaves([...leaves, addedLeave]);
          setShowPopup(false);
        }
      } catch (error) {
        console.error("Error creating leave request!", error);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleApproveLeave = (id) => {
    toast.success(`Leave request with ID ${id} approved!`);
  };

  const handleRejectLeave = (id) => {
    toast.error(`Leave request with ID ${id} rejected!`);
  };

 
  const totalEntries = leaves.length;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaves.slice(indexOfFirstEntry, indexOfLastEntry);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

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
          <h1 className="main-home-head">Leave Requests</h1>
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
          <div className="header-actions">
            <div style={{marginLeft:1400}}>
            <button
              className="add-employee-button"
              onClick={() => setShowPopup(!showPopup)}
            >
              {showPopup ? "X Close" : "Add Leave"}
              
            </button>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Leave Type</th>
              <th>Reason</th>
              <th>From date</th>
              <th>To Date</th>
              <th>Status</th>
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
                  </tr>
                ))
              : currentEntries.map((leave, index) => (
                  <tr key={leave.employee_id}>
                    <td>{index + 1 + indexOfFirstEntry}</td>
                    <td>{leave.leave_type}</td>
                    <td>{leave.reason}</td>
                    <td>
                      {new Date(leave.start_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(leave.end_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>

                    <td>{leave.status}</td>
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
              {newLeave.id ? "Edit Leave Request" : "Add New Leave Request"}
            </h2>
            <form onSubmit={handleAddLeave}>
              <select
                className="select"
                value={newLeave.leaveType}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, leaveType: e.target.value })
                }
              >
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
              </select>
              <div style={{ display:'flex',gap:17}}>
              <input
                className="dateadd"
                type="date"
                value={newLeave.fromDate}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, fromDate: e.target.value })
                }
              />
              <input
               className="dateadd"
                type="date"
                value={newLeave.toDate}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, toDate: e.target.value })
                }
              />
              </div>
              <textarea
                className="textare"
                placeholder="Reason"
                value={newLeave.reason}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, reason: e.target.value })
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
              >
                <button className="add-btn" type="submit">
                  {newLeave.id ? "Save" : "Add"}
                </button>
                <button type="button" onClick={() => setShowPopup(false)}>
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

export default EmployeLeaves;
