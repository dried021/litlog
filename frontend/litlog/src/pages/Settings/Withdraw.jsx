import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './Setting.module.css'; 
import SideMenu from '../../components/Setting/SideMenu';
import WithdrawUserForm from '../../components/Setting/WithdrawUserForm';


const Withdraw = () => {
    const [userId, setUserId] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        getUserId();
    }, []);

    const getUserId = async () => {
        try {
          const response = await axios.get(`http://localhost:9090/setting/user`, { withCredentials: true });
    
          const {id, isAdmin} = response.data;
          setUserId(id);
          setIsAdmin(isAdmin);
        } catch (error) {
          console.error("Fail to load userId:", error);
          setUserId("");
        }
      };

    return(
        <>
        <h2 className={styles.title}>Delete Account</h2>
        <div className={styles.container}>
            
        <SideMenu isAdmin={isAdmin} activeMenu={"withdraw"}/>
        {userId ? (
            <WithdrawUserForm userId={userId}/>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        </>
    );
};

export default Withdraw;