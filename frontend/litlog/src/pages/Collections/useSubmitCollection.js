import axios from 'axios';

export const useSubmitCollection = (title, content, selectedBooks, resetForm) => {
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
      await axios.post('http://localhost:9090/collections/new', payload, {
        withCredentials: true // 세션 기반 로그인이라면 필수
      });
      alert('콜렉션이 생성되었습니다!');
      resetForm(); // 폼 초기화
    } catch (err) {
      console.error('콜렉션 저장 실패:', err);
      alert('콜렉션 저장 중 오류 발생');
    }
  };

  return { handleSubmit };
};
