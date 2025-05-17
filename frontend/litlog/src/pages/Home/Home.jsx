import React, { useContext } from 'react';
import { UserContext } from '../../libs/UserContext';
import { useLogout } from '../../libs/useLogout';
import BooksInProgress from './BooksInProgress';
import WeeklyPopularBooks from './WeeklyPopularBooks';
import WeeklyPopularReviews from './WeeklyPopularReviews';
import PopularCollections from './PopularCollections';
import styles from './Home.module.css'; // 스타일 필요 시 생성

const Home = () => {
  const { user } = useContext(UserContext);
  const logout = useLogout(); 

  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.title}>📚 메인 페이지</h2>

      {/* 내가 읽고 있는 책 */}
      {<BooksInProgress userId={user} />}

      {/* 이번 주 인기 도서 */}
      <WeeklyPopularBooks />

      {/* 이번 주 인기 리뷰 */}
      <WeeklyPopularReviews />

      {/* 인기 컬렉션 */}
      <PopularCollections />

      {/* 마이페이지 생기기 전 임시 로그아웃 버튼 */}
      {user && <button onClick={() => logout('/')}>로그아웃</button>}
    </div>
  );
};

export default Home;
