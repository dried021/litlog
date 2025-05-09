
-- 1. 공통 코드 (common)

-- 2. 사용자 (user)
INSERT INTO user(id, name, tel, nickname, pwd, email, user_type, user_status)
VALUES 
('user01', '홍길동', '010-1111-1111', '길동이01', 'pwd123', 'hong01@example.com', 2, 1),
('user02', '김철수', '010-1111-1112', '철수02', 'pwd123', 'kim02@example.com', 2, 1),
('user03', '이영희', '010-1111-1113', '영희03', 'pwd123', 'lee03@example.com', 2, 1),
('user04', '박민수', '010-1111-1114', '민수04', 'pwd123', 'park04@example.com', 2, 1),
('user05', '최지은', '010-1111-1115', '지은05', 'pwd123', 'choi05@example.com', 2, 1),
('user06', '정유진', '010-1111-1116', '유진06', 'pwd123', 'jung06@example.com', 2, 1),
('user07', '한가람', '010-1111-1117', '가람07', 'pwd123', 'han07@example.com', 2, 1),
('user08', '오하늘', '010-1111-1118', '하늘08', 'pwd123', 'oh08@example.com', 2, 1),
('user09', '신소율', '010-1111-1119', '소율09', 'pwd123', 'shin09@example.com', 2, 1),
('user10', '문지훈', '010-1111-1120', '지훈10', 'pwd123', 'moon10@example.com', 2, 1),
('user11', '조세현', '010-1111-1121', '세현11', 'pwd123', 'jo11@example.com', 2, 1),
('user12', '배수아', '010-1111-1122', '수아12', 'pwd123', 'bae12@example.com', 2, 1),
('user13', '양지훈', '010-1111-1123', '지훈13', 'pwd123', 'yang13@example.com', 2, 1),
('user14', '강서윤', '010-1111-1124', '서윤14', 'pwd123', 'kang14@example.com', 2, 1),
('user15', '류시원', '010-1111-1125', '시원15', 'pwd123', 'ryu15@example.com', 2, 1),
('user16', '임도윤', '010-1111-1126', '도윤16', 'pwd123', 'lim16@example.com', 2, 1),
('user17', '노지민', '010-1111-1127', '지민17', 'pwd123', 'no17@example.com', 2, 1),
('user18', '구하나', '010-1111-1128', '하나18', 'pwd123', 'koo18@example.com', 2, 1),
('user19', '장예린', '010-1111-1129', '예린19', 'pwd123', 'jang19@example.com', 2, 1),
('user20', '윤지호', '010-1111-1130', '지호20', 'pwd123', 'yoon20@example.com', 2, 1),
('admin01', '관리자', '010-0000-0000', 'admin', 'adminpwd', 'admin@example.com', 1, 1);

-- 3. 이메일 인증 (email_veri)
INSERT INTO email_veri(email, code, isVerified) 
VALUES 
('hong@example.com', '123456', TRUE),
('admin@example.com', '654321', TRUE);

-- 4. 약관 (term)
INSERT INTO term(title, content)
VALUES
('이용약관', '이 약관은 ...'),
('개인정보 처리방침', '귀하의 개인정보는 ...');

-- 5. 책 (book)
INSERT INTO book(id, title, subtitle, authors, publisher, published_date, description, page_count, categories, book_category)
VALUES 
('book001', '나미야 잡화점의 기적', '기적 같은 이야기', '히가시노 게이고', '현대문학', '2012-01-01', '밤에만 열리는 신비한 가게', 320, 'FICTION', 1),
('book002', '코스모스', '우주의 신비', '칼 세이건', '사이언스북스', '1980-06-01', '우주를 탐사한 명저', 500, 'SCIENCE', 10);

-- 6. 책 이미지 (book_images)
INSERT INTO book_images(id, thumbnail, small, medium, large, extra_large)
VALUES 
('book001', 'thumb1.jpg', 'small1.jpg', 'med1.jpg', 'large1.jpg', 'xl1.jpg'),
('book002', 'thumb2.jpg', 'small2.jpg', 'med2.jpg', 'large2.jpg', 'xl2.jpg');

-- 7. 책 리뷰 (book_review)
INSERT INTO book_review(id, user_id, book_id, title, content, rating)
VALUES 
('review001', 'user01', 'book001', '인상 깊은 책', '너무 감동적이었어요.', 5),
('review002', 'admin01', 'book002', '우주를 느끼다', '과학에 대한 흥미가 생겼어요.', 4);

-- 8. 책장 (book_shelf)
INSERT INTO book_shelf(book_id, user_id, shelf_type, progress)
VALUES 
('book001', 'user01', 2, 30),
('book002', 'admin01', 3, 100);

-- 9. 팔로우 (follow_list)
INSERT INTO follow_list(user_id, follow_user_id)
VALUES 
('user01', 'admin01');

-- 10. 좋아요 (like_list)
INSERT INTO like_list(user_id, target_id, like_type)
VALUES 
('user01', 1, 1);  -- review001에 좋아요

-- 11. 책 콜렉션 (book_collection)
INSERT INTO book_collection(id, user_id, title, content, thumbnail)
VALUES 
(1, 'user01', '나만의 감동 리스트', '이 책들을 추천합니다.', 'thumb1.jpg');

-- 12. 책 콜렉션에 책 추가 (book_collection_book)
INSERT INTO book_collection_book(collection_id, book_id, thumbnail)
VALUES 
(1, 'book001', 'thumb1.jpg');

-- 13. 책 콜렉션 댓글 (book_collection_comment)
INSERT INTO book_collection_comment(user_id, collection_id, content)
VALUES 
('admin01', 1, '좋은 책 모음이네요!');



select * from common;
select * from common_code;


SELECT user();
select database();

show create table common_code;
show create table user;

select version();