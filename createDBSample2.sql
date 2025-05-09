INSERT INTO book (
  id, title, subtitle, authors, publisher, published_date,
  description, page_count, categories, thumbnail, book_category
) VALUES
(101, '어둠의 왼손', NULL, '어슐러 르 귄', '황금가지', '2021-01-10', 'SF 고전 명작', 312, 'SF', 'https://books.google.com/books/content?id=abc123&printsec=frontcover&img=1&zoom=1', NULL),
(102, '나미야 잡화점의 기적', NULL, '히가시노 게이고', '현대문학', '2020-03-15', '감동적인 이야기', 295, '소설', '', NULL),
(103, '해리 포터와 마법사의 돌', NULL, 'J.K. 롤링', '문학수첩', '2000-07-08', '마법세계의 시작', 320, '판타지', 'https://books.google.com/books/content?id=def456&printsec=frontcover&img=1&zoom=1', NULL),
(104, '지구 끝의 온실', NULL, '김초엽', '자이언트북스', '2022-10-01', '디스토피아적 미래', 275, 'SF', NULL, NULL),
(105, '총 균 쇠', NULL, '재레드 다이아몬드', '문학사상사', '2005-06-22', '인류 문명사 통찰', 500, '역사', 'https://books.google.com/books/content?id=ghi789&printsec=frontcover&img=1&zoom=1', NULL),
(106, '82년생 김지영', NULL, '조남주', '민음사', '2016-10-10', '페미니즘 소설', 192, '사회', '', NULL),
(107, '연금술사', NULL, '파울로 코엘료', '문학동네', '1998-02-12', '삶의 여정에 대한 은유', 210, '자기계발', 'https://books.google.com/books/content?id=jkl012&printsec=frontcover&img=1&zoom=1', NULL),
(108, '데미안', NULL, '헤르만 헤세', '민음사', '1995-08-30', '성장소설의 고전', 243, '문학', NULL, NULL),
(109, '죽음에 관하여', NULL, '엘리자베스 퀴블러 로스', '한문화', '2019-11-02', '삶과 죽음에 대한 성찰', 310, '인문', 'https://books.google.com/books/content?id=mno345&printsec=frontcover&img=1&zoom=1', NULL),
(110, '종의 기원', NULL, '정유정', '은행나무', '2018-05-15', '심리 스릴러', 350, '스릴러', NULL, NULL);

INSERT INTO book_review (
  id, user_id, book_id, title, content, rating, creation_date
) VALUES
(1, 'user01', 101, '감동적인 이야기', '훌륭한 SF 소설', 5, '2025-01-15'),
(2, 'user01', 102, '잊을 수 없는 감정', '', 4, '2025-02-02'),
(3, 'user01', 103, '해리포터 재밌음', '초반 설정이 흥미로움', 5, '2025-03-10'),
(4, 'user01', 104, '지구 끝 느낌 뭔가 오묘함', '', 3, '2025-03-22'),
(5, 'user01', 105, '역사서치 강추', '인류학적 통찰이 돋보인다', 4, '2025-04-05'),
(6, 'user01', 106, '사회 문제에 대한 통찰', '', 5, '2025-04-12'),
(7, 'user01', 107, '연금술사 나만 별로였나', '기대만큼은 아니었다', 2, '2025-04-25'),
(8, 'user01', 108, '문장 너무 아름답다', '', 5, '2025-05-01'),
(9, 'user01', 109, '죽음에 대해 생각하게 됨', '추천', 4, '2025-05-03'),
(10, 'user01', 110, '재미있지만 집중이 안 됨', '', 3, '2025-05-05');

INSERT INTO like_list (
  user_id, target_id, like_type, creation_date
) VALUES
('user01', 1, 1, NOW()),
('user01', 3, 1, NOW()),
('user01', 7, 1, NOW());

INSERT INTO user (
  id, name, tel, nickname, profile_image, profile_image_origin,
  pwd, email, reg_date, bio, user_type, user_status
) VALUES (
  'user01', '나나', '010-1234-5678', '나나나', NULL, NULL,
  'encryptedPwd123!', 'nahye@example.com', NOW(), '책을 좋아합니다.',
  2, 1
);