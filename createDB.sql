use bit;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS book_collection_comment;
DROP TABLE IF EXISTS book_collection_book;
DROP TABLE IF EXISTS book_collection;
DROP TABLE IF EXISTS like_list;
DROP TABLE IF EXISTS follow_list;
DROP TABLE IF EXISTS book_shelf;
DROP TABLE IF EXISTS book_review;
DROP TABLE IF EXISTS book_images;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS term;
DROP TABLE IF EXISTS email_veri;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS common_code;
DROP TABLE IF EXISTS common;

SET FOREIGN_KEY_CHECKS = 1;

-- 공통 코드 테이블 생성
CREATE TABLE common (
    common_id INT AUTO_INCREMENT PRIMARY KEY,
    common_code VARCHAR(50) UNIQUE NOT NULL,
    common_code_creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- 공통 코드 상세 테이블 생성
CREATE TABLE common_code (
    common_code_id INT AUTO_INCREMENT PRIMARY KEY,
    common_code VARCHAR(50) NOT NULL, -- common 테이블의 common_code를 참조
    common_name VARCHAR(100) NOT NULL,
    common_value INT NOT NULL UNIQUE,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    common_id INT,
    FOREIGN KEY (common_code) REFERENCES common(common_code) ON DELETE CASCADE,
    FOREIGN KEY (common_id) REFERENCES common(common_id) ON DELETE CASCADE,
    KEY unique_common_code_value (common_code, common_value), -- 복합 인덱스 추가
    KEY idx_common_value (common_value) -- 단독 인덱스 추가
);


CREATE TABLE user(
	id VARCHAR(50) PRIMARY KEY,
    id_reset_at TIMESTAMP NULL DEFAULT NULL,
    name VARCHAR(50) NOT NULL,
    tel VARCHAR(50),
    nickname VARCHAR(50) NOT NULL,
    nickname_reset_at TIMESTAMP NULL DEFAULT NULL,
    profile_image VARCHAR(255),
    profile_image_origin VARCHAR(255),
    pwd VARCHAR(255) NOT NULL,
    pwd_reset_at TIMESTAMP NULL DEFAULT NULL,
    email VARCHAR(100) NOT NULL,
    reg_date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    bio TEXT,

    user_type INT null, 
    user_status INT null,
	FOREIGN KEY (user_type) 
        REFERENCES common_code(common_value) ON DELETE SET NULL, 
    FOREIGN KEY (user_status) 
        REFERENCES common_code(common_value) ON DELETE SET NULL
);

CREATE TABLE email_veri (
	email VARCHAR(100) PRIMARY KEY,
    code VARCHAR(10),
    isVerified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE term (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE book (
    id VARCHAR(255) PRIMARY KEY,                        -- 책 고유 ID
    title VARCHAR(255),                                  -- 책 제목
    subtitle VARCHAR(255),                               -- 책 자막
    authors TEXT,                                        -- 저자 리스트
    publisher VARCHAR(255),                              -- 게시자
    published_date DATE,                                  -- 게시일
    description TEXT,                                    -- 책 설명
    page_count INT,                                       -- 페이지 수
    categories TEXT,                                     -- 카테고리 리스트

    book_category INT null,
    FOREIGN KEY (book_category) REFERENCES common_code(common_value) ON DELETE SET NULL
);

CREATE TABLE book_images (
    id VARCHAR(255) PRIMARY KEY,                         -- 책 고유 ID
    thumbnail VARCHAR(255),                              -- 썸네일 이미지 링크
    small VARCHAR(255),                                  -- 소형 이미지 링크
    medium VARCHAR(255),                                 -- 중형 이미지 링크
    large VARCHAR(255),                                  -- 대형 이미지 링크
    extra_large VARCHAR(255)                              -- 초대형 이미지 링크
);

CREATE TABLE book_review(
	id VARCHAR (50) PRIMARY KEY,
    user_id VARCHAR (50),
    book_id VARCHAR(255),
	title VARCHAR(255),
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
	FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE SET NULL
);

CREATE TABLE book_shelf(
	id INT AUTO_INCREMENT PRIMARY KEY,
    book_id VARCHAR(255),
    user_id VARCHAR(50), 
    shelf_type INT null,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    progress INT NOT NULL CHECK (progress BETWEEN 1 AND 100),		-- 진도
	FOREIGN KEY (shelf_type) REFERENCES common_code(common_value) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
	UNIQUE KEY unique_book_shelf (id, book_id)
);

CREATE TABLE follow_list(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL, 
    follow_user_id VARCHAR(50) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (follow_user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE like_list(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL, 
    target_id INT NOT NULL, 				-- 대상 ID 책이면 book.id review.id comment.id
    like_type INT NOT NULL, 
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
-- 사용 예시: 리뷰 좋아요
-- SELECT *
-- FROM `like` l
-- JOIN review r ON l.target_id = r.review_id
-- WHERE l.like_type_code = 'REVIEW';

CREATE TABLE book_collection(
	id INT AUTO_INCREMENT PRIMARY KEY,			-- 이건 프리메리
    user_id VARCHAR(50) NOT NULL, 
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255),
    content VARCHAR(1000), 
    thumbnail VARCHAR(255), 
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE book_collection_book(
	id INT AUTO_INCREMENT PRIMARY KEY,			-- 이건 프리메리
    collection_id INT NOT NULL, 		-- collection 분류. 같은 collection이면 같은 collection id
    book_id VARCHAR(255),
    thumbnail VARCHAR(255),
    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
    FOREIGN KEY (collection_id) REFERENCES book_collection(id) ON DELETE CASCADE
);

CREATE TABLE book_collection_comment(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL, 
    collection_id INT NOT NULL,
    content VARCHAR(1000),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES book_collection(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


