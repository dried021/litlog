import React from 'react';

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