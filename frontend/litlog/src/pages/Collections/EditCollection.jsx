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
        const res = await axios.get(`/api/collections/${collectionId}`, {
          withCredentials: true
        });

        const userId = (await axios.get(`/api/session-check`, { withCredentials: true })).data.id;
        if (res.data.userId !== userId) {
          setAuthorized(false);
          return;
        }

        setInitialTitle(res.data.title);
        setInitialContent(res.data.content);
        setInitialBooks(res.data.books || []); 
        setLoaded(true);
      } catch (err) {
        console.error('Failed to load collection:', err);
        setAuthorized(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  useEffect(() => {
    if (!authorized) {
      const timer = setTimeout(() => {
        navigate(-1); 
      }, 1500);

      return () => clearTimeout(timer); 
    }
  }, [authorized, navigate]);

  if (!authorized) {
    return <div>Access denied. Returning to the previous page...</div>;
  }

  if (!loaded) return <div>Loading...</div>;

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
