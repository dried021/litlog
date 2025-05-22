import React, { useContext, useState } from 'react';
import styles from './signIn.module.css'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../libs/UserContext';
import CustomModal from "../../components/Modal/CustomModal";

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    mode: "close",
    resultValue: "1",
  });

  const from = location.state?.from || '/';

  if (user === undefined) return <div>Checking session...</div>; 
  if (user) return null; 

  const openModal = ({ message, mode = "close", resultValue = "1", callbackOnSuccess = null, callbackOnFail = null }) => {
    setModalData({
      show: true,
      message,
      mode,
      resultValue,
      callbackOnSuccess,
      callbackOnFail
    });
  };

  const handleCloseModal = () => {
    setModalData(prev => ({ ...prev, show: false }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!id || !password) {
    openModal({ message: 'Please enter your ID and password.' });
    return;
  }

  try {
    const res = await axios.post('http://localhost:9090/sign-in', {
      id,
      password
    }, { withCredentials: true });

    const { status, user_status, message } = res.data;

    if (status === '성공') {
      // withdraw
      if (user_status === 3) {
        openModal({ message: 'This account has been deleted.' });
        return;
      }

      // ban
      if (user_status === 2) {
        openModal({ message: 'This account has been banned.' });
        return;
      }

      const sessionRes = await axios.get('http://localhost:9090/session-check', { withCredentials: true });
      if (sessionRes.data.loggedIn) {
        setUser(sessionRes.data.id);
        navigate(from, { replace: true });
      } else {
        openModal({ message: 'Session setup failed. Please try again.' });
      }

    } else {
      openModal({ message: message || 'Login failed. Please check your credentials.' });
    }
  } catch (err) {
    openModal({ message: 'Login failed due to a server error. Please try again later.' });
    console.error(err);
  }
};

  const preventSpace = (e) => {
    if (e.key === ' ') e.preventDefault();
  };

  return (
    <div className={styles['signin-wrapper']}>
      <h2>SIGN IN</h2>
      <div className={styles['signin-box']}>
        <form className={styles['signin-form']} onSubmit={handleLogin}>
          <div className={styles['form-group']}>
            <label>ID :</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={preventSpace}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={preventSpace}
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className={styles['signin-links']}>
          <Link to="/find-id">Find ID</Link> | <Link to="/find-password">Reset Password</Link>
        </div>
        <div className={styles['signin-footer']}>
          Don’t have an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </div>

      <div className={styles['home-link']}>
        <Link to="/">HOME</Link>
      </div>
      <CustomModal
        show={modalData.show}
        onHide={handleCloseModal}
        successMessage={modalData.message}
        failMessage={modalData.message}
        resultValue={modalData.resultValue}
        mode={modalData.mode}
        callbackOnSuccess={modalData.callbackOnSuccess}
        callbackOnFail={modalData.callbackOnFail}
      />
    </div>
  );
};

export default SignIn;
