import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './UserSlider.css';
import defaultProfile from "../../../assets/default_profile.png";

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
    slidesToScroll = 1,
    type
  }) {

    const settings = {
      dots: false,
    infinite: false,          
    speed: 0,                
    slidesToShow,            
    slidesToScroll: 0,       
    arrows: false,          
    swipe: false,             
    draggable: false,      
    };
  
    return (
      <div className="user-slider">
        {title && <h3 className="userslider-title">{title}</h3>}
        <Slider {...settings}>
          {users.slice(0,5).map((user) => (
            <div className="user-card" key={user.id}>

              <Link to={`/${user.id}`}>
                <img src={user.profile ?
                  (user.profile.startsWith('http')
                  ? user.profile
                  : `http://localhost:9090${user.profile}`)
                  :defaultProfile}  
                  alt={user.title} className="user-profile" 
                />
                <h5 className="user-id">{user.nickname}</h5>
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
