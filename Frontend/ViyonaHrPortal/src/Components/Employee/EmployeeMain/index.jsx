import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./index.css";

const EmployeeMain = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [workDuration, setWorkDuration] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);

  useEffect(() => {
    let workTimer;
    let breakTimer;

    if (isLoggedIn) {
      workTimer = setInterval(() => {
        setWorkDuration((prev) => prev + 1);
      }, 1000); // Increment work duration every second
    }

    if (isOnBreak) {
      breakTimer = setInterval(() => {
        setBreakDuration((prev) => prev + 1);
      }, 1000); // Increment break duration every second
    }

    return () => {
      clearInterval(workTimer);
      clearInterval(breakTimer);
    };
  }, [isLoggedIn, isOnBreak]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentTime(new Date().toLocaleTimeString()); // Set current time on login
    setWorkDuration(0);
    setBreakDuration(0);
  };

  const handleBreak = () => {
    setIsOnBreak(true);
    setBreakStartTime(new Date());
  };

  const handleEndBreak = () => {
    setIsOnBreak(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOnBreak(false);
    setCurrentTime(null);
    setBreakStartTime(null);
    setWorkDuration(0);
    setBreakDuration(0);
  };

  return (
    <div>
      <div className="dashboard-text">
        <div className="flex-dashboard-text">
          <FaArrowLeft width={12} height={14} color="#3408A4" />
          <h1 className="main-home-head">Dashboard</h1>
        </div>
        <div>
          <p>
            <span className="viyona-text">VIYONA</span>{" "}
            <span className="viyona-span">/ Dashboard</span>
          </p>
        </div>
      </div>

      <div className="timer-container">
        {!isLoggedIn ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <>
            <div>
              <p>Current Time: {currentTime}</p>
              <p>Work Duration: {Math.floor(workDuration / 60)}m {workDuration % 60}s</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
            {!isOnBreak ? (
              <div>
                <button onClick={handleBreak}>Start Lunch Break</button>
              </div>
            ) : (
              <div>
                <p>Break Duration: {Math.floor(breakDuration / 60)}m {breakDuration % 60}s</p>
                <button onClick={handleEndBreak}>End Lunch Break</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeMain;
