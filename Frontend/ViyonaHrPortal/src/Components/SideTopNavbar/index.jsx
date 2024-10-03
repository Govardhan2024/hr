import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaCalendarAlt, FaSadCry } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

import './index.css';

const SideTopNavbar = () => {
  const navigate=useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [payrollDropdown, setPayrollDropdown] = useState(false);
  const [reportsDropdown, setReportsDropdown] = useState(false);

  const tabs = ['HR', 'Project', 'Blogs'];

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
    setDropdownVisible(false);
    setAccountDropdown(false);
  };

  const handleMenuItemClickAccounts = (item) => {
    setActiveMenuItem(item);
    setAccountDropdown(!accountDropdown);
    setDropdownVisible(false);
  };

  const handleMenuItemClickPayroll = (item) => {
    setActiveMenuItem(item);
    setPayrollDropdown(!payrollDropdown);
    setAccountDropdown(false);
    setDropdownVisible(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Remove the JWT from local storage
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="navbar-container">
      {/* Top Navigation Bar */}
      <div className="top-bar">
        <div className="flex-nav-items">
          <div className="main-input-text">
            <input className="search-input" placeholder="Search here..." type="text" />
            <IoSearch />
          </div>
          <div className="icons-flex-card">
            <div><FaCalendarAlt size={18} /></div>
            <div><img src="../../../public/images/messageicon.svg" className="icon-image" alt="message icon" /></div>
            <div><MdEmail size={20} /></div>
            <div><IoIosNotifications size={20} /></div>
            <div><CiLogin size={20} /></div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`side-navbar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="profile-card-menu">
          <div>
            <img src="../../../public/images/user.svg" alt="User avatar" onClick={handleDropdownToggle} />
          </div>
          <div style={{ lineHeight: "40%", marginLeft: "15px" }}>
            <p className="welcome-class">Welcome,</p>
            <div onClick={handleDropdownToggle} className="profile-info">
              <p style={{ fontSize: '14px', fontWeight: "700" }}>Viyona Admin</p>
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="dropdown animated-dropdown">
              <ul>
                <Link onClick={handleDropdownToggle} to="/admin/profile"><li>My Profile</li></Link>
                <Link onClick={handleDropdownToggle} to="/admin/settings"><li>Messages</li></Link>
                <Link onClick={handleDropdownToggle} to="/admin/settings"><li>Settings</li></Link>
                <Link onClick={handleLogout} ><li>Logout</li></Link>
              </ul>
            </div>
          )}
        </div>

        <div className='experience-flex'>
          <div className='experience-card'><h1 className='head'>5+</h1><p className='para'>Experience</p></div>
          <div className='experience-card'><h1 className='head'>400+</h1><p className='para'>Employees</p></div>
          <div className='experience-card'><h1 className='head'>80+</h1><p className='para'>Clients</p></div>
        </div>

        <div className='tabs-container'>
          <div className='tabs'>
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className='tab-content'>
          {activeTab === 0 && (
            <ul className="navbar-menu">
              <Link className={`hover-items ${activeMenuItem === 'dashboard' ? 'active2' : ''}`} to="/admin/dashboard" onClick={() => handleMenuItemClick('dashboard')}>
                <img src='../../../public/images/dashboardtexticon.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/colordashboardtexticon.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Dashboard</li>
              </Link>

              <Link className={`hover-items ${activeMenuItem === 'holidays' ? 'active2' : ''}`} to="/admin/holidays" onClick={() => handleMenuItemClick('holidays')}>
                <img src='../../../public/images/holidayswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/blackholidays.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Holidays</li>
              </Link>

              <Link className={`hover-items ${activeMenuItem === 'events' ? 'active2' : ''}`} to="/admin/events" onClick={() => handleMenuItemClick('events')}>
                <img src='../../../public/images/calanderwhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/calandercolo.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Events</li>
              </Link>

              <Link className={`hover-items ${activeMenuItem === 'activities' ? 'active2' : ''}`} to="/admin/activities" onClick={() => handleMenuItemClick('activities')}>
                <img src='../../../public/images/activitieswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/activitiescolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Activities</li>
              </Link>

              <Link className={`hover-items ${activeMenuItem === 'employees' ? 'active2' : ''}`} to="/admin/dashboard" onClick={() => handleMenuItemClick('employees')}>
                <img src='../../../public/images/employeeswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/employeesscolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Employees</li>
                <span className={`dropdown-icon ${isDropdownVisible ? 'open' : ''}`}></span>
              </Link>

              {isDropdownVisible && (
                <ul className="dropdown-menu">
                  <Link className="hover-items" to="/admin/all-employees">
                    <li className="menu-item">All Employees</li>
                  </Link>
                  <Link className="hover-items" to="/admin/leave-requests">
                    <li className="menu-item">Leave Requests</li>
                  </Link>
                  <Link className="hover-items" to="/admin/attendance">
                    <li className="menu-item">Attendance</li>
                  </Link>
                  <Link className="hover-items" to="/admin/departments">
                    <li className="menu-item">Departments</li>
                  </Link>
                </ul>
              )}

              <Link className={`hover-items ${activeMenuItem === 'accounts' ? 'active2' : ''}`} to="/admin/dashboard" onClick={() => handleMenuItemClickAccounts('accounts')}>
                <img src='../../../public/images/accountswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/accountcolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Accounts</li>
              </Link>

              {accountDropdown && (
                <ul className="dropdown-menu">
                  <Link className="hover-items" to="/admin/all-accounts">
                    <li className="menu-item">All Accounts</li>
                  </Link>
                  <Link className="hover-items" to="/admin/create-account">
                    <li className="menu-item">Create Account</li>
                  </Link>
                </ul>
              )}

              <Link className={`hover-items ${activeMenuItem === 'payroll' ? 'active2' : ''}`} to="/admin/dashboard" onClick={() => handleMenuItemClickPayroll('payroll')}>
                <img src='../../../public/images/payrollwhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/payrollcolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Payroll</li>
              </Link>

              {payrollDropdown && (
                <ul className="dropdown-menu">
                  <Link className="hover-items" to="/admin/payroll-structure">
                    <li className="menu-item">Payroll Structure</li>
                  </Link>
                  <Link className="hover-items" to="/admin/payroll-history">
                    <li className="menu-item">Payroll History</li>
                  </Link>
                </ul>
              )}

              <Link className={`hover-items ${activeMenuItem === 'reports' ? 'active2' : ''}`} to="/admin/dashboard" onClick={() => handleMenuItemClickPayroll('reports')}>
                <img src='../../../public/images/reportswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/reportscolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Reports</li>
              </Link>

              {reportsDropdown && (
                <ul className="dropdown-menu">
                  <Link className="hover-items" to="/admin/reports">
                    <li className="menu-item">All Reports</li>
                  </Link>
                  <Link className="hover-items" to="/admin/generate-report">
                    <li className="menu-item">Generate Report</li>
                  </Link>
                </ul>
              )}
            </ul>
          )}

          {/* Additional tabs can be added here */}
        </div>
      </div>
    </div>
  );
};

export default SideTopNavbar;
