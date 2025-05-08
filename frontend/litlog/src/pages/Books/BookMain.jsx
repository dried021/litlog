import React from 'react';
import BookSearch from "../../components/Book/BookSearch/BookSearch";
import BookSlider from "../../components/Book/BookSlider/BookSlider";

const BookMain = () => {
    return(
        <div>
            <h2> Books 메인 페이지 </h2>

            <BookSlider/>
            <BookSearch/>
        </div>
    );
};

export default BookMain;