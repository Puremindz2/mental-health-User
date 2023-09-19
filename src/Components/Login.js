import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useHistory } from 'react-router-dom'; //Import useHistory
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import uIcon from "./Images/uIcon.png";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = ['#ffccd5', '#ccccff', '#ff6666']; // Add your desired colors here
  const [loginAttempts, setLoginAttempts] = useState(0);

  const maxLoginAttempts = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); // Change the interval time as desired

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error('Invalid email or password. Please try again.');
      } else {
        console.log('Logged in user:', user);
        toast.success('Login successful!');
        // Redirect to the home page after successful login
        history.push('/home');
      }
    } catch (error) {
      console.error('Error connecting to Supabase:', error);
      toast.error('Oops! Something went wrong. Please try again.');
    }
  };

  const formStyles = {
    background: `linear-gradient(to bottom, ${colors[currentColorIndex]} 0%, ${
      colors[(currentColorIndex + 1) % colors.length]
    } 100%)`,
  };

  return (
    <div className="login">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="login-form" style={formStyles}>
      <img class="userIcon" src={uIcon}/>
        <h2>Login</h2>
        
        <label>Email:</label>
        <input type="email"
         value={email} 
         onChange={(e) => setEmail(e.target.value)}
         required
         />
        <label>Password:</label>
        <input type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required
        />
        
        <button type="submit">Log in</button>
        <p1>Don't have an account? <Link to="/signup">Sign up!</Link></p1> 
      </form>
     </div>
  );

  
};

export default Login;