import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewCollection from './NewCollection';

const EditCollection = () => {
  const { collectionId } = useParams();
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [initialBooks, setInitialBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:9090/collections/${collectionId}`, {
          withCredentials: true
        });

        const userId = (await axios.get(`http://localhost:9090/session-check`, { withCredentials: true })).data.id;
        if (res.data.userId !== userId) {
          setAuthorized(false);
          return;
        }

        setInitialTitle(res.data.title);
        setInitialContent(res.data.content);
        setInitialBooks(res.data.books || []); // ✅ 고정 배열
        setLoaded(true);
      } catch (err) {
        console.error('콜렉션 불러오기 실패:', err);
        setAuthorized(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  useEffect(() => {
      const timer = setTimeout(() => {
        navigate(-1); // 🔙 이전 페이지로
      }, 1500); // 1.5초 후 이동

      return () => clearTimeout(timer); // 클린업
    }, [navigate]);

    
  if (!authorized) {
    return <div>접근 권한이 없습니다. 이전 페이지로 돌아갑니다...</div>;
  }

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
