import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Settings from "./Components/Settings";
import SideTopNavbar from "./Components/SideTopNavbar";
import "./App.css";
import Holidays from "./Components/Holidays/Holidays";
import AdminLogin from "./Components/AdminLogin";
import EmployeeMain from "./Components/Employee/EmployeeMain";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Components/Unauthorisedroute";

import Events from "./Components/Events/Events";
import Employees from "./Components/Allemployes";
import ErrorBoundary from "./ErrorBoundary";
import Leaverequest from "./Components/Leaverequest";
import Departments from "./Components/Departments";
import Attendence from "./Components/Attendence";
import Payments from "./Components/Payments";
import Expenses from "./Components/Expenses";
import Invoices from "./Components/Invoices";
import Employeesalary from "./Components/Employesalary";
import Users from "./Components/Users";
import Employeesidebar from "./Components/Employee/Employeesidebar";
import Employeeholidays from "./Components/Employee/Employeholidays";
import EmployeEvents from "./Components/Employee/EmployeEvents";
import EmployeActivites from "./Components/Employee/EmployeActivites";
import TotalEmployes from "./Components/Employee/TotalEmployes";
import EmployeLeaves from "./Components/Employee/EmployeLeaves";
import EmployeAttendence from "./Components/Employee/EmployeAttendence";
import Employedepartment from "./Components/Employee/Employedepartment";
import EmpolyePayments from "./Components/Employee/EmployePayments";
import EmployeExpenses from "./Components/Employee/EmployeExpenses";
import EmployeInvoices from "./Components/Employee/EmployeInvoices";
import EmployePayslip from "./Components/Employee/EmployePayslip";
import EmployeEmployesalary from "./Components/Employee/EmployeEmployeSalary";

const App = () => {
  const location = useLocation();

  // Paths where the navbar will not be visible (e.g., login page)
  const hideNavbarRoutes = ["/"];
  const hideNavbarEmployeeRoute = [
    "/employee/Employeesidebar",
    "/employee/dashboard",
    "/employee/Employeeholidays",
    "/employee/EmployeEvents",
    "/employee/EmployeActivites",
    "/employee/TotalEmployes",
    "/employee/EmployeLeaves",
    "/employee/EmployeAttendence",
    "/employee/Employedepartment",
    "/employee/EmpolyePayments",
    "/employee/EmployeExpenses",
    "/employee/EmployeInvoices",
    "/employee/EmployePayslip",
    "/employee/EmployeEmployesalary",
    "/employee/reports",
    "/employee/profile",
  ];

  const hideNavbarPaths = [...hideNavbarRoutes, ...hideNavbarEmployeeRoute];

  return (
    <div className="app-container">
      {/* Conditionally render navbar */}

      {!hideNavbarPaths.includes(location.pathname) && <SideTopNavbar />}

      {hideNavbarEmployeeRoute.includes(location.pathname) && (
        <Employeesidebar />
      )}

      <div className="main-content">
        <Routes>
          {/* Public route for AdminLogin */}
          <Route path="/" element={<AdminLogin />} />
          {/* Protected routes for Admin */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<Home />} requiredRole="admin" />}
          />
          <Route
            path="/admin/page1"
            element={
              <ProtectedRoute element={<Page1 />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/page2"
            element={
              <ProtectedRoute element={<Page2 />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute element={<Settings />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/holidays"
            element={
              <ProtectedRoute element={<Holidays />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute element={<Events />} requiredRole="admin" />
            }
          />
          {/* Protected route for Employee */}
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute
                element={<EmployeeMain />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/admin/Employees"
            element={
              <ProtectedRoute
                element={
                  <ErrorBoundary>
                    {" "}
                    <Employees />{" "}
                  </ErrorBoundary>
                }
                requiredRole="admin"
              />
            }
          />
          <Route
            path="/admin/Leaverequest"
            element={
              <ProtectedRoute element={<Leaverequest />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/Attendence"
            element={
              <ProtectedRoute element={<Attendence />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/Departments"
            element={
              <ProtectedRoute element={<Departments />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/Payments"
            element={
              <ProtectedRoute element={<Payments />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/Expenses"
            element={
              <ProtectedRoute element={<Expenses />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/Invoices"
            element={
              <ProtectedRoute element={<Invoices />} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/Employeesalary"
            element={
              <ProtectedRoute
                element={<Employeesalary />}
                requiredRole="admin"
              />
            }
          />
          <Route
            path="/admin/Users"
            element={
              <ProtectedRoute element={<Users />} requiredRole="admin" />
            }
          />
          <Route path="/unauthorised_access" element={<Unauthorized />} />
          {/* employee dashboard routes  */}

          <Route
            path="/employee/Employeeholidays"
            element={
              <ProtectedRoute
                element={<Employeeholidays />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeEvents"
            element={
              <ProtectedRoute
                element={<EmployeEvents />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeActivites"
            element={
              <ProtectedRoute
                element={<EmployeActivites />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/TotalEmployes"
            element={
              <ProtectedRoute
                element={<TotalEmployes />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeLeaves"
            element={
              <ProtectedRoute
                element={<EmployeLeaves />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeAttendence"
            element={
              <ProtectedRoute
                element={<EmployeAttendence />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/Employedepartment"
            element={
              <ProtectedRoute
                element={<Employedepartment />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmpolyePayments"
            element={
              <ProtectedRoute
                element={<EmpolyePayments />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeExpenses"
            element={
              <ProtectedRoute
                element={<EmployeExpenses />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeInvoices"
            element={
              <ProtectedRoute
                element={<EmployeInvoices />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployePayslip"
            element={
              <ProtectedRoute
                element={<EmployePayslip />}
                requiredRole="employee"
              />
            }
          />
          <Route
            path="/employee/EmployeEmployesalary"
            element={
              <ProtectedRoute
                element={<EmployeEmployesalary />}
                requiredRole="employee"
              />
            }
          />
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
