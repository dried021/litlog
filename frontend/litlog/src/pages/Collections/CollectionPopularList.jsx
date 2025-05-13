import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollectionPopularList = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/collections/popular', { withCredentials: true })
      .then(res => setCollections(res.data))
      .catch(err => {
        alert("컬렉션을 불러오는 데 실패했습니다.");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>🔥 Popular This Week</h2>
      <ul>
        {collections.map(col => (
          <li key={col.id}>
            <img src={col.thumbnail} alt={col.title} width="100" />
            <h3>{col.title}</h3>
            <p>{col.content}</p>
            <p>❤️ {col.likeCount} likes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionPopularList;
