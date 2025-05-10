import React, {useState} from 'react';
import './BookInfoDiv.module.css';
import { exists } from "../../libs/book/exists";

function BookInfoDiv({bookApiId}) {
  const [bookshelfCount, setBookshelfcount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (bookApiId) {
      if (exists(bookApiId)){
        getCounts(bookApiId);
      }else{
        setBookshelfcount(0);
        setLikeCount(0);
      }
    }
  }, []);

  const getCounts = async (bookApiId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/counts`, {
        params: { bookApiId },
      });

      const { bookshelfCount, likeCount } = response.data;
      setBookshelfcount(bookshelfCount);
      setLikeCount(likeCount);

    } catch (error) {
      console.error("Fail to search:", error);
    }
  }


  return (
        <div className="bookInfoDiv">
            <img src="/icons/bookshelf.svg"/>
            {" "+bookshelfCount+" "}
            <img src="/icons/heart_filled.svg"/>
            {" "+likeCount}
        </div>
  );
}
export default BookInfoDiv;

