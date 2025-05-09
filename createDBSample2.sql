use bit;
INSERT INTO book (
  id, title, subtitle, authors, publisher, published_date, description, page_count, categories, book_category
)
VALUES (
  'book123', 
  '어둠의 왼손', 
  'SF 걸작선', 
  '어슐러 K. 르 귄', 
  '황금가지', 
  '2003-05-15', 
  '기후가 양성 없는 외계 문명 이야기', 
  400, 
  'SCIENCE FICTION', 
  10
);

INSERT INTO book_images (
  id, thumbnail, small, medium, large, extra_large
)
VALUES (
  'book123',
  'https://books.google.com/books/content?id=abc123&printsec=frontcover&img=1&zoom=1',
  null, null, null, null
);

INSERT INTO book_review (
  id, user_id, book_id, title, content, rating
)
VALUES (
  'review999', 
  'user01', 
  'book123', 
  '진짜 신박한 설정!', 
  '중성의 인물들이 나오는 게 정말 새로웠어요.', 
  5
);
UPDATE book_images
SET thumbnail = NULL
WHERE id = 'book001';

UPDATE book_images
SET thumbnail = 'https://books.google.com/books/content?id=test123&printsec=frontcover&img=1'
WHERE id = 'book002';
