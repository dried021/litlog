import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './UserSlider.css';
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

  function UserSlider({
    title,
    users,
    slidesToShow = 5,
    slidesToScroll = 4,
    type
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
      <div className="user-slider">
        {title && <h3 className="userslider-title">{title}</h3>}
        <Slider {...settings}>
          {users.map((user) => (
            <div className="user-card" key={user.id}>

              <Link to={`/${user.id}`}>
                <img src={user.profile ?? '/icons/profile.svg'}  alt={user.title} className="user-profile" />
                <h5 className="user-id">{user.id}</h5>
                {(type=="avid")?  

                <div className="user-stats">  
                  <img className="bookshelf" src="/icons/bookshelf.svg" alt="Bookshelf" />
                  <p>{" " + user.bookshelves + " "}</p>
                  <img className="review" src="/icons/star2.svg" alt="Review"/>
                  <p>{" " + user.reviews + " "}</p>
                </div> 
                
                :  <div className="user-stats">  
                  <img className="bookshelf" src="/icons/bookshelf.svg" alt="Bookshelf" />
                  <p>{" " + user.collections + " "}</p>
                  <img className="like" src={"/icons/heart_filled.svg"} alt="Like"/>
                  <p>{" " + user.likes+ " "}</p>
                  <img className="view" src="/icons/followers.svg" alt="View"/>
                  <p>{" " + user.followers + " "}</p>
                </div>}
               
              </Link>

            </div>
          ))}
        </Slider>
      </div>
    );
  }
  

export default UserSlider;
