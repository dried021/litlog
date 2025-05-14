import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/Setting/SideMenu';
import styles from './Setting.module.css'; 
import axios from 'axios';
import UpdateUserForm from '../../components/Setting/UpdateUserForm';

const EditProfile = () => {
    const [userId, setUserId] = useState("");

    useEffect(()=>{
        getUserId();
    }, []);

    const getUserId = async () => {
        try {
          const response = await axios.get(`http://localhost:9090/setting/user`);
    
          const id = response.data;
          setUserId(id);
        } catch (error) {
          console.error("Fail to load userId:", error);
          setUserId("");
        }
      };

    return (<>
        <h2 className={styles.title}>Update My Info</h2>
        <div className={styles.container}>
            
        <SideMenu isAdmin={true} />
        <UpdateUserForm userId={userId}/>
        </div>
        </>
    );
};

export default EditProfile;