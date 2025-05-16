import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewCollection from './NewCollection';

const EditCollection = () => {
  const { collectionId } = useParams();

  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [initialBooks, setInitialBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:9090/collections/${collectionId}`, {
          withCredentials: true
        });

        setInitialTitle(res.data.title);
        setInitialContent(res.data.content);
        setInitialBooks(res.data.books || []); // ✅ 고정 배열
        setLoaded(true);
      } catch (err) {
        console.error('콜렉션 불러오기 실패:', err);
      }
    };

    fetchCollection();
  }, [collectionId]);

  if (!loaded) return <div>로딩 중...</div>;

  return (
    <NewCollection
      mode="edit"
      collectionId={collectionId}
      initialTitle={initialTitle}
      initialContent={initialContent}
      initialBooks={initialBooks}
    />
  );
};

export default EditCollection;
