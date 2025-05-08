import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
//import './BookSlider.css';

  function BookList({book}){
   
  
    return (
        <>
        <div>
                            <h3 className="text-lg font-bold">{book.volumeInfo.title}</h3>
                            <p>{book.volumeInfo.authors?.join(", ")}</p>
                            {book.volumeInfo.imageLinks?.thumbnail && (
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" />
                            )}
                        </div>
        </>
    );
  }
  

export default BookList;
