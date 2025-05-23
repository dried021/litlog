import React from 'react';
import styles from './UserList.module.css';
import defaultProfile from "../../../assets/default_profile.png";

function UserList({ users, onItemClick, isRank, currentPage=1 }) {
  return (
    <div className={styles['user-list']}>
      {users.map((user, index) => {
        const displayIndex = index + (currentPage-1) * 10;
        return (
            <div key={`${user.id}-${displayIndex}`} 
                className={styles['user-item']} 
                onClick={() => onItemClick(user.id)}>

                <div className={styles['user-rank']}>
                    {(displayIndex === 0 && isRank) ? <img src="/LitLog/images/first.png" alt={"rank 1"} />
                    :(displayIndex === 1 && isRank)? <img src="/LitLog/images/second.png" alt={"rank 2"} />
                    : (displayIndex === 2 && isRank)? <img src="/LitLog/images/third.png" alt={"rank 3"} />
                : <p className={styles['user-rank-p']}>{displayIndex + 1}</p>}
                </div>
                <div className={styles['user-profile']}>
                    <img className={styles['user-profile-img']}
                      src = {user.profile ?
                        (user.profile.startsWith('http')
                        ? user.profile
                        : `/LitLog/api/${user.profile}`)
                        :defaultProfile}  
                      alt={"profile"}
                    />
                </div>

                <div className={styles['user-info']}>
                <h3 className={styles['user-id']}>
                    {user.nickname}
                    <span className={styles['user-id-gray']}> ({user.id})</span>
                  </h3>
                    <p className={styles['user-bio']}>{user.bio}</p>

                    <div className={styles['user-stats']}>
                    <img className="bookshelf" src="/LitLog/icons/bookshelf.svg" alt="reviews" />
                      <p className={styles['reviews']}>{"  "+user.reviews+" "}</p>

                      <img className="collections" src="/LitLog/icons/collections.svg" alt="collections" />
                      <p className={styles['collections']}>{"  "+user.collections+" "}</p>

                      <img className="like" src={"/LitLog/icons/heart_filled.svg"} alt="Like"/>
                      <p className={styles['likes']}>{"  "+user.likes+" "}</p>

                      <img className="view" src="/LitLog/icons/followers.svg" alt="followers"/>
                      <p className={styles['followers']}>{"  "+user.followers}</p>
                    </div>
                </div>

                <div className={styles['user-book']}>
                    {user.books && user.books.map((book, i) => (
                      <a key={`${user.id}-book-${book.bookApiId || i}`} href={`/books/${book.bookApiId}`}>
                        <img 
                          src={book.thumbnail || "/LitLog/images/covernotavailable.png"} 
                          alt={`book-${i}`} 
                          className={styles['book-thumbnail']} 
                        />
                      </a>
                    ))}
                </div>

                
            </div>
        );
      })}
    </div>
  );
}

export default UserList;