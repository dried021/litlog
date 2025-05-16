import React from 'react';
import styles from './Admin.module.css'; 
import AdminSideMenu from '../../components/Admin/AdminSideMenu';
import ManageUser from '../../components/Admin/ManageUser';

const MemberManage = () => {
    return(
        <>
            <h2 className={styles.title}>Manage Reviews</h2>
            <div className={styles.container}>
    
            <AdminSideMenu />
            <ManageUser/>
            </div>
      </>
    );
};

export default MemberManage;