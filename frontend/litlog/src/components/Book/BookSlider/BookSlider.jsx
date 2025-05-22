import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './BookSlider.css';
import { splitTextIntoLines } from "../../../libs/text/splitTextIntoLines";
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          display: 'block',
          background: `url('/arrows/arrow_forward_ios.svg') no-repeat center center`,
          backgroundSize: 'contain',
          width: '40px',
          height: '40px',
          right: '-45px',
          zIndex: 1,
        }}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          display: 'block',
          background: `url('/arrows/arrow_back_ios.svg') no-repeat center center`,
          backgroundSize: 'contain',
          width: '40px',
          height: '40px',
          left: '-45px',
          zIndex: 1,
        }}
      />
    );
  }

  function BookSlider({
    title,
    books,
    slidesToShow = 5,
    slidesToScroll = 4
  }) {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow,
      slidesToScroll,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
  
    return (
      <div className="book-slider">
        {title && <h3 className="bookslider-title">{title}</h3>}
        <Slider {...settings}>
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <Link to={book.link}>
                <img src={book.image ?? '/images/covernotavailable.png'}  alt={book.title} className="book-image" />
                <h5 className="bookslider-booktitle">
                    {book.title.length > 30
                      ? `${book.title.slice(0, 30)}...`
                      : book.title}
                </h5>
                <div className="book-stats">
                  <img className="bookshelf" src="/icons/bookshelf.svg" alt="Bookshelf" />
                  <p>{" " + book.bookshelves + " "}</p>
                  <img className="like" src={"/icons/heart_filled.svg"} alt="Like"/>
                  <p>{" " + book.likes+ " "}</p>
                  <img className="review" src="/icons/star.svg" alt="Review"/>
                  <p>{" " + book.reviews + " "}</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  

export default BookSlider;
