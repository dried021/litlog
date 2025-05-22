import React, { useState } from 'react';
import styles from './WithdrawUserForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../Modal/CustomModal';

const AccountDeletionForm = ({ userId }) => {
    const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [modalData, setModalData] = useState({
      show:false,
      message: "",
      mode: "close",
    });
  
    const handleCloseModal = () => {
      setModalData({...modalData, show:false,});
    };

    const openModal = (
        successMessage, 
        failMessage = "", 
        resultValue="1",  
        mode="close",
        callbackOnSuccess=null,
        callbackOnFail=null) => {
      setModalData({
        show:true,
        successMessage,
        failMessage, 
        resultValue, 
        mode,
        callbackOnSuccess, 
        callbackOnFail
      });
    };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!checked) return openModal("Please confirm that you have read the notice.");
    if (!password) return openModal("Please enter your password.");

    try {
        const response = await axios.post(`/api/setting/withdraw`, {
            id: userId,
            pwd: password,
          }, { withCredentials: true });
        
        if (response.data.incorrectPwd){
            openModal("Incorrect password.");
            return;
        }

        openModal("Account has been successfully deleted.", 
            "Failed to delete account.", response.data.success,
            "close", () => navigate("/"),
            () => window.location.reload()
        )

    }catch (error) {
        console.error("Withdraw failed:", error);
    }
  };

  return (
    <>
    <form className={styles.form} onSubmit={handleDelete}>
      <div className={styles.formGroupFull}>
        <h3 className={styles.label}>Account Deletion Notice</h3>
        <p>Please make sure to read the following before proceeding with your account deletion.</p>

        <p><strong >Your ID (username) cannot be reused or recovered after deletion</strong><br />
        Once your account is deleted, your ID (username) cannot be reused or recovered by you or anyone else. Please consider this carefully before proceeding.</p>

        <p><strong>All personal information and service history will be permanently deleted</strong><br />
        Your personal information and all service history such as book reviews, bookshelves, and book collections will be permanently deleted.<br />
        Deleted data cannot be recovered, so please back up any necessary information beforehand.</p>
      </div>

      <div className={styles.formGroupFull}>
        <label className={styles.inlineRow}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          I have read and agree to the above notice.
        </label>
      </div>

      <div className={styles.formGroupFull}>
        <label>Your ID</label>
        <input type="text" value={userId ?? ''} readOnly />
      </div>

      <div className={styles.formGroupFull}>
        <label>Current Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <div className={styles.formGroupFull}>
        <button type="submit" className={styles.submitButton} disabled={!checked || !password}>
          Delete Account
        </button>
      </div>
    </form>

        <CustomModal
            show={modalData.show}
            onHide={handleCloseModal}
            successMessage={modalData.successMessage}
            failMessage={modalData.failMessage}
            resultValue={modalData.resultValue}
            mode={modalData.mode}
            callbackOnSuccess={modalData.callbackOnSuccess}
            callbackOnFail={modalData.callbackOnFail}/>
    </>
  );
};

export default AccountDeletionForm;

