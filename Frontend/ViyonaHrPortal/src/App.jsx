import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import Settings from './Components/Settings';
import SideTopNavbar from './Components/SideTopNavbar';
import './App.css';
import Holidays from './Components/Holidays/Holidays';
import AdminLogin from './Components/AdminLogin';
import EmployeeMain from './Components/Employee/EmployeeMain';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from './Components/Unauthorisedroute';

import Events from './Components/Events/Events';
import Employees from './Components/Allemployes';
import ErrorBoundary from './ErrorBoundary'
import Leaverequest from './Components/Leaverequest';
import Departments from './Components/Departments';
import Attendence from './Components/Attendence';
import Payments from './Components/Payments';
import Expenses from './Components/Expenses';
import Invoices from './Components/Invoices';
import Employeesalary from './Components/Employesalary';
import Users from './Components/Users';








const App = () => {
  const location = useLocation();
  
  // Paths where the navbar will not be visible (e.g., login page)
  const hideNavbarRoutes = ["/"];
  const hideNavbarEmployeeRoute=['/employee/dashboard']
  const hideNavbarPaths = [...hideNavbarRoutes, ...hideNavbarEmployeeRoute];


  

  return (
    <div className="app-container">
      {/* Conditionally render navbar */}
      

      {!hideNavbarPaths.includes(location.pathname) && <SideTopNavbar />} 
      
      <div className="main-content">
        <Routes>
          {/* Public route for AdminLogin */}
          <Route path="/" element={<AdminLogin />} />
          {/* Protected routes for Admin */}
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<Home />} requiredRole="admin" />} />
          <Route path="/admin/page1" element={<ProtectedRoute element={<Page1 />} requiredRole="admin" />} />
          <Route path="/admin/page2" element={<ProtectedRoute element={<Page2 />} requiredRole="admin" />} />
          <Route path="/admin/settings" element={<ProtectedRoute element={<Settings />} requiredRole="admin" />} />
          <Route path="/admin/holidays" element={<ProtectedRoute element={<Holidays />} requiredRole="admin" />} />
          <Route path="/admin/events" element={<ProtectedRoute element={< Events/>} requiredRole="admin" />} />
          {/* Protected route for Employee */}
          <Route path='/employee/dashboard' element={<ProtectedRoute element={<EmployeeMain />} requiredRole="employee" />} />
          <Route path="/admin/Employees" element={<ProtectedRoute element={ <ErrorBoundary> < Employees/> </ErrorBoundary>} requiredRole="admin" />} />
          <Route path="/admin/Leaverequest" element={<ProtectedRoute element={ < Leaverequest/>} requiredRole="admin" />} />
          <Route path="/admin/Attendence" element={<ProtectedRoute element={ < Attendence/>} requiredRole="admin" />} />
          <Route path="/admin/Departments" element={<ProtectedRoute element={  < Departments/>} requiredRole="admin" />} />
          <Route path="/admin/Payments" element={<ProtectedRoute element={  < Payments/>} requiredRole="admin" />} />
          <Route path="/admin/Expenses" element={<ProtectedRoute element={  <Expenses />} requiredRole="admin" />} />
          <Route path="/admin/Invoices" element={<ProtectedRoute element={  <Invoices />} requiredRole="admin" />} />
          <Route path="/admin/Employeesalary" element={<ProtectedRoute element={  <Employeesalary />} requiredRole="admin" />} />
          <Route path="/admin/Users" element={<ProtectedRoute element={  <Users />} requiredRole="admin" />} />
          <Route path='/unauthorised_access' element={<Unauthorized/>}/>
        </Routes>
      </div>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
