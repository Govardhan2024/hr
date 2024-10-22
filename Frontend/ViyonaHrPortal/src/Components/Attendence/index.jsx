import { FaArrowLeft } from "react-icons/fa";

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const Departments = () => {
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1);
    const daysInCurrentMonth = (firstDayOfNextMonth - new Date(currentYear, currentMonth, 1)) / (1000 * 60 * 60 * 24);
    const daysArray = Array.from({ length: daysInCurrentMonth }, (_, index) => index + 1);

    // Generate mock data for employees and their attendance
    const generateAttendance = (days) => {
        return Array.from({ length: days }, () => Math.random() > 0.5); // Randomly assign true or false for attendance
    };

    const employees = [
        { name: "John Doe", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Jane Smith", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Alice Johnson", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "John Doe", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Jane Smith", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Alice Johnson", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "John Doe", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Jane Smith", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Alice Johnson", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "John Doe", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Jane Smith", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Alice Johnson", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "John Doe", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Jane Smith", attendance: generateAttendance(daysInCurrentMonth) },
        { name: "Alice Johnson", attendance: generateAttendance(daysInCurrentMonth) },
        
    ];

    return (
        <div>
          
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head">Attendance</h1>
                </div>
                <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
            </div>

            <div className="department-list-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            {daysArray.map((day) => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index} className="row-padding attendance-row"> {/* Add the new class here */}
                                <td>{employee.name}</td>
                                {employee.attendance.map((isPresent, dayIndex) => (
                                    <td key={dayIndex}
                                        style={{
                                           
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                         
                                            
                                        }}>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor:isPresent ? "#EAE1FF" : "#FFDCDF",
                                            borderRadius: "50%",
                                            textAlign: 'center',
                                            alignItems:"center",
                                            lineHeight: '9px',
                                            color: isPresent ? '#3509A4' : '#F42F42',
                                            fontWeight: "bold"
                                        }}>
                                            {isPresent ? "✓" : "✗"}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Departments;
