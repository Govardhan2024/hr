import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './index.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/admin/admin_login", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       setError(data.detail || "Login failed. Please try again.");
  //       return;
  //     }

      
  //     localStorage.setItem('access_token', data.access_token);


  //     navigate('/admin/dashboard');
      
  //   } catch (err) {
  //     console.error("Error during login:", err);
  //     setError("An error occurred. Please try again later.");
  //   }
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
          {/* {error && <p style={{color:"red",textAlign:"center"}} className="error-message">{error}</p>} */}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
