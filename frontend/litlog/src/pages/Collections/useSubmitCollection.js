import axios from 'axios';

export const useSubmitCollection = (
  title,
  content,
  selectedBooks,
  resetForm,
  mode = 'create',
  collectionId = null,
  navigate,
  openModal
) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || selectedBooks.length === 0) {
      openModal({
        message: 'Please fill in the title and description, and select at least one book.',
        resultValue: '0',
        mode: 'close'
      });
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
        openModal({
          message: 'Collection updated successfully!',
          resultValue: '1',
          mode: 'close',
          resetForm(){},
          callbackOnSuccess: () => navigate('/collections')
        });
      } else {
        await axios.post('http://localhost:9090/collections/new', payload, {
          withCredentials: true
        });
        openModal({
          message: 'Collection created successfully!',
          resultValue: '1',
          mode: 'close',
          resetForm(){},
          callbackOnSuccess: () => navigate('/collections')
        });
      }

    } catch (err) {
      console.error('Failed to save collection:', err);
      openModal({
        message: 'Failed to save the collection.',
        resultValue: '0',
        mode: 'close'
      });
    }
  };

  return { handleSubmit };
};
