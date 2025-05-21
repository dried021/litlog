import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSlider from "../../components/Ranking/UserSlider/UserSlider";
import SearchBar from '../../components/SearchBar/SearchBar';
import axios from "axios";
import UserTotalRanking from '../../components/Ranking/UserTotalRanking/UserTotalRanking';
import styles from './ReadersMain.module.css';

const ReadersMain = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [avidUserList, setAvidUserList] = useState([]);
    const [belovedUserList, setBelovedUserList] = useState([]);

    useEffect(()=>{
        getAvidUserList();
        getBelovedUserList();
    }, []);

    const getAvidUserList = async () => {
        try{
            const response = await axios.get(`http://localhost:9090/readers/avidUserList`);
            setAvidUserList(response.data || []);
        }catch(error){
            console.error("Fail to load userlist", error);
            setAvidUserList([]);
        }
    }

    const getBelovedUserList = async () => {
        try{
            const response = await axios.get(`http://localhost:9090/readers/belovedUserList`);
            setBelovedUserList(response.data || []);
        }catch(error){
            console.error("Fail to load userlist", error);
            setBelovedUserList([]);
        }
    }

    const handleSearch = (searchKeyword) => {
        if (searchKeyword.trim()) {
            navigate(`/readers/search?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };


    return(
        <div className={styles.readers}>
            <SearchBar 
                handleSearch={handleSearch} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search readers..."
            />

            <UserSlider type="avid" title="Avid Reader Rank" users={avidUserList} />
            <UserSlider type="beloved" title="Beloved Reader Rank" users={belovedUserList}/>
            <UserTotalRanking className={styles['rank']}/>
        </div>
    );
};

export default ReadersMain;