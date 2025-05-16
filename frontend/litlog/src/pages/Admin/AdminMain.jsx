import React from 'react';
import ManageUser from '../../components/Admin/ManageUser';
import styles from './Admin.module.css'; 
import AdminSideMenu from '../../components/Admin/AdminSideMenu';


const AdminMain = () => {

  return (
    <>
      <h2 className={styles.title}>Admin Dashboard</h2>
      <div className={styles.container}>
      <AdminSideMenu />
      <ManageUser/>
      </div>
    </>
  );
};

export default AdminMain;
