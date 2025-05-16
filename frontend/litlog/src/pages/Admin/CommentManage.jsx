import React from 'react';
import styles from './Admin.module.css'; 
import AdminSideMenu from '../../components/Admin/AdminSideMenu';
import ManageComment from '../../components/Admin/ManageComment';


const CommentManage = () => {
    return(
            <>
        <h2 className={styles.title}>Manage Comments</h2>
        <div className={styles.container}>
            <AdminSideMenu />
            <ManageComment/>
        </div>
        </>
    );
};

export default CommentManage;