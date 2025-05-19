import axios from 'axios';

export const useSubmitCollection = (
  title,
  content,
  selectedBooks,
  resetForm,
  mode = 'create',       
  collectionId = null,    
  navigate              
) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || selectedBooks.length === 0) {
      alert('Please fill in the title and description, and select at least one book.');
      return;
    }

    const payload = {
      title,
      content,
      thumbnail: selectedBooks[0].thumbnail,
      books: selectedBooks.map(book => ({
        bookApiId: book.bookApiId,
        title: book.title,
        authors: book.authors,
        publisher: book.publisher,
        thumbnail: book.thumbnail
      }))
    };

    try {
      if (mode === 'edit' && collectionId) {
        await axios.put(`http://localhost:9090/collections/${collectionId}`, payload, {
          withCredentials: true
        });
        alert('Collection updated successfully!');
      } else {
        await axios.post('http://localhost:9090/collections/new', payload, {
          withCredentials: true
        });
        alert('Collection created successfully!');
      }

      resetForm();

      navigate('/collections');
      
    } catch (err) {
      console.error('콜렉션 저장 실패:', err);
      alert('콜렉션 저장 중 오류 발생');
    }

  };

  return { handleSubmit };
};
