import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null;
};

const ProtectedRoute = ({ element, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/get-current-user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRole(data.role); // Assuming the backend returns the role
        } else {
          console.error("Failed to fetch user role");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Loading state while fetching user role
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated and has the required role
  return isAuthenticated() && role === requiredRole ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
