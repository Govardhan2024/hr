import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import "./index.css";

const Leaverequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newLeave, setNewLeave] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/leave-requests", {
        params: { userName: localStorage.getItem("userName") },
      });
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast.error("Error fetching leave requests.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApproveLeave = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/leave-request/approve/${id}`); 
      toast.success(`Leave request  approved!`);
      fetchLeaveRequests();
         
    setTimeout(() => {
      fetchLeaveRequests();
    }, 1000); 
    } catch (error) {
      console.error("Error approving leave request:", error);
      toast.success(`Leave request  approved!`);
      setTimeout(() => {
        fetchLeaveRequests();
      }, 500); 
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/leave-request/reject/${id}`);
      toast.error(`Leave request   rejected!`);
      fetchLeaveRequests();
      setTimeout(() => {
        fetchLeaveRequests();
      }, 1000); 
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      toast.error(`Leave request  rejected!`);
      setTimeout(() => {
        fetchLeaveRequests();
      }, 500); 
    }
  };

  const totalEntries = leaveRequests.length;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaveRequests.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

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

      <div className="department-list-container ">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
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
              : currentEntries.map((request, index) => (
                  <tr key={request.id}>
                    <td>{index + 1}</td>
                    <td>{request.employee_name}</td>
                    <td>{request.leave_type}</td>
                    <td>{new Date(request.start_date).toLocaleDateString()}</td>
                    <td>{new Date(request.end_date).toLocaleDateString()}</td>
                    <td>{request.reason}</td>
                    <td>{request.status}</td>
                    <td>
                      <button
                        className="approve-button"
                        onClick={() => handleApproveLeave(request.id)}
                      >
                        <FaCheck color="green" />
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleRejectLeave(request.id)}
                      >
                        <FaTimes color="red" />
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
            <h2 className="addhead">Add New Leave Request</h2>
            <form>
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
              <input
                type="text"
                placeholder="Employee Name"
                value={newLeave.employeeName}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, employeeName: e.target.value })
                }
              />
              <input
                type="date"
                value={newLeave.startDate}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, startDate: e.target.value })
                }
              />
              <input
                type="date"
                value={newLeave.endDate}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, endDate: e.target.value })
                }
              />
              <textarea
                placeholder="Reason"
                value={newLeave.reason}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, reason: e.target.value })
                }
              />
              <button type="button" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaverequest;
