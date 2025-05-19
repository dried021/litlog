import React, { useContext, useState } from 'react';
import '../../styles/signIn.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../libs/UserContext';

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from || '/';

  if (user === undefined) return <div>Checking session...</div>; 
  if (user) return null; 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert('Please enter your ID and password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:9090/sign-in', {
        id,
        password
      }, { withCredentials: true });

      const { status, message } = res.data;
      if (status === '성공') {
        const sessionRes = await axios.get('http://localhost:9090/session-check', { withCredentials: true });
        if (sessionRes.data.loggedIn) {
          setUser(sessionRes.data.id);
          navigate(from, { replace: true });
        } else {
          alert('Session setup failed. Please try again.');
        }
      } else {
        alert(message);
      }
    } catch (err) {
      alert('Login failed due to a server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="signin-wrapper">
      <h2>SIGN IN</h2>
      <div className="signin-box">
        <form className="signin-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>ID :</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="signin-links">
          <a href="/find-id">Find ID</a> | <a href="/find-password">Reset Password</a>
        </div>
        <div className="signin-footer">
          Don’t have an account? <a href="/sign-up">Sign up</a>
        </div>
      </div>

      <div>
        <a href="/">HOME</a>
      </div>
    </div>
  );
};

export default SignIn;
