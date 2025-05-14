import React, { useEffect, useState } from 'react';
import styles from './UpdateUserForm.module.css';
import axios from 'axios';
import {
  useSignUpHandlers_nickname,
  useSignUpHandlers_email
} from '../../libs/useSignUpHandlers';

const UpdateUserForm = ({ userId }) => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  const {
    nickname,
    nicknameChecked,
    nicknameAvailable,
    handleNicknameChange,
    checkNicknameDuplicate
  } = useSignUpHandlers_nickname();

  const {
    email,
    emailCode,
    emailChecked,
    emailAvailable,
    emailVerified,
    timeLeft,
    timerRunning,
    formatTime,
    setEmailCode,
    handleEmailChange,
    sendEmailCode,
    verifyEmailCode
  } = useSignUpHandlers_email();

  const isNicknameChanged = nickname !== originalNickname;
  const isEmailChanged = email !== originalEmail;

  useEffect(() => {
    console.log(userId);
    loadUser(userId);
  }, [userId]);

  const loadUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9090/setting/userinfo`, {
        params: { userId },
      });
      const userData = response.data;
      setUser(userData);
        setName(userData.name || '');
        setTel(userData.tel || '');

        handleNicknameChange({ target: { value: userData.nickname || '' } });
        handleEmailChange({ target: { value: userData.email || '' } });
        setOriginalNickname(userData.nickname || '');
        setOriginalEmail(userData.email || '');
    } catch (error) {
      console.error("Fail to load user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNicknameChanged && (!nicknameChecked || !nicknameAvailable)) {
      alert("Please check nickname duplication.");
      return;
    }

    if (isEmailChanged && (!emailVerified || !emailAvailable)) {
      alert("Please verify your email.");
      return;
    }

    if (newPassword.length < 6) return alert("비밀번호는 최소 6자 이상이어야 합니다.");

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!currentPassword) {
        alert("현재 비밀번호를 입력하세요.");
        return;
      }

    const requestData = {
      id : userId,
      nickname,
      email,
      pwd : newPassword || currentPassword,
    };

    try {
      const response = await axios.post(`http://localhost:9090/setting/userinfo`, requestData);
      if (response.data.success) {
        alert("User information updated.");
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroupFull}>
        <label>ID</label>
        <input type="text" value={userId} disabled />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Nickname</label>
          <input type="text" value={nickname} onChange={handleNicknameChange} />
        </div>
        <button type="button" className={styles.buttonSmall} onClick={checkNicknameDuplicate}>Check</button>
        {isNicknameChanged && nicknameAvailable !== null && (
        nicknameAvailable ? <span className="valid">✔ Available</span> : <span className="invalid">✖ Taken</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Your Name</label>
          <input type="text" value={name} disabled />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="text" value={tel} disabled />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} 
          autoComplete="new-password"/>
        </div>
      </div>

      <div className={styles.formGroupFull}>
        <label>Confirm New Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
        autoComplete="new-password"/>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <button type="button" className={styles.buttonSmall} onClick={sendEmailCode} disabled={timerRunning}>Send Code</button>
        {timerRunning && <span className="valid">{formatTime(timeLeft)} left</span>}
        {isEmailChanged && emailAvailable === false && <span className="invalid">✖ Already used</span>}
      </div>

      {isEmailChanged && emailAvailable && (
        <div className={styles.formRow}>
            <input type="text" value={emailCode} onChange={(e) => setEmailCode(e.target.value)} />
            <div className={styles.inlineRow}>
                <button type="button" onClick={verifyEmailCode}>Verify</button>
                {emailVerified && <span className="valid" style={{ marginLeft: '8px' }}>✔ Verified</span>}
            </div>
        </div>
      )}

      <div className={styles.formGroupFull}>
        <button type="submit" className={styles.submitButton}>Update</button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
