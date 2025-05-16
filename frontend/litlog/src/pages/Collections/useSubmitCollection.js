import axios from 'axios';

export const useSubmitCollection = (
  title,
  content,
  selectedBooks,
  resetForm,
  mode = 'create',       // 추가됨
  collectionId = null    // 추가됨
) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || selectedBooks.length === 0) {
      alert('제목, 설명, 책 선택을 모두 완료해주세요.');
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
        alert('콜렉션이 수정되었습니다!');
      } else {
        await axios.post('http://localhost:9090/collections/new', payload, {
          withCredentials: true
        });
        alert('콜렉션이 생성되었습니다!');
      }

      resetForm();
    } catch (err) {
      console.error('콜렉션 저장 실패:', err);
      alert('콜렉션 저장 중 오류 발생');
    }
  };

  return { handleSubmit };
};
