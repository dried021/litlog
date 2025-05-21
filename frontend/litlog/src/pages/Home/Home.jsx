import React, { useContext } from 'react';
import { UserContext } from '../../libs/UserContext';
import { useLogout } from '../../libs/useLogout';
import BooksInProgress from './BooksInProgress';
import WeeklyPopularBooks from './WeeklyPopularBooks';
import WeeklyPopularReviews from './WeeklyPopularReviews';
import PopularCollections from './PopularCollections';
import styles from './Home.module.css'; 

const Home = () => {
  const { user } = useContext(UserContext);
  const logout = useLogout(); 

  return (
    <div className={styles.mainWrapper}>

      {/* 내가 읽고 있는 책 */}
      {<BooksInProgress userId={user} />}

      {/* 이번 주 인기 도서 */}
      <WeeklyPopularBooks />

      {/* 이번 주 인기 리뷰 */}
      <WeeklyPopularReviews />

      {/* 인기 컬렉션 */}
      <PopularCollections />
    </div>
  );
};

export default Home;
