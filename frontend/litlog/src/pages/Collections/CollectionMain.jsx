import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/collection.css';

const CollectionMain = () => {
  const navigate = useNavigate();
  const [popularCollections, setPopularCollections] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' or 'recent'

  useEffect(() => {
    fetchPopularCollections();
    fetchAllCollections(sortBy);
  }, [sortBy]);

  const fetchPopularCollections = async () => {
    try {
      const res = await axios.get('http://localhost:9090/collections/popular');
      setPopularCollections(res.data.book_collections || []);
    } catch (err) {
      console.error('인기 컬렉션 불러오기 실패', err);
    }
  };

  const fetchAllCollections = async (sort) => {
    try {
      const res = await axios.get(`http://localhost:9090/collections?sort=${sort}`);
      setAllCollections(res.data.book_collections || []);
    } catch (err) {
      console.error('전체 컬렉션 불러오기 실패', err);
    }
  };

  return (
    <div className="collection-wrapper">
      <div className="collection-header">
        <h2>Start your collection!<br/>
            Gather your favorite books and<br/>
            share your reading journey with the world.<br/>
        </h2>
        <br/>
        <button onClick={() => navigate('/collections/new')} className="collection-create-btn">
          + Create My Collection
        </button>
      </div>
      <br/>
      <section className="popular-section">
        <h3>🔥 Popular This Week</h3>
        <div className="collection-grid">
          {popularCollections.map(col => (
            <div key={col.id} className="collection-card">
              <div className="collection-thumbnail">
                <img src={col.thumbnail} alt="thumbnail" />
              </div>
              <div className="collection-body">
                <h4 className="collection-title">{col.title}</h4>
                <p className="collection-author">@{col.nickname}</p>
                <p className="collection-desc">{col.content}</p>
                <div className="collection-meta">
                  <span>❤️ {col.likeCount}</span>
                  <span>💬 {col.commentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>  


      <section className="all-section">
        <div className="collection-sort">
          <span
            className={sortBy === 'popular' ? 'active' : ''}
            onClick={() => setSortBy('popular')}
          >
            인기순
          </span>
          <span
            className={sortBy === 'recent' ? 'active' : ''}
            onClick={() => setSortBy('recent')}
          >
            최신순
          </span>
        </div>

        <div className="collection-list">
          {allCollections.map(col => (
            <div key={col.id} className="collection-card">
              <img src={col.thumbnail} alt="thumbnail" />
              <div className="collection-info">
                <h4>{col.title}</h4>
                <p>{col.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CollectionMain;
