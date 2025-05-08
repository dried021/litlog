import React, {useState} from 'react';
import axios from "axios";

function Book(){
    const [keyword, setKeyword] = useState("");
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        try{
            const response = await axios.get(`http://localhost:9090/books/search`,{
                params: {keyword},
            });
            setBooks(response.data.items || []);
        } catch(error){
            console.error("검색 실패 : ", error);
        }
    };

    return (
        <div className="p-4">
        <input
            type="text"
            placeholder="도서 검색 키워드"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
            검색
        </button>

        <div className="mt-4">
            {books.map((book) => (
            <div key={book.id} className="border p-2 mb-2">
                <h3 className="text-lg font-bold">{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
                {book.volumeInfo.imageLinks?.thumbnail && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" />
                )}
            </div>
            ))}
        </div>
        </div>
    );
}
export default Book;