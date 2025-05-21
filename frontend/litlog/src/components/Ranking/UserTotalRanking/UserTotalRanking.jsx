import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserList from '../UserList/UserList';
import ViewMoreButton from '../../Button/ViewMoreButton';
import RankPeriod from './RankPeriod';
import TopButton from '../../Button/TopButton';
import { Row, Col } from 'react-bootstrap';
import styles from './UserTotalRanking.module.css';


const UserTotalRanking = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedItems, setLoadedItems] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [period, setPeroid] = useState(new Date().getFullYear());
    const itemsPerPage = 10;


    useEffect(() => {
        loadRanking(0);
    }, [period]);

    const loadRanking = async (startIndex) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9090/readers/rank`, {
                params: {
                    startIndex,
                    itemsPerPage,
                    period
                },
            });

            const { items, totalItems } = response.data;

            if (startIndex === 0) {
                setUsers(items || []);
            } else {
                setUsers((prevUsers) => [...prevUsers, ...(items || [])]);
            }
            setTotalItems(totalItems || 0);
            setLoadedItems(startIndex + 1);

        } catch (error) {
            console.error("Fail to search:", error);
            if (startIndex === 0) {
                setUsers([]);
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);

        }
    };

    const handleLoadMore = () => {
        if ((loadedItems+1) * 10 >= totalItems){
            loadRanking(loadedItems);
            setIsAllLoaded(true);
            return;
        }
        loadRanking(loadedItems);
    };

    const handleItemClick = (id) => {
        navigate(`/${id}`);
    };

    const handlePeriodChange = (period) => {
        setPeroid(period);
    }
    
    return (
        <div className={styles.totalRanking}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Overall User Rank</h2>
                <RankPeriod period={period} onChange={handlePeriodChange} />
            </div>

            <div className={styles["search-result"]}>
                {loading && loadedItems === 0 ? (
                    <p className="search">Loading...</p>
                ) : users.length > 0 ? (
                    <UserList users={users} onItemClick={handleItemClick} isRank={true}/>
                ) : (
                    <p className={styles["search"]}>No results found.</p>
                )}
            </div>

            <Row>
                <Col className="d-flex justify-content-center">
                    {(loadedItems < totalItems && !loading && !isAllLoaded) && (
                        <div>
                            <ViewMoreButton handleLoadMore={handleLoadMore}/>
                            <TopButton />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};
export default UserTotalRanking;
