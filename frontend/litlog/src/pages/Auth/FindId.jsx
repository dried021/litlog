import React, { useState } from 'react';
import styles from './findId.module.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomModal from "../../components/Modal/CustomModal";

const FindId = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    mode: "close",
    resultValue: "1",
  });

  const handleFindId = async () => {
    if (!name || !email) return openModal({ message: 'Please enter both your name and email.'});

    try {
      await axios.post('http://localhost:9090/find-id', { name, email }, { withCredentials: true });
      setSent(true);
    } catch (err) {
      if (err.response?.status === 404) {
        openModal({ message: 'No account found with the provided information.'});
      } else {
        openModal({ message: 'An error has occurred.'});
        console.error(err);
      }
    }
  };

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

  const preventSpace = (e) => {
    if (e.key === ' ') e.preventDefault();
  };

  return (
    <div className={styles['findid-find-wrapper']}>
      <h2>FIND ID</h2>

      {!sent ? (
        <div className={styles['findid-find-box']}>
          <div className={styles['findid-form-group']}>
            <label>Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={preventSpace}
            />
          </div>

          <div className={styles['findid-form-group']}>
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={preventSpace}
            />
          </div>

          <div className={styles['findid-button-row']}>
            <span className={styles['findid-btn-confirm']} onClick={handleFindId}>Confirm</span>
            <span className={styles['findid-divider']}>|</span>
            <span className={styles['findid-btn-cancel']} onClick={() => navigate('/sign-in')}>Cancel</span>
          </div>


          <div className={styles['findid-link-row']}>
            Forgot your password? <a href="/find-password">Reset Password</a>
          </div>
        </div>
      ) : (
        <div className={styles['findid-result-box']}>
          <p>
            We sent your ID to your email address.
            <br />
            Please check your inbox!
          </p>
          <button onClick={() => navigate('/sign-in')}>Sign In</button>
        </div>
      )}
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

export default FindId;
