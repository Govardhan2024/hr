import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

import './index.css';

const SideTopNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard'); 
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isAccountsDropdownVisible, setAccountsDropdownVisible] = useState(false)
  const [isPaymentsDropdownVisible, setPaymentsDropdownVisible] = useState(false)
  const [isReportsDropdownVisible,  setReportsDropdownVisible]  = useState(false)


  const tabs = ['HR', 'Project', 'Blogs'];

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
    setDropdownVisible(false);
    setPaymentsDropdownVisible(false);
    setAccountsDropdownVisible(false);
    setPaymentsDropdownVisible(false);
    setReportsDropdownVisible(false);


  };

  const handleMenuItemClickArrow = (item) => {
    setActiveMenuItem(item);
    setDropdownVisible(!isDropdownVisible);
    setAccountsDropdownVisible(false);
    setPaymentsDropdownVisible(false);
    setReportsDropdownVisible(false);
  }

  const handleMenuItemClickAccounts = (item) => {
    setActiveMenuItem(item);
    setAccountsDropdownVisible(!isAccountsDropdownVisible);
    setDropdownVisible(false);
    setPaymentsDropdownVisible(false);
    setReportsDropdownVisible(false);
  }
  const handleMenuItemPayments = (item) => {
    setActiveMenuItem(item);
    setPaymentsDropdownVisible(!isPaymentsDropdownVisible);
    setDropdownVisible(false);
    setAccountsDropdownVisible(false);
    setReportsDropdownVisible(false);
  }
  const handleMenuItemClickReports = (item) => {
    setActiveMenuItem(item);
    setReportsDropdownVisible(!isReportsDropdownVisible);
    setDropdownVisible(false);
    setAccountsDropdownVisible(false);  
    setPaymentsDropdownVisible(false);
  }




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
                <Link onClick={handleDropdownToggle} to="/logout"><li>Logout</li></Link>
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
              <Link className={`hover-items ${activeMenuItem === 'activites' ? 'active2' : ''}`} to="/admin/activites" onClick={() => handleMenuItemClick('activites')}>
                <img src='../../../public/images/activitieswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/activitiescolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Activites</li>
              </Link>


              {/* <li className={`menu-item ${activeMenuItem === 'menu1' ? 'active2' : ''}`} onClick={() => { handleAccordionClick(1); handleMenuItemClick('menu1'); }}>
                Menu 1
                {openAccordion === 1 && (
                  <ul className="submenu">
                    <li>
                      <Link className={`submenu-item ${activeMenuItem === 'submenu1.1' ? 'active2' : ''}`}  to="/admin/page1" onClick={() => handleMenuItemClick('submenu1.1')}>Submenu 1.1</Link>
                    </li>
                    <li>
                      <Link className={`submenu-item ${activeMenuItem === 'submenu1.2' ? 'active2' : ''}`}  to="/admin/page2" onClick={() => handleMenuItemClick('submenu1.2')}>Submenu 1.2</Link>
                    </li>
                  </ul>
                )}
              </li> */}



              <Link className={`hover-items ${activeMenuItem === 'Employees' ? 'active2' : ''}`} onClick={() => handleMenuItemClickArrow('Employees')}>
                <img src='../../../public/images/employeeswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/employeesscolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Employess</li>
                {!isDropdownVisible ? (
                  <img
                    src='../../../public/images/Border.svg' // Left arrow icon
                    className='left-icon'
                    alt="Left Icon"
                  />
                ) : (
                  <img
                    src='../../../public/images/Border2.svg' // Bottom arrow icon
                    className='bottom-icon'
                    alt="Bottom Icon"
                  />
                )}
              </Link>


              <ul className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}>
                <Link className="hover-items" to="/admin/Employees">
                  <p>--</p>
                  <li className="menu-item">All Employees</li>
                </Link>
                <Link className="hover-items" to="/admin/Leaverequest">
                  <p>--</p>
                  <li className="menu-item">Leave Requests</li>
                </Link>
                <Link className="hover-items" to="/admin/Attendence">
                  <p>--</p>
                  <li className="menu-item">Attendance</li>
                </Link>
                <Link className="hover-items" to="/admin/Departments">
                  <p>--</p>
                  <li className="menu-item">Departments</li>
                </Link>

              </ul>

              <Link className={`hover-items ${activeMenuItem === 'accounts' ? 'active2' : ''}`} onClick={() => handleMenuItemClickAccounts('accounts')}>
                <img src='../../../public/images/accountswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/accountcolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Accounts</li>
                {!isAccountsDropdownVisible ? (
                  <img
                    src='../../../public/images/Border.svg' // Left arrow icon
                    className='left-icon2'
                    alt="Left Icon"
                  />
                ) : (
                  <img
                    src='../../../public/images/Border2.svg' // Bottom arrow icon
                    className='bottom-icon'
                    alt="Bottom Icon"
                  />
                )}

              </Link>

              <ul className={`dropdown-menu ${isAccountsDropdownVisible ? 'show' : ''}`}>

                <Link className="hover-items" to="/admin/Payments">
                  <p>--</p>
                  <li className="menu-item">Payments</li>
                </Link>
                <Link className="hover-items" to="/admin/Expenses">
                  <p>--</p>
                  <li className="menu-item">Expenses</li>
                </Link>
                <Link className="hover-items" to="/admin/Invoices">
                  <p>--</p>
                  <li className="menu-item">Invoices</li>
                </Link>

              </ul>

              <Link className={`hover-items ${activeMenuItem === 'payroll' ? 'active2' : ''}`} onClick={() => handleMenuItemPayments('payroll')}>
                <img src='../../../public/images/payrollwhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/payrollcolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Payroll</li>
                {!isPaymentsDropdownVisible ? (
                  <img
                    src='../../../public/images/Border.svg' // Left arrow icon
                    className='left-icon3'
                    alt="Left Icon"
                  />
                ) : (
                  <img
                    src='../../../public/images/Border2.svg' // Bottom arrow icon
                    className='bottom-icon'
                    alt="Bottom Icon"
                  />
                )}
              </Link>
              <ul className={`dropdown-menu ${isPaymentsDropdownVisible ? 'show' : ''}`}>

                <Link className="hover-items" to="/admin/Payments">
                  <p>--</p>
                  <li className="menu-item">Payslip</li>
                </Link>
                <Link className="hover-items" to="/admin/Employeesalary">
                  <p>--</p>
                  <li className="menu-item">Employesalary</li>
                </Link>


              </ul>


              <Link className={`hover-items ${activeMenuItem === 'reports' ? 'active2' : ''}`} to="/admin/reports" onClick={() => handleMenuItemClickReports('reports')}>
                <img src='../../../public/images/reportswhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/reportscolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Report</li>
                {!isReportsDropdownVisible ? (
                  <img
                    src='../../../public/images/Border.svg' // Left arrow icon
                    className='left-icon3'
                    alt="Left Icon"
                  />
                ) : (
                  <img
                    src='../../../public/images/Border2.svg' // Bottom arrow icon
                    className='bottom-icon'
                    alt="Bottom Icon"
                  />
                )}

              </Link>
              <ul className={`dropdown-menu ${isReportsDropdownVisible ? 'show' : ''}`}>

                <Link className="hover-items" to="/admin/Expenses">
                  <p>--</p>
                  <li className="menu-item">ExpenseReport</li>
                </Link>
                <Link className="hover-items" to="/admin/Invoices">
                  <p>--</p>
                  <li className="menu-item">InvoiceReport</li>
                </Link>


              </ul>

              <Link className={`hover-items ${activeMenuItem === 'users' ? 'active2' : ''}`} to="/admin/Users" onClick={() => handleMenuItemClick('users')}>
                <img src='../../../public/images/userwhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/usercolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Users</li>
              </Link>

              <Link className={`hover-items ${activeMenuItem === 'authentication' ? 'active2' : ''}`} to="/admin/authentication" onClick={() => handleMenuItemClick('authentication')}>
                <img src='../../../public/images/authwhite.svg' className='color-image' alt="Dashboard Icon" />
                <img src='../../../public/images/authcolor.svg' className='white-image' alt="Dashboard Icon" />
                <li className="menu-item">Authentication</li>
              </Link>


            </ul>
          )}
          {activeTab === 1 && <div>Content for Tab 2</div>}
          {activeTab === 2 && <div>Content for Tab 3</div>}
        </div>
      </div>
    </div>
  );
};

export default SideTopNavbar;