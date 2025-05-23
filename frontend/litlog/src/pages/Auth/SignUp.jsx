import React, { useState } from 'react';
import {
  useSignUpHandlers_id,
  useSignUpHandlers_nickname,
  useSignUpHandlers_email
} from '../../libs/useSignUpHandlers.js';
import { useSignUpSubmit } from '../../libs/useSignUpSubmit';
import styles from './signUp.module.css';
import CustomModal from "../../components/Modal/CustomModal";

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [tel3, setTel3] = useState('');
  const [user_type, setUserType] = useState(2);
  const [user_status, setUserStatus] = useState(1); 
  
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
    emailChecked, tel1, tel2, tel3, user_type, user_status ,openModal
  });

  const preventSpace = (e) => {
    if (e.key === ' ') e.preventDefault();
  };

  const allowOnlyNumbers = (e, setter) => {
    const value = e.target.value.replace(/\D/g, '');
    setter(value);
  };

  return (
    <>
    <div className={styles['signup-wrapper']}>
      <h2>CREATE ACCOUNT</h2>
      <div className={styles['signup-box']}>
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
          <div className={styles['signup-form-group']}>
            <label>ID</label>
            <div className={styles['signup-input-row']}>
              <input type="text" value={id} onChange={handleIdChange} onKeyDown={preventSpace}/>
              <button type="button" onClick={checkIdDuplicate}>Check</button>
            </div>
            {idAvailable === true && (
              <span className={styles['signup-valid']}>
                <img src="/LitLog/icons/submit.svg" alt="Available" className={styles['signup-icon-check']} />
                Available
              </span>
            )}
            {idAvailable === false && (
              <span className={styles['signup-invalid']}>
                <img src="/LitLog/icons/x-lg.svg" alt="Unavailable" className={styles['signup-icon-check']} />
                ID is already taken.
                </span>)}
          </div>


          <div className={styles['signup-form-group']}>
            <label>Nickname</label>
            <div className={styles['signup-input-row']}>
              <input type="text" value={nickname} onChange={handleNicknameChange} onKeyDown={preventSpace}/>
              <button type="button" onClick={checkNicknameDuplicate}>Check</button>
            </div>
            {nicknameAvailable === true && (
              <span className={styles['signup-valid']}>
                <img src="/LitLog/icons/submit.svg" alt="Available" className={styles['signup-icon-check']} /> 
                Available
                </span>
              )}
            {nicknameAvailable === false && (
              <span className={styles['signup-invalid']}>
                <img src="/LitLog/icons/x-lg.svg" alt="Unavailable" className={styles['signup-icon-check']} />
                Nickname is already taken.</span>)}
          </div>

          <div className={styles['signup-form-group']}>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={preventSpace}/>
          </div>

          <div className={styles['signup-form-group']}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={preventSpace}/>
          </div>

          <div className={styles['signup-form-group']}>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={preventSpace}/>
          </div>

          <div className={styles['signup-form-group']}>
            <label>Email</label>
            <div className={styles['signup-input-row']}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={preventSpace}
                readOnly={emailVerified}
              />
              <button
                type="button"
                onClick={sendEmailCode}
                disabled={timerRunning || emailVerified}
              >
                Start Verification
              </button>
            </div>
            {timerRunning && <span className={styles['signup-valid']}>{formatTime(timeLeft)} remaining</span>}
            {emailAvailable === true && (
              <span className={styles['signup-valid']}>
              <img src="/LitLog/icons/submit.svg" alt="Available" className={styles['signup-icon-check']} />
              Verification code sent.
              </span>
            )}
            {emailAvailable === false && (
              <span className={styles['signup-invalid']}>
                <img src="/LitLog/icons/x-lg.svg" alt="Unavailable" className={styles['signup-icon-check']} />
                Email is already taken.
                </span>
              )}
          </div>

          {!emailVerified && emailAvailable && (
            <div className={styles['signup-form-group']}>
              <label>Enter verification code</label>
              <div className={styles['signup-input-row']}>
                <input
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
                <button type="button" onClick={verifyEmailCode}>Verify</button>
              </div>
              {emailVerified && (
                <span className={styles['valid']}>
                  <img src="/LitLog/icons/submit.svg" alt="Available" className={styles['signup-icon-check']}/>
                  Verified
                  </span>
                )}
            </div>
          )}

          <div className={styles['signup-form-group']}>
            <label>Phone</label>
            <div className={styles['signup-phone-inputs']}>
              <input type="text" value={tel1} onChange={(e) => allowOnlyNumbers(e, setTel1)} maxLength="3" onKeyDown={preventSpace}/>
              <span>-</span>
              <input type="text" value={tel2} onChange={(e) => allowOnlyNumbers(e, setTel2)} maxLength="4" onKeyDown={preventSpace}/>
              <span>-</span>
              <input type="text" value={tel3} onChange={(e) => allowOnlyNumbers(e, setTel3)} maxLength="4" onKeyDown={preventSpace}/>
            </div>
          </div>
          <button type="submit" className={styles['signup-form-button']}>Sign Up</button>
        </form>
      </div>
      
      <div className={styles['form-footer']}>
        Already have an account? <a href="/sign-in">Sign In</a><br/>
        <a href="/">HOME</a>
      </div>
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
