SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM book_collection_comment where not id = -1;
DELETE FROM book_collection_book where not id = -1;
DELETE FROM book_collection where not id = -1;
DELETE FROM like_list where not id = -1;
DELETE FROM follow_list where not id = -1;
DELETE FROM book_shelf where not id = -1;
DELETE FROM book_review where not id = -1;
DELETE FROM book where not id = -1;
DELETE FROM term where not id = -1;
DELETE FROM email_veri where not email = "litlog 화이팅";
DELETE FROM user where not id = "litlog 화이팅";
SET FOREIGN_KEY_CHECKS = 1;



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
INSERT INTO book(id, book_api_id, title, subtitle, authors, publisher, published_date, description, page_count, book_category)
VALUES 
(1, "1", '나미야 잡화점의 기적', '기적 같은 이야기', '히가시노 게이고', '현대문학', '2012-01-01', '밤에만 열리는 신비한 가게', 320, 1),
(2, "2", '코스모스', '우주의 신비', '칼 세이건', '사이언스북스', '1980-06-01', '우주를 탐사한 명저', 500, 10),
(3, "-9F9WaXUhRYC", 'The Night Circus', 'A Novel', 'Erin Morgenstern', 'Knopf Doubleday Publishing Group', '2011-09-13', 'NEW YORK TIMES BESTSELLER • Two starcrossed magicians engage in a deadly game of cunning in the spellbinding novel that captured the worlds imagination. • "Part love story, part fable ... defies both genres and expectations." —The Boston Globe  The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not. Within the black-and-white striped canvas tents is an utterly unique experience full of breathtaking amazements. It is called Le Cirque des Rêves, and it is only open at night.   But behind the scenes, a fierce competition is underway: a duel between two young magicians, Celia and Marco, who have been trained since childhood expressly for this purpose by their mercurial instructors. Unbeknownst to them both, this is a game in which only one can be left standing. Despite the high stakes, Celia and Marco soon tumble headfirst into love, setting off a domino effect of dangerous consequences, and leaving the lives of everyone, from the performers to the patrons, hanging in the balance.', 500, 1);

-- 7. 책 리뷰 (book_review)
INSERT INTO book_review(id, user_id, book_id, content, rating)
VALUES 
(1, 'user01', 3, '너무 감동적이었어요.', 5),
(2, 'admin01', 3, '과학에 대한 흥미가 생겼어요.', 4),
(3, 'user01', 3, '리뷰 테스트3', 3),
(4, 'user01', 3, '리뷰 테스트4', 2),
(5, 'user01', 3, '리뷰 테스트5', 1),
(6, 'user01', 3, '리뷰 테스트6', 3),
(7, 'user01', 3, '리뷰 테스트7', 4),
(8, 'user01', 3, '리뷰 테스트8', 5),
(9, 'user01', 3, '리뷰 테스트9', 3),
(10, 'user01', 3, '리뷰 테스트10', 2),
(11, 'user01', 3, '리뷰 테스트11', 5),
(12, 'user01', 3, '리뷰 테스트12', 3),
(13, 'user01', 3, '리뷰 테스트13', 2);

-- 8. 책장 (book_shelf)
INSERT INTO book_shelf(book_id, user_id, shelf_type, progress)
VALUES 
(1, 'user01', 2, 30),
(2, 'admin01', 3, 100),
(3, 'user01', 2, 30);

-- 9. 팔로우 (follow_list)
INSERT INTO follow_list(user_id, follow_user_id)
VALUES 
('user01', 'admin01');


-- 10. 좋아요 (like_list)
-- ('REVIEW', 1),
-- ('BOOK', 2),
-- ('BOOK_COLLECTION', 3)
INSERT INTO like_list(user_id, target_id, like_type)
VALUES 
('user01', 1, 1),  -- review001에 좋아요
('user01', 3, 2); -- id가 3인 책(like_type가 2)에 좋아요

-- 11. 책 콜렉션 (book_collection)

SELECT * from book_collection

INSERT INTO book_collection (user_id, creation_date, title, content, thumbnail)
VALUES
('user01', '2025-05-13', '얼음과 불의 노래', '통쾌한 결말을 가진 소설들 모음입니다.', 'http://books.google.com/books/publisher/content?id=bNW-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE733JkpcbfA-7iOsHv4jWjvD_XeBSP3Ta-3rwh4EVkE4UqRK1v13OuElHEyTYoRJCNPVJv6aY-Wqr6IfdFCzMNrQ2meyOiEnYRYA45cAhGU7egvprpPWGDXy4vVostUQ_swB2six&source=gbs_api'),
('user02', '2025-05-14', '나니아 연대기기', '마음이 편안해지는 이야기 모음입니다.', 'http://books.google.com/books/publisher/content?id=bR3REAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE704gz2uBJus0XQvgnl04svj9VzI12HDdAZk1cEGSLsiWbXM-0JCN2o-cy9vhUEnlIgTRueHDgfoEjeyA-5K7avlz_FbR4hCjXIb-6OAyzT99lBfqJ403ny1QE57wgWZ2T0a3BFB&source=gbs_api'),
('user03', '2025-05-11', '해리포터 시리즈', '배꼽 빠질 정도로 웃긴 책만 모았어요.', 'http://books.google.com/books/content?id=BGXkMAAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71awvMbdyokYm6G0Uu5SxxGXT_WXJNojVbme93BNu2kRIc4AwiVzgksiIAM-32YhUrHvv7cE23VCGDCmHRCDdH9qm9brKue_AC-rhiKe6NOO2epuKljtP4N6cTroPpxYQ0ZOC2u&source=gbs_api');

-- 12. 책 콜렉션에 책 추가 (book_collection_book)
INSERT INTO book_collection_book(collection_id, book_id, thumbnail)
VALUES 
(5, 37, 'http://books.google.com/books/publisher/content?id=bNW-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE733JkpcbfA-7iOsHv4jWjvD_XeBSP3Ta-3rwh4EVkE4UqRK1v13OuElHEyTYoRJCNPVJv6aY-Wqr6IfdFCzMNrQ2meyOiEnYRYA45cAhGU7egvprpPWGDXy4vVostUQ_swB2six&source=gbs_api'),
(5, 38, 'http://books.google.com/books/publisher/content?id=YlolDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73oSy78PrYkR67bncDP6QZZgSISkE9Z37rny116OgeQdywbaWih-jeoprMlQ1WWz1v9fKy1JBvIybnIE0Q8PdVxs3xIV4u2jk-kjuLVOXuwBPvHqBl8o3RkolBRBW6Hdihn8rm2&source=gbs_api'),
(5, 39, 'http://books.google.com/books/publisher/content?id=MnNnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72AHMwcZNWj0ncj6y_qSv871OhzwwS3wzQm7I3DBvRO20IVHaPzt8TNovaOxoO2ifuJ9t4rYx2W2kmaG8uQ-HTG-wQ52zWDU82IP81XdiarPnFLO0DwLN8H7t0KqbIPAn9rk95L&source=gbs_api'),
(5, 40, 'http://books.google.com/books/publisher/content?id=YlolDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73oSy78PrYkR67bncDP6QZZgSISkE9Z37rny116OgeQdywbaWih-jeoprMlQ1WWz1v9fKy1JBvIybnIE0Q8PdVxs3xIV4u2jk-kjuLVOXuwBPvHqBl8o3RkolBRBW6Hdihn8rm2&source=gbs_api'),
(5, 40, 'http://books.google.com/books/publisher/content?id=tGquDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70Hl-OX30yUFImp6wL1EWND3Cq8205mYuGkKsbiJqO3REJZBvAjDqTBd9uZQXR9_7_7eY6sfgTdTb5EhX6UWURtLP5vU5IEidMTRal3OTB2OmszBkF8GzCvoMQR1pRMCJ39ju46&source=gbs_api'),
(5, 41, 'http://books.google.com/books/publisher/content?id=JLgDEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72Mkna2XQok-SybMBAbDF98i16eXIESeQ0iBsbsZ8qnK94xig3DO5e8hiFHdqoLelFOO6s8Yz9w7CV_g2uad6rvFLAXzwQv0FsTZ7PH4LTkw-h-GUBy6twl3PafuVGIi_IsP24E&source=gbs_api'),
(6, 42, 'http://books.google.com/books/publisher/content?id=bR3REAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE704gz2uBJus0XQvgnl04svj9VzI12HDdAZk1cEGSLsiWbXM-0JCN2o-cy9vhUEnlIgTRueHDgfoEjeyA-5K7avlz_FbR4hCjXIb-6OAyzT99lBfqJ403ny1QE57wgWZ2T0a3BFB&source=gbs_api'),
(6, 43, 'http://books.google.com/books/publisher/content?id=UiLREAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE722FsEXnWPL8ni7JnJmqQ9YlsQM21rCpSLPKavEW9ngijRPGn3KcxN5hPqGANQuDjKIbqry2qR-gjxeCSb4iOwolrAkVMhI2cIHoaXO-tztGvXnsVyzsSmVjTfe9HK1zhGlP151&source=gbs_api'),
(6, 44, 'http://books.google.com/books/publisher/content?id=yR3REAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70BrVFuBM2aWr6HNOVf0jqyJcY8zpsIZplKS8iHmcKZzyaUXZ2GOWgzOSHBQ1mm67zCaJiQY6aaV1hW_srczocBW6NWD_cIcPyp8X4MpsoGezlbHob1BDkH_uFM5sxPGc0Vac2I&source=gbs_api'),
(6, 45, 'http://books.google.com/books/publisher/content?id=NCPREAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71-5sx8m3Kfp3y65dkplY5S6QvNhiz-ZtVVpBBBJnaWd28dV62YYZdRabJ12GCRanfRFIKnvfLBfNGBP6GT_AaTcZx9WUT4MGodPsnik7lo0d_RsYTNFoef999d1pieba1CkaTe&source=gbs_api'),
(6, 46, 'http://books.google.com/books/publisher/content?id=AErREAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73ZKUVvGOptcoAJalu4E9b4ftyI0d__alE0khx-ZXMVWd5TD5g_mLMTmAsFBxsDqk_CfGf5ZDyQvEaYrnWRpNeHpx-xbgId02UDV0EuiSIyQgceNEZoMnVOjffUd2DFb9ogUAY0&source=gbs_api'),
(6, 47, 'http://books.google.com/books/publisher/content?id=bkrREAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73b3cWujh4clc2ehLbbynQv_KrcV1t2chSAtxa9aiUH1ZDxZWHM96k91KyOVsHVtZ46M73LzsrsPQFODgelq95-YWDkFzsgtoGw_KKrSWeV-XCTIWxUaQu36J5yTm71v8QN4pik&source=gbs_api'),
(6, 48, 'http://books.google.com/books/publisher/content?id=fR3REAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71GuaCPQ2n1JsuvSg0Z4QBHykN-pujXyCz1rXXrxj1vt0w-DoqamRabyFebMp6cHj-WtBbY9AirPVsbzpLxOyHjiFoo-KnzI8t7CpJg_aLbvLVSm2mDG76he9cwTu2wzwJD7rCX&source=gbs_api'),
(7, 49, '/images/covernotavailable.png'),
(7, 50, 'http://books.google.com/books/content?id=BGXkMAAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71awvMbdyokYm6G0Uu5SxxGXT_WXJNojVbme93BNu2kRIc4AwiVzgksiIAM-32YhUrHvv7cE23VCGDCmHRCDdH9qm9brKue_AC-rhiKe6NOO2epuKljtP4N6cTroPpxYQ0ZOC2u&source=gbs_api'),
(7, 51, 'http://books.google.com/books/content?id=we1EMgAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70M8bMNp1zPVCNWd2UJMjnqjnEuDLnd_FwL3TTNLIfgA0Ct_byp2NWpFElGVQ8swV2pXIAyZxOOD9JMpfWmR-WbWzL3X5sHmHD507D2J0R-RV2e9mfW87_Ff0RpwQbZcf1LJnXA&source=gbs_api'),
(7, 52, '/images/covernotavailable.png'),
(7, 53, '/images/covernotavailable.png'),
(7, 54, 'http://books.google.com/books/publisher/content?id=YwfYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72HomLx91itLlOSdQkm79YJkNPNx7SqXDudMpv3JMLR8dnbuIRDNuNc8bOYuVn1WiuqlOHI0orMZ61vLQigfcqgUNdBQuhLRz0zLOIaOFQvZ6-ABEgmktREkFKh2MmqVWd76Pc0&source=gbs_api'),
(7, 55, '/images/covernotavailable.png');
-- 13. 책 콜렉션 댓글 (book_collection_comment)
INSERT INTO book_collection_comment(user_id, collection_id, content)
VALUES 
('admin01', 1, '좋은 책 모음이네요!');

-- 좋아요 수 가정: 10, 3, 7
INSERT INTO book_collection_like (collection_id, user_id) VALUES
(5, 'user01'), (5, 'user02'), (5, 'user03'), (5, 'user04'), (5, 'user05'),
(5, 'user06'), (5, 'user07'), (5, 'user08'), (5, 'user09'), (5, 'user10'),
(6, 'user01'), (6, 'user02'), (6, 'user03'),
(7, 'user01'), (7, 'user02'), (7, 'user03'), (7, 'user04'), (7, 'user05'),
(7, 'user06'), (7, 'user07');
