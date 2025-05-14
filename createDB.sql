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
DROP TABLE IF EXISTS like_type;
DROP TABLE IF EXISTS shelf_type;
DROP TABLE IF EXISTS book_category;
DROP TABLE IF EXISTS user_status;
DROP TABLE IF EXISTS user_type;

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE user_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    value INT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_type (name, value) VALUES
('ADMIN', 1),
('USER', 2);

CREATE TABLE user_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    value INT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_status (name, value) VALUES
('ACTIVE', 1),
('BANNED', 2),
('WITHDRAWN', 3);

CREATE TABLE book_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    value INT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO book_category (name, value) VALUES
('FICTION', 1),
('NONFICTION', 2),
('CHILDRENS BOOKS', 3),
('HEALTH&FITNESS', 4),
('COOKING FOOD&WINE', 5),
('ART&PHOTOGRAPHY', 6),
('MUSIC', 7),
('RELIGION&SPIRITUALITY', 8),
('TRAVEL', 9),
('SCIENCE', 10),
('etc', 11);

CREATE TABLE shelf_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    value INT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shelf_type (name, value) VALUES
('WISH_BOOK', 1),
('READING_BOOK', 2),
('READ_BOOK', 3);

CREATE TABLE like_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    value INT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO like_type (name, value) VALUES
('REVIEW', 1),
('BOOK', 2),
('BOOK_COLLECTION', 3);

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
        REFERENCES user_type(value) ON DELETE SET NULL, 
    FOREIGN KEY (user_status) 
        REFERENCES user_status(value) ON DELETE SET NULL
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
    id INT PRIMARY KEY AUTO_INCREMENT,                        -- 책 고유 ID
    book_api_id VARCHAR(255),
    title VARCHAR(255),                                  -- 책 제목
    subtitle VARCHAR(255),                               -- 책 자막
    authors VARCHAR(255),                                       -- 저자 리스트
    publisher VARCHAR(255),                              -- 게시자
    published_date DATE,                                  -- 게시일
    description TEXT,                                    -- 책 설명
    page_count INT,                                       -- 페이지 수

    thumbnail TEXT,
    book_category INT null,
    FOREIGN KEY (book_category) REFERENCES book_category(value) ON DELETE SET NULL,

    CONSTRAINT unique_book_api_id UNIQUE (book_api_id)
);

CREATE TABLE book_review(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR (50),
    book_id INT,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
	FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE SET NULL
);

CREATE TABLE book_shelf(
	id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id VARCHAR(50), 
    shelf_type INT null,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    progress INT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),		-- 진도
	FOREIGN KEY (shelf_type) REFERENCES shelf_type(value) ON DELETE SET NULL,
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
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (like_type) REFERENCES like_type(value)
);

-- ('REVIEW', 1),
-- ('BOOK', 2),
-- ('BOOK_COLLECTION', 3)

CREATE TABLE book_collection(
	id INT AUTO_INCREMENT PRIMARY KEY,			-- 이건 프리메리
    user_id VARCHAR(50) NOT NULL, 
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255),
    content VARCHAR(1000), 
    thumbnail VARCHAR(300), 
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
SELECT * from book;
SELECT * from book_collection_book;

CREATE TABLE book_collection_book(
	id INT AUTO_INCREMENT PRIMARY KEY,			-- 이건 프리메리
    collection_id INT NOT NULL, 		-- collection 분류. 같은 collection이면 같은 collection id
    book_id INT,
    thumbnail VARCHAR(300),
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

CREATE TABLE book_collection_like (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    collection_id INT NOT NULL,
    liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES book_collection(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
