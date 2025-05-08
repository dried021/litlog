import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './BookSlider.css';

const books = [
  {
    id: 1,
    title: 'THUNDERBOLTS',
    image: '/images/cat.jpg',
    link: '/books/thunderbolts',
    views: '473K',
    likes: '118K',
    hearts: '205K',
  },
  {
    id: 2,
    title: 'SINNERS',
    image: '/images/cat.jpg',
    link: '/books/sinners',
    views: '994K',
    likes: '169K',
    hearts: '468K',
  },
  {
    id: 3,
    title: 'CONCLAVE',
    image: '/images/cat.jpg',
    link: '/books/conclave',
    views: '1.5M',
    likes: '241K',
    hearts: '498K',
  },
  {
    id: 4,
    title: 'ANOTHER SIMPLE FAVOR',
    image: '/images/cat.jpg',
    link: '/books/another',
    views: '67K',
    likes: '9.2K',
    hearts: '9.4K',
  },
  // 필요한 만큼 추가 가능
];

function BookSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
  };

  return (
    <div className="book-slider">
      <h3>POPULAR FILMS THIS WEEK</h3>
      <Slider {...settings}>
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <Link to={book.link}>
              <img src={book.image} alt={book.title} className="book-image" />
              <h5>{book.title}</h5>
              <div className="book-stats">
                👁 {book.views} &nbsp;&nbsp; 👍 {book.likes} &nbsp;&nbsp; ❤️ {book.hearts}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BookSlider;
