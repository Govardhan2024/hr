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

const App = () => {
  const location = useLocation();
  
  // Paths where the navbar will not be visible (e.g., login page)
  const hideNavbarRoutes = ["/"];

  return (
    <div className="app-container">
      {/* Conditionally render navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <SideTopNavbar />}
      
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
          {/* Protected route for Employee */}
          <Route path='/employee/dashboard' element={<ProtectedRoute element={<EmployeeMain />} requiredRole="employee" />} />
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
