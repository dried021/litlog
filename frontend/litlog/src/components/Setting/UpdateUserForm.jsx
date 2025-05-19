import React, { useEffect, useState } from 'react';
import styles from './UpdateUserForm.module.css';
import axios from 'axios';
import {
    useSignUpHandlers_nickname,
    useSignUpHandlers_email
} from '../../libs/useSignUpHandlers';
import CustomModal from '../Modal/CustomModal';

const UpdateUserForm = ({ userId }) => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [originalPassword, setOriginalPassword] = useState('');
    const [originalNickname, setOriginalNickname] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [nicknameRecentlyReset, setNicknameRecentlyReset] = useState(false);
    const [passwordRecentlyReset, setPasswordRecentlyReset] = useState(false);
    const [nicknameResetAt, setNicknameResetAt] = useState("");
    const [pwdResetAt, setPwdResetAt] = useState("");


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
        nickname,
        nicknameChecked,
        nicknameAvailable,
        handleNicknameChange,
        checkNicknameDuplicate, 
    } = useSignUpHandlers_nickname(openModal);

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
    } = useSignUpHandlers_email(openModal);

    const isNicknameChanged = nickname !== originalNickname;
    const isEmailChanged = email !== originalEmail;

    useEffect(() => {
        if (userId) loadUser();
    }, [userId, refreshTrigger]);

    const loadUser = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/setting/userinfo`, { withCredentials: true });
            const userData = response.data;
            setUser(userData);
            setName(userData.name ?? '');
            setTel(userData.tel ?? '');
            handleNicknameChange({ target: { value: userData.nickname ?? '' } });
            handleEmailChange({ target: { value: userData.email ?? '' } });
            setOriginalPassword(userData.pwd ?? '');
            setOriginalNickname(userData.nickname ?? '');
            setOriginalEmail(userData.email ?? '');

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const nicknameResetAt = userData.nicknameResetAt ? new Date(userData.nicknameResetAt) : null;
            const pwdResetAt = userData.pwdResetAt ? new Date(userData.pwdResetAt) : null;

            setNicknameResetAt(nicknameResetAt); 
            setPwdResetAt(pwdResetAt);

            setNicknameRecentlyReset(nicknameResetAt && nicknameResetAt > oneWeekAgo);
            setPasswordRecentlyReset(pwdResetAt && pwdResetAt > oneWeekAgo);

        } catch (error) {
            console.error("Fail to load user:", error);
            openModal("Failed to load user information.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentPassword) return openModal("Please enter your current password.");
        if (currentPassword !== originalPassword ) return openModal("Incorrect current password.");
        if (isNicknameChanged && (!nicknameChecked || !nicknameAvailable)) return openModal("Please check for duplicate nickname.");
        if (isEmailChanged && (!emailChecked || !emailAvailable)) return openModal("Please verify your email.");
        if (isEmailChanged && (!emailVerified)) return openModal("Please complete email verification.");
        if (newPassword && newPassword.length < 6) return openModal("Password must be at least 6 characters long.");
        if (newPassword && confirmPassword && newPassword !== confirmPassword) return openModal("New passwords do not match.");
        
        const requestData = {
            id : userId,
            nickname,
            email,
            pwd : newPassword || currentPassword,
        };

        try {
            const response = await axios.post(`http://localhost:9090/setting/userinfo`, requestData);
            if (response.data.success) {
                openModal("User information updated successfully.");
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setRefreshTrigger(prev => prev + 1);
            } else {
                openModal("Failed to update user information.");
            }
        }catch (error) {
            console.error("Update failed:", error);
        }
    };

    const formatEnglishDate = (date) => {
        return date.toLocaleDateString('en-US', {
          month: 'short',  
          day: '2-digit',   
        });
      };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroupFull}>
                    <label>ID</label>
                    <input type="text" value={userId ?? ''} disabled autoComplete="userid"/>
                </div>

                <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${passwordRecentlyReset ? styles.clickable : ''}`}
                        onClick={() => {
                            if(nicknameRecentlyReset){
                                openModal(
                                    "You can change your nickname after: " +
                                      formatEnglishDate(new Date(new Date(nicknameResetAt).getTime() + 7 * 24 * 60 * 60 * 1000))
                                  );
                            }
                        }}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>Nickname</label>
                            {isNicknameChanged && nicknameAvailable !== null && (
                                nicknameAvailable ? (
                                <span className="valid">✔ Available</span>
                                ) : (
                                <span className="invalid">✖ Taken</span>
                                )
                            )}
                        </div>
                        <input type="text" value={nickname ?? ''} 
                            onChange={handleNicknameChange} 
                            disabled={nicknameRecentlyReset}/>
                    </div>
                    <button type="button" className={styles.buttonSmall} onClick={checkNicknameDuplicate} disabled={!isNicknameChanged}>Check</button>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Your Name</label>
                        <input type="text" value={name ?? ''} disabled autoComplete="username"/>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input type="text" value={tel ?? ''} disabled autoComplete="tel" />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Current Password</label>
                        <input type="password" value={currentPassword ?? ''} 
                            onChange={(e) => setCurrentPassword(e.target.value)} autoComplete="current-password"/>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${passwordRecentlyReset ? styles.clickable : ''}`}
                        onClick={() => {
                            if (passwordRecentlyReset) {
                              openModal(
                                "You can change your password after " +
                                  formatEnglishDate(new Date(new Date(pwdResetAt).getTime() + 7 * 24 * 60 * 60 * 1000))
                              );
                            }
                          }}>
                        <label>New Password</label>
                        <input type="password" value={newPassword ?? ''} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            disabled={passwordRecentlyReset}
                            autoComplete="new-password"/>
                    </div>
                </div>

                {newPassword && (
                    <div className={styles.formGroupFull}>
                        <label>Confirm New Password</label>
                        <input type="password" value={confirmPassword ?? ''} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            autoComplete="new-password"/>
                    </div>
                )}

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                    <div className={styles.labelRow}>
                        <label>Email</label>
                        {isEmailChanged && emailAvailable === false && <span className="invalid">✖ Already used</span>}
                        {timerRunning && <span className="valid">{formatTime(timeLeft)} left</span>}
                    </div>
                        <input type="email" value={email ?? ''} 
                        onChange={handleEmailChange} 
                        disabled={timerRunning || emailVerified }/>
                    </div>

                    <button type="button" className={styles.buttonSmall} onClick={sendEmailCode} disabled={timerRunning || !isEmailChanged}>
                        {emailChecked ? "Resend Code" : "Send Code"}
                    </button>
                </div>

                {isEmailChanged && emailAvailable && (
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                        {emailVerified ? <label className="valid" >✔ Verified</label>
                            : <label className="valid" >🔒 Unverified</label>}
                            <input type="text" value={emailCode ?? ''} onChange={(e) => setEmailCode(e.target.value)} />
                        </div>
                        
                        <div className={styles.inlineRow}>
                            <button type="button" className={styles.buttonSmall} onClick={verifyEmailCode}>Verify</button>
                        </div>
                    </div>
                )}

                <div className={styles.formGroupFull}>
                    <button type="submit" className={styles.submitButton}>Update</button>
                </div>
            </form>

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
};

export default UpdateUserForm;
