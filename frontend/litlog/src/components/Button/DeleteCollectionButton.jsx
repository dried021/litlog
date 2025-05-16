import React from 'react';
import axios from 'axios';
import styles from './DeleteButton.module.css';

function DeleteCollectionButton({ collectionId, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;

    console.log(collectionId);
    try {
      await axios.post(`http://localhost:9090/admin/collection`,
        { id: collectionId }, 
    );
      if (onDelete) onDelete(collectionId);
    } catch (error) {
      console.error('Failed to delete collection:', error);
      alert('Failed to delete collection.');
    }
  };

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      Delete Collection
    </button>
  );
}

export default DeleteCollectionButton;
