import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/findPassword.css';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [timerRunning, setTimerRunning] = useState(false);
  const navigate = useNavigate();

  // 타이머 
  useEffect(() => {
    if (!timerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ The verification time has expired. Please request a new code.");
          setStep(1);
          setCode('');
          setTimerRunning(false);
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timerRunning]);

  const handleSendCode = async () => {
    if (!id || !name || !email) return alert('All fields are required.');
    try {
      await axios.post('http://localhost:9090/find-password/send-code', { id, name, email }, { withCredentials: true });
      alert('The verification code has been sent to your email.');
      setStep(2);
      setTimeLeft(180);
      setTimerRunning(true); 
    } catch (err) {
      alert('No account was found with the information you provided.');
      console.error(err);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return alert('Please enter the verification code.');
    try {
      await axios.post('http://localhost:9090/find-password/verify-code', { id, code }, { withCredentials: true });
      alert('Verification successful. Please enter your new password.');
      setStep(3);
    } catch (err) {
      alert('The verification code is incorrect.');
      console.error(err);
    }
  };

  const handleResetPassword = async () => {
    if (newPwd.length < 6) {
      alert("The password must be at least 6 characters long.");
      return;
    }
    if (newPwd !== confirmPwd) {
      alert("The passwords you entered do not match.");
      return;
    }

    try {
      await axios.post('http://localhost:9090/find-password/submit-new', { id, newPwd }, { withCredentials: true });
      alert("The password has been successfully reset.");
      navigate('/sign-in');
    } catch (err) {
      alert("Failed to change the password.");
      console.error(err);
    }
  };

  return (
    <div className="findpassword-reset-wrapper">
      <h2>Reset Password</h2>
      <div className="findpassword-reset-box">
        {step === 1 && (
          <>
            <div className="findpassword-form-group">
              <label>Name :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="findpassword-form-group">
              <label>ID :</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="findpassword-form-group">
              <label>Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="findpassword-button-row">
              <span className="findpassword-btn-confirm" onClick={handleSendCode}>Confirm</span>
              <span className="findpassword-divider">|</span>
              <span className="findpassword-btn-cancel" onClick={() => navigate('/sign-in')}>Cancel</span>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p>Check your email for a verification code.</p>
            <p className="findpassword-timer-text">⏳ Time remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
            <div className="findpassword-form-group">
              <label>Code :</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="findpassword-button-row">
              <span className="findpassword-btn-cancel" onClick={handleVerifyCode}>Confirm</span>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="findpassword-form-group">
              <label>New Password :</label>
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>

            <div className="findpassword-form-group">
              <label>Confirm Password :</label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>

            <div className="findpassword-button-row">
              <span className="findpassword-btn-confirm" onClick={handleResetPassword}>Reset</span>
              <span className="findpassword-divider">|</span>
              <span className="findpassword-btn-cancel" onClick={() => setStep(1)}>Cancel</span>
            </div>
          </>
        )}
        <div className="findpassword-link-row">
            Forgot your ID?
            <a href="/find-id">Find ID</a>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
