import React from 'react';
import './BookInfoDiv.module.css';

function BookInfoDiv({bookAPIId, exists}) {

  const queryDB = async (bookAPIId) => {
    if (bookAPIId) {
        try {
            const response = await axios.get(`http://localhost:9090/books/query`, {
                params: {
                  bookAPIId
                },
            });

            const { exists, bookshelf_count, like_count } = response.data;

            if (startIndex === 0) {
                setBooks(items || []);
            } else {
                setBooks((prevBooks) => [...prevBooks, ...(items || [])]);
            }

            setTotalItems(totalItems || 0);
            setLoadedItems(startIndex + itemsPerPage);

            if (!items){
                alert("마지막 결과 페이지입니다.");
                shouldReload.current = true;
                navigate(-1);
            }

        } catch (error) {
            console.error("Fail to search:", error);
            if (startIndex === 0) {
                setBooks([]);
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }
};


  return (
        <div className="bookInfoDiv">
            <img src="/icons/bookshelf.svg"/>
            {" "+bookshelf_count+" "}
            <img src="/icons/heart_filled.svg"/>
            {" "+like_count}
        </div>
  );
}
export default BookInfoDiv;

