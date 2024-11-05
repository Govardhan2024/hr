import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        console.log("Error response data:", data); // Log for debugging
        const errorMessage = data.detail || "Login failed. Please try again.";
        setError(errorMessage);
        return;
      }

      // Store the access token and user role in local storage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('userRole', data.role); // Store the user role
      localStorage.setItem("userId",data.id)

      // Navigate based on user role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.role === 'employee') {
        navigate('/employee/dashboard'); // Adjust this route as needed
      } else {
        setError("Unauthorized role. Please contact the administrator.");
      }

    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='main-login-page'>
      <form className='flex-card-center' onSubmit={handleLogin}>
        <div className='form-items-card'>
          <h1 className='login-head'>
            Hii Admin 👋<br />Log In To Your Account
          </h1>
          <input
            className="input-values"
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="input-values"
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className='login-button' type='submit'>Log In</button>
          {error && <p style={{ color: "red", textAlign: "center" }} className="error-message">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
