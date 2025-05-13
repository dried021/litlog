import React from 'react';
import styles from './UserList.module.css';

function UserList({ users, onItemClick }) {
  return (
    <div className={styles['user-list']}>
      {users.map((user, index) => {
        return (
            <div key={`${user.id}-${index}`} 
                className={styles['user-item']} 
                onClick={() => onItemClick(user.id)}>

                <div className={styles['user-rank']}>
                    {(index === 0) ? <img src="/images/first.png" alt={"rank 1"} />
                    :(index === 1)? <img src="/images/second.png" alt={"rank 2"} />
                    : (index === 2)? <img src="/images/third.png" alt={"rank 3"} />
                : <p className={styles['user-rank-p']}>{index + 1}</p>}
                </div>

                <div className={styles['user-info']}>
                    <h3 className={styles['user-id']}>{user.id}</h3>
                    <p className={styles['user-bio']}>{user.bio}</p>

                    <div className={styles['user-stats']}>
                    <img className="bookshelf" src="/icons/bookshelf.svg" alt="reviews" />
                      <p className={styles['reviews']}>{"  "+user.reviews+" "}</p>

                      <img className="collections" src="/icons/collections.svg" alt="collections" />
                      <p className={styles['collections']}>{"  "+user.collections+" "}</p>

                      <img className="like" src={"/icons/heart_filled.svg"} alt="Like"/>
                      <p className={styles['likes']}>{"  "+user.likes+" "}</p>

                      <img className="view" src="/icons/followers.svg" alt="followers"/>
                      <p className={styles['followers']}>{"  "+user.followers}</p>
                    </div>
                </div>

                <div className={styles['user-book']}>
                    {user.books && user.books.map((book, i) => (
                        <img 
                        key={i} 
                        src={book.thumbnail || "/images/covernotavailable.png"} 
                        alt={`book-${i}`} 
                        className={styles['book-thumbnail']} 
                        />
                    ))}
                </div>

                <div className={styles['user-profile']}>
                    <img className={styles['user-profile-img']}
                    src={user.profile || "/icons/profile.svg"} alt={"profile"}/>
                </div>
            </div>
        );
      })}
    </div>
  );
}

export default UserList;