import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../libs/UserContext';
import axios from 'axios';
import styles from './BookMenu.module.css';
import menuIcon from '../../assets/menu.svg';

const BookMenu = ({ book, shelfType, onUpdated }) => {
    const { user } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuClick = () => {
        setIsMenuOpen(prev => !prev);
    };


    const [showProgressModal, setShowProgressModal] = useState(false);
    const [progress, setProgress] = useState(0);

    function updateProgress(bookId) {
        fetch(`/api/members/${user}/progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookId: bookId,
                progress: progress
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update progress');
            }
            return response.text();
        })
        .then(data => {
            setProgress(0);
            setShowProgressModal(false);
            if (progress === 100) {
                moveBookshelf(bookId, 3);
            }
            setIsMenuOpen(false);
            onUpdated();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const [showRemoveModal, setShowRemoveModal] = useState(false);

    function removeBook(bookId) {
        axios.delete(`/api/members/${user}/bookshelf/${bookId}`)
            .then((response) => {
                setShowRemoveModal(false);
                onUpdated();
            })
            .catch((error) => {
                console.error("Failed to delete", error);
            });
    }

    function moveBookshelf(bookId, bookshelfType) {
        axios.patch(`/api/members/${user}/bookshelf/${bookId}`, {
            bookshelfType: bookshelfType
        })
            .then((response) => {
                setIsMenuOpen(false);
                onUpdated();
            })
            .catch((error) => {
                console.error("Failed to update", error);
            })
    }

    const [showUnlikeModal, setShowUnlikeModal] = useState(false);
    function removeFavorite(bookId) {
        axios.delete(`/api/members/${user}/books/${bookId}`)
            .then((response) => {
                onUpdated();
            })
            .catch((error) => {
                console.error("Failed to update", error);
            })
    }

    return (
        <div className={styles.menuWrapper} ref={menuRef}>
            <button onClick={handleMenuClick} className={styles.menuButton}>
                <img src={menuIcon} alt="menu icon" />
            </button>
            {isMenuOpen && (
                <div className={styles.menuContent}>
                    {shelfType === 'current' && (
                        <>
                            <button onClick={() => moveBookshelf(book.bookId, 1)} className={styles.menuOption}>Move to To-Read</button>
                            <button onClick={() => setShowProgressModal(true)} className={styles.menuOption}>Update progress</button>
                            <button onClick={() => setShowRemoveModal(true)} className={styles.menuOption}>Remove</button>
                        </>
                    )}
                    {shelfType === 'finished' && (
                        <>
                            <button onClick={() => moveBookshelf(book.bookId, 2)} className={styles.menuOption}>Start reading again</button>
                            <button onClick={() => setShowRemoveModal(true)} className={styles.menuOption}>Remove</button>
                        </>
                    )}
                    {shelfType === 'to-read' && (
                        <>
                            <button onClick={() => moveBookshelf(book.bookId, 2)} className={styles.menuOption}>Start reading</button>
                            <button onClick={() => setShowRemoveModal(true)} className={styles.menuOption}>Remove</button>
                        </>
                    )}
                    {shelfType === 'favorite' && (
                        <>
                            <button onClick={() => setShowUnlikeModal(true)} className={styles.menuOption}>
                                Remove favorite
                            </button>
                        </>
                    )}
                    {showProgressModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <h3>Reading progress (%)</h3>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    onChange={(e) => {
                                        const val = Math.max(0, Math.min(100, Number(e.target.value)));
                                        setProgress(val);
                                    }}
                                    defaultValue={book.progress}
                                />
                                <div className={styles.modalButtons}>
                                    <button onClick={() => updateProgress(book.bookId)} className={styles.saveButton}>Save</button>
                                    <button onClick={() => setShowProgressModal(false)} className={styles.cancelButton}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showRemoveModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <p>Remove book from shelf?</p>
                                <div className={styles.modalButtons}>
                                    <button onClick={() => removeBook(book.bookId)} className={styles.saveButton}>Remove</button>
                                    <button onClick={() => setShowRemoveModal(false)} className={styles.cancelButton}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showUnlikeModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <p>Remove book from favorites?</p>
                                <div className={styles.modalButtons}>
                                    <button onClick={() => removeFavorite(book.bookId)} className={styles.saveButton}>Remove</button>
                                    <button onClick={() => setShowUnlikeModal(false)} className={styles.cancelButton}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookMenu;