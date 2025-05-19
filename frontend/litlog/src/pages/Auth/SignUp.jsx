import React, { useState } from 'react';
import {
  useSignUpHandlers_id,
  useSignUpHandlers_nickname,
  useSignUpHandlers_email
} from '../../libs/useSignUpHandlers.js';
import { useSignUpSubmit } from '../../libs/useSignUpSubmit';
import '../../styles/signUp.css';
import CustomModal from "../../components/Modal/CustomModal";

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [tel3, setTel3] = useState('');
  
  const [modalData, setModalData] = useState({
      show:false,
      message: "",
      mode: "close",
    });
  
    const handleCloseModal = () => {
      setModalData({...modalData, show:false,});
    };
  
    const openModal = (message) => {
      setModalData({
        show:true,
        message,
        mode: "close",
      });
    };

  const {
    id, idChecked, idAvailable, handleIdChange, checkIdDuplicate
  } = useSignUpHandlers_id(openModal);

  const {
    nickname, nicknameChecked, nicknameAvailable,
    handleNicknameChange, checkNicknameDuplicate
  } = useSignUpHandlers_nickname(openModal);

  const {
    email, emailCode, emailChecked, emailAvailable,
    emailVerified, timeLeft, timerRunning, formatTime,
    setEmailCode, handleEmailChange, sendEmailCode, verifyEmailCode
  } = useSignUpHandlers_email(openModal);

  const { handleSubmit } = useSignUpSubmit({
    id, idChecked, idAvailable, nickname, nicknameChecked, nicknameAvailable,
    name, password, confirmPassword, email, emailVerified, emailAvailable,
    emailChecked, tel1, tel2, tel3, openModal
  });

  return (
    <>
    <div className="signup-wrapper">
      <h2>CREATE ACCOUNT</h2>
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label>ID</label>
            <div className="signup-input-row">
              <input type="text" value={id} onChange={handleIdChange} />
              <button type="button" onClick={checkIdDuplicate}>Check</button>
            </div>
            {idAvailable === true && <span className="valid">✔ Available</span>}
            {idAvailable === false && <span className="invalid">✖ ID is already taken.</span>}
          </div>


          <div className="signup-form-group">
            <label>Nickname</label>
            <div className="signup-input-row">
              <input type="text" value={nickname} onChange={handleNicknameChange} />
              <button type="button" onClick={checkNicknameDuplicate}>Check</button>
            </div>
            {nicknameAvailable === true && <span className="valid">✔ Available</span>}
            {nicknameAvailable === false && <span className="invalid">✖ Nickname is already taken.</span>}
          </div>

          <div className="signup-form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="signup-form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="signup-form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="signup-form-group">
            <label>Email</label>
            <div className="signup-input-row">
              <input type="email" value={email} onChange={handleEmailChange} />
              <button type="button" onClick={sendEmailCode} disabled={timerRunning}>Start Verification</button>
            </div>
            {timerRunning && <span className="valid">{formatTime(timeLeft)} remaining</span>}
            {emailAvailable && (
              <button type="button" onClick={sendEmailCode} disabled={timerRunning}>Resend Code</button>
            )}
            {emailAvailable === true && <span className="valid">✔ Verification code sent.</span>}
            {emailAvailable === false && <span className="invalid">✖ Email is already taken.</span>}
          </div>

          {emailAvailable && (
            <div className="signup-form-group">
              <label>Enter verification code</label>
              <div className="signup-input-row">
                <input type="text" value={emailCode} onChange={(e) => setEmailCode(e.target.value)} />
                <button type="button" onClick={verifyEmailCode}>Verify</button>
              </div>
              {emailVerified && <span className="valid">✔ Verified</span>}
            </div>
          )}

          <div className="signup-form-group">
            <label>Phone</label>
            <div className="signup-phone-inputs">
              <input type="text" value={tel1} onChange={(e) => setTel1(e.target.value)} maxLength="3" />
              <span>-</span>
              <input type="text" value={tel2} onChange={(e) => setTel2(e.target.value)} maxLength="4" />
              <span>-</span>
              <input type="text" value={tel3} onChange={(e) => setTel3(e.target.value)} maxLength="4" />
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-footer">
        Already have an account? <a href="/sign-in">Sign In</a>
      </div>
      <div><a href="/">HOME</a></div>
    </div>

    <CustomModal
            show={modalData.show}
            onHide={handleCloseModal}
            successMessage={modalData.message}
            failMessage={modalData.message}
            resultValue={"1"}
            mode="close"
          />
    </>
  );
}

export default SignUp;
