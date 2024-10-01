import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from "./Components/AdminLogin";
import Home from './Components/Home';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import Settings from './Components/Settings';
import SideTopNavbar from './Components/SideTopNavbar';
import './App.css';

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
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Home />} />
          <Route path="/admin/page1" element={<Page1 />} />
          <Route path="/admin/page2" element={<Page2 />} />
          <Route path="/admin/settings" element={<Settings />} />
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
