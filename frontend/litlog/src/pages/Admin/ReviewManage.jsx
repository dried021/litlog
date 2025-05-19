import React from 'react';
import styles from './Admin.module.css'; 
import AdminSideMenu from '../../components/Admin/AdminSideMenu';
import ManageReview from '../../components/Admin/ManageReview';

const ReviewManage = () => {
    return(
        <>
        <h2 className={styles.title}>Manage Reviews</h2>
        <div className={styles.container}>
            <AdminSideMenu />
            <ManageReview/>
        </div>
        </>
    );
};

export default ReviewManage;