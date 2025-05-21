  import React, { useEffect, useState, useMemo, useContext } from 'react';
  import { UserContext } from '../../libs/UserContext';
  import { Link, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import styles from './CollectionMain.module.css';
  import Pagination from '../../components/Pagination/Pagination';  
  import CustomModal from "../../components/Modal/CustomModal";
  import defaultProfile from '../../assets/default_profile.png';

  const CollectionMain = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [popularCollections, setPopularCollections] = useState([]);
    const [allCollections, setAllCollections] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1); 
    const pageSize = 5; 
    const [modalData, setModalData] = useState({
        show: false,
        message: "",
        mode: "close",
        resultValue: "1",
      });
    
    const openModal = ({ message, mode = "close", resultValue = "1", callbackOnSuccess = null, callbackOnFail = null }) => {
      setModalData({
        show: true,
        message,
        mode,
        resultValue,
        callbackOnSuccess,
        callbackOnFail
      });
    };

    const handleCloseModal = () => {
      setModalData(prev => ({ ...prev, show: false }));
    };
    
    useEffect(() => {
      fetchPopularCollections();
    }, []);

    useEffect(() => {
      fetchAllCollections(sortBy, currentPage);
    }, [sortBy, currentPage]);

    const fetchPopularCollections = async () => {
      try {
        const res = await axios.get('http://localhost:9090/collections/popular');
        setPopularCollections(res.data.book_collections || []);
      } catch (err) {
        console.error('Failed to load popular collections.', err);
      }
    };

    const fetchAllCollections = async (sort, page = 1) => {
      try {
        const res = await axios.get(`http://localhost:9090/collections?sort=${sort}&page=${page}&size=${pageSize}`);
        setAllCollections(res.data.book_collections || []);
        setPageCount(res.data.totalPages || 1); 
      } catch (err) {
        console.error('Failed to load all collections.', err);
      }
    };

  const CollectionCard = ({ col, isWeekly = false }) => {
  const navigate = useNavigate();

  const thumbnails = col.thumbnails ?? (col.books || []).map(book => book.thumbnail);
  const stack = [...thumbnails.slice(0, 5)];
  while (stack.length < 5) stack.push(null);

  const { imageWidth, overlapOffset } = useMemo(() => {
    const imageWidth = 90;
    const stackMaxWidth = 266;
    const overlapCount = 5;
    const overlapOffset = (imageWidth * overlapCount - stackMaxWidth) / (overlapCount - 1);
    return { imageWidth, overlapOffset };
  }, []);

  const likeDisplay = isWeekly ? (
    <>
      {col.likeCount}
      <img src="/icons/arrow-up.svg" alt="up" className={styles.icon1} />
    </>
  ) : (
    col.totalLikeCount !== 0 ? col.totalLikeCount : col.likeCount
  );

  // 이번주 인기순
  if (isWeekly) {
    return (
      <div className={styles.weeklyCard}>
        <div className={styles.thumbnailStack} onClick={() => navigate(`/collections/${col.id}`)}>
          {stack.map((img, idx) =>
            img ? (
              <img
                key={idx}
                src={img}
                alt={`thumbnail-${idx}`}
                className={styles.stackedImg}
                style={{
                  left: `${idx * (imageWidth - overlapOffset)}px`,
                  zIndex: 10 - idx,
                }}
              />
            ) : (
              <div
                key={idx}
                className={styles.placeholderBox}
                style={{
                  left: `${idx * (imageWidth - overlapOffset)}px`,
                  zIndex: 10 - idx,
                }}
              />
            )
          )}
          <div className={styles.overlay}>
            <p className={styles.overlayText}>
              {col.content?.length > 30 ? col.content.slice(0, 30) + "..." : col.content}
            </p>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h3 className={styles.title} onClick={() => navigate(`/collections/${col.id}`)}>{col.title}</h3>
            <span className={styles.bookCount}>
              {col.bookCount ?? col.books?.length ?? 0} books
            </span>
          </div>
          <div className={styles.bottomRow}>
            <span className={styles.author} onClick={() => navigate(`/${col.userId}`)}>
            <img
              src={
                col.profileImage
                  ? (col.profileImage.startsWith('http')
                      ? col.profileImage
                      : `http://localhost:9090${col.profileImage}`)
                  : defaultProfile
              }
              alt="profile"
              className={styles.profileIcon}
            />{col.nickname}
          </span>
            <span className={styles.meta}>
              <img src="/icons/heart_gray.svg" alt="likes" className={styles.icon1} />
              {likeDisplay}
              &nbsp;&nbsp;
              <img src="/icons/comment_gray.svg" alt="comments" className={styles.icon2} />
              {col.commentCount ?? 0}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 인기순 최신순
  return (
    <div className={styles.card}>
      <div className={styles.thumbnailStack} onClick={() => navigate(`/collections/${col.id}`)}>
        {stack.map((img, idx) =>
          img ? (
            <img
              key={idx}
              src={img}
              alt={`thumbnail-${idx}`}
              className={styles.stackedImg}
              style={{
                left: `${idx * (imageWidth - overlapOffset)}px`,
                zIndex: 10 - idx,
              }}
            />
          ) : (
            <div
              key={idx}
              className={styles.placeholderBox}
              style={{
                left: `${idx * (imageWidth - overlapOffset)}px`,
                zIndex: 10 - idx,
              }}
            />
          )
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} onClick={() => navigate(`/collections/${col.id}`)}>
          {col.title}
        </h3>
        <p className={styles.description}>
          {col.content?.length > 80 ? col.content.slice(0, 80) + '...' : col.content}
        </p>
        <div className={styles.bottomRow}>
          <span className={styles.author} onClick={() => navigate(`/${col.userId}`)}>
            <img
              src={
                col.profileImage
                  ? (col.profileImage.startsWith('http')
                      ? col.profileImage
                      : `http://localhost:9090${col.profileImage}`)
                  : defaultProfile
              }
              alt="profile"
              className={styles.profileIcon}
            />{col.nickname}
          </span>
          <span className={styles.meta}>
            <img src="/icons/heart_gray.svg" alt="likes" className={styles.icon1} />
            {likeDisplay}
            &nbsp;&nbsp;
            <img src="/icons/comment_gray.svg" alt="comments" className={styles.icon2} />
            {col.commentCount ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

    return (
      <div className={styles.collectionWrapper}>
        <div className={styles.collectionHeader}>
          <h2>Start your collection!<br />
            Gather your favorite books and<br />
            share your reading journey with the world.
          </h2>
          <button
            onClick={() => {
              if (!user) {
                openModal({
                  message: "You need to sign in before using this feature.",
                  mode: "confirm",
                  resultValue: "1",
                  callbackOnSuccess: () => {
                    navigate('/collections/new');
                  },
                  callbackOnFail: () => {
                    // do nothing
                  }
                });
              } else {
                navigate('/collections/new');
              }
            }}
            className={styles.collectionCreateBtn}
          >
            + Create My Collection
          </button>
        </div>

        <section className={styles.popularSection}>
          <div className={styles.sectionHeader}>
            <h3>
              <img 
                src="/icons/hand-thumbs-up-fill.svg" 
                alt="Popular This Week" 
                style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '6px' }} 
              />
              Popular This Week
            </h3>
            <span className={styles.moreBtn} onClick={() => navigate('/collections/list')}>MORE</span>
          </div>

          <div className={styles.weeklyGrid}>
            {popularCollections.slice(0, 3).map(col => (
              <CollectionCard key={col.id} col={col} isWeekly={true} />
            ))}
          </div>
        </section>



        <section className={styles.allSection}>
          <div className={styles.collectionSort}>
            <span
              className={sortBy === 'popular' ? styles.active : ''}
              onClick={() => {
                setSortBy('popular');
                setCurrentPage(1);
              }}
            >
              Popular
            </span>
            <span
              className={sortBy === 'recent' ? styles.active : ''}
              onClick={() => {
                setSortBy('recent');
                setCurrentPage(1);
              }}
            >
              Newest
            </span>
          </div>
          <div className={styles.collectionGrid}>
            {allCollections.map(col => (
              <CollectionCard key={col.id} col={col} navigate={navigate} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={(pageNum) => setCurrentPage(pageNum)}
          />
        </section>
        <CustomModal
          show={modalData.show}
          onHide={handleCloseModal}
          successMessage={modalData.message}
          failMessage={modalData.message}
          resultValue={modalData.resultValue}
          mode={modalData.mode}
          callbackOnSuccess={modalData.callbackOnSuccess}
          callbackOnFail={modalData.callbackOnFail}
        />
      </div>
    );
  };

  export default CollectionMain;
