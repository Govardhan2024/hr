import { Navigate } from 'react-router-dom';

// Component for private routes (like login) that should be hidden if logged in
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  return !isAuthenticated ? element : <Navigate to="/admin/dashboard" />;
};

export default PrivateRoute;
