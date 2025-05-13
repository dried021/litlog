INSERT INTO user VALUES 
('aaa',NULL,'Thomas Brady','514-265-3691','brady',NULL,'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/1200px-ErnestHemingway.jpg',NULL,'pwd123',NULL,'hernandez@example.com','2025-05-12 06:38:15','Bookstagrammer. Romance & poetry obsessed.',2,1),
('bbb',NULL,'Reed Hernandez','010-1111-1111','hernandez',NULL,'https://i.pinimg.com/736x/0b/e2/09/0be2093ff5d14441a7495a37479a1ae2.jpg',NULL,'pwd123',NULL,'hernandez@example.com','2025-05-12 06:38:15','Librarian who reads fantasy on weekends.',2,1),
('ccc',NULL,'Camila Boyle','010-1111-1111','boyle',NULL,NULL,NULL,'pwd123',NULL,'boyle@example.com','2025-05-12 06:38:15',NULL,2,1),
('ddd',NULL,'Robin Gonzales','010-1111-1111','gonzales',NULL,NULL,NULL,'pwd123',NULL,'gonzales@example.com','2025-05-12 06:38:15',NULL,2,1),
('eee',NULL,'Hadley Tate','010-1111-1111','tate',NULL,NULL,NULL,'pwd123',NULL,'tate@example.com','2025-05-12 06:38:15',NULL,2,1),
('fff',NULL,'Dalton Boyer','010-1111-1111','boyer',NULL,NULL,NULL,'pwd123',NULL,'boyer@example.com','2025-05-12 06:38:15',NULL,2,1),
('ggg',NULL,'Chaya Marin','010-1111-1111','marin',NULL,NULL,NULL,'pwd123',NULL,'marin@example.com','2025-05-12 06:38:15',NULL,2,1),
('hhh',NULL,'Aldo Pham','010-1111-1111','pham',NULL,NULL,NULL,'pwd123',NULL,'pham@example.com','2025-05-12 06:38:15',NULL,2,1),
('iii',NULL,'Yuna Park','010-1111-1111','yuniverse',NULL,NULL,NULL,'pwd123',NULL,'yuniverse@example.com','2025-05-12 06:38:15',NULL,2,1),
('jjj',NULL,'Tyler Brooks','010-1111-1111','tythebookguy',NULL,NULL,NULL,'pwd123',NULL,'tythebookguy@example.com','2025-05-12 06:38:15',NULL,2,1),
('kkk',NULL,'Noah Kim','010-1111-1111','noahbooks',NULL,NULL,NULL,'pwd123',NULL,'noahbooks@example.com','2025-05-12 06:38:15',NULL,2,1),
('lll',NULL,'James Lin','010-1111-1111','jlin',NULL,NULL,NULL,'pwd123',NULL,'jlin@example.com','2025-05-12 06:38:15',NULL,2,1),
('mmm',NULL,'Sophia Rivera','010-1111-1111','sophiabooks',NULL,NULL,NULL,'pwd123',NULL,'sophiabooks@example.com','2025-05-12 06:38:15',NULL,2,1),
('nnn',NULL,'Leo Zhang','010-1111-1111','zhangleo',NULL,NULL,NULL,'pwd123',NULL,'zhangleo@example.com','2025-05-12 06:38:15',NULL,2,1),
('ooo',NULL,'Emma Lee','010-1111-1111','emreads',NULL,NULL,NULL,'pwd123',NULL,'emreads@example.com','2025-05-12 06:38:15',NULL,2,1),
('ppp',NULL,'Ravi Patel','010-1111-1111','bookravi',NULL,NULL,NULL,'pwd123',NULL,'bookravi@example.com','2025-05-12 06:38:15',NULL,2,1),
('qqq',NULL,'Hannah Kim','010-1111-1111','hannahreads',NULL,NULL,NULL,'pwd123',NULL,'hannahreads@example.com','2025-05-12 06:38:15',NULL,2,1),
('rrr',NULL,'Omar Hussein','010-1111-1111','pagewanderer',NULL,NULL,NULL,'pwd123',NULL,'pagewanderer@example.com','2025-05-12 06:38:15',NULL,2,1),
('sss',NULL,'Maya Thompson','010-1111-1111','mayabooks',NULL,NULL,NULL,'pwd123',NULL,'mayabooks@example.com','2025-05-12 06:38:15',NULL,2,1),
('ttt',NULL,'Julian Park','010-1111-1111','julespage',NULL,NULL,NULL,'pwd123',NULL,'julespage@example.com','2025-05-12 06:38:15',NULL,2,1),
('uuu',NULL,'Aisha Farah','010-1111-1111','aishawrites',NULL,NULL,NULL,'pwd123',NULL,'aishawrites@example.com','2025-05-12 06:38:15',NULL,2,1),
('vvv',NULL,'Carlos Mendes','010-1111-1111','carlitobooks',NULL,NULL,NULL,'pwd123',NULL,'carlitobooks@example.com','2025-05-12 06:38:15',NULL,2,1),
('www',NULL,'Tina Wu','010-1111-1111','tinareads',NULL,NULL,NULL,'pwd123',NULL,'tinareads@example.com','2025-05-12 06:38:15',NULL,2,1),
('xxx',NULL,'Tomoko Tanaka','010-1111-1111','tokobooks',NULL,NULL,NULL,'pwd123',NULL,'tokobooks@example.com','2025-05-12 06:38:15',NULL,2,1),
('yyy',NULL,'Nico Bernal','010-1111-1111','nicoshelf',NULL,NULL,NULL,'pwd123',NULL,'nicoshelf@example.com','2025-05-12 06:38:15',NULL,2,1),
('zzz',NULL,'Grace Miller','010-1111-1111','gracereads',NULL,NULL,NULL,'pwd123',NULL,'gracereads@example.com','2025-05-12 06:38:15',NULL,2,1);

INSERT INTO follow_list (user_id, follow_user_id) VALUES
('bbb', 'aaa'), /* aaa following list*/
('bbb', 'ccc'),
('bbb', 'ddd'),
('bbb', 'eee'),
('bbb', 'fff'),
('bbb', 'ggg'),
('bbb', 'hhh'),
('bbb', 'iii'),
('bbb', 'jjj'),
('bbb', 'kkk'), 
('bbb', 'lll'),
/*('aaa', 'mmm'),
('aaa', 'nnn'),
('aaa', 'ooo'),
('aaa', 'ppp'),
('aaa', 'qqq'),*/
('bbb', 'rrr'),
('bbb', 'sss'),
('bbb', 'ttt'), 
('bbb', 'uuu'),
('bbb', 'vvv'),
('bbb', 'www'),
('bbb', 'xxx'),
('bbb', 'yyy'),
('bbb', 'zzz'),
('aaa', 'bbb'), /* aaa follower list*/
('ccc', 'bbb'),
('ddd', 'bbb'),
('eee', 'bbb'),
('fff', 'bbb'),
('ggg', 'bbb'),
('hhh', 'bbb'),
('iii', 'bbb'),
('jjj', 'bbb'),
('kkk', 'bbb'),
('lll', 'bbb'),
('mmm', 'bbb'),
('nnn', 'bbb');




INSERT INTO book VALUES 
(1,'1HbVmUsuGiYC','Siddhartha',NULL,NULL,NULL,'2005-11-15',NULL,50,'https://sterling-us.imgix.net/covers/9781435166929.jpg?auto=format&h=648',NULL),
(2,'BwCQaeYMUfIC',"Ender's Game",NULL,NULL,NULL,NULL,NULL,120,'https://prodimage.images-bn.com/pimages/9781250773029_p0_v3_s1200x630.jpg',NULL),
(3,'rSno88UwfywC','The Hunger Games',NULL,NULL,NULL,'2008-11-15',NULL,NULL,'https://m.media-amazon.com/images/I/71un2hI4mcL.jpg',NULL),
(4,'mXqAEAAAQBAJ','Interstellar',NULL,NULL,NULL,NULL,NULL,NULL,'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583516578i/21488063.jpg',NULL),
(5,'jyjJDwAAQBAJ','In Defense of Anarchism',NULL,NULL,NULL,NULL,NULL,NULL,'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386924654i/61003.jpg',NULL),
(6,'-sVdQ32rW0QC','1984',NULL,NULL,NULL,'2005-11-15',NULL,200,'https://tankmuseumshop.org/cdn/shop/products/1984.jpg?v=1588779384&width=640',NULL),
(7,'ua1RSmAQmDAC','The English Patient',NULL,NULL,NULL,NULL,NULL,NULL,'http://books.google.com/books/content?id=fVjXBN9edXYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',NULL),
(8,'6Y7uBQAAQBAJ','Little Women',NULL,NULL,NULL,NULL,NULL,110,'https://cdn.britannica.com/04/126004-050-EC4DF54F/Dustcover-Louisa-May-Alcott-Little-Women-novel.jpg',NULL),
(9,'EvqJCGeqKhsC','Pride and Prejudice',NULL,NULL,NULL,NULL,NULL,300,'https://dynamic.indigoimages.ca/v1/books/books/1441341706/1.jpg?width=810&maxHeight=810&quality=85',NULL),
(10,'iXn5U2IzVH0C','The Great Gatsby',NULL,NULL,NULL,NULL,NULL,NULL,'https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1',NULL),
(11,'SK-utAEACAAJ',"Man's Search for Meaning",NULL,NULL,NULL,NULL,NULL,NULL,'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535419394i/4069.jpg',NULL),
(12,'JrzxyllMIAMC','The Brothers Karamazov',NULL,NULL,NULL,NULL,NULL,600,'https://m.media-amazon.com/images/I/71OZJsgZzQL.jpg',NULL),
(13,'sO9BfTuoGucC','For Whom the Bell Tolls',NULL,NULL,NULL,NULL,NULL,NULL,'http://books.google.com/books/content?id=KrM2EQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',NULL),
(14,'-itpDwAAQBAJ','A Little Life',NULL,NULL,NULL,NULL,NULL,500,'https://m.media-amazon.com/images/I/91lN1oKxWEL._UF1000,1000_QL80_.jpg',NULL);


INSERT INTO book_shelf VALUES 
(1,11,'bbb',2,'2025-05-12 15:38:15',24),
(2,12,'bbb',2,'2025-05-12 15:38:15',8),
(3,13,'bbb',2,'2025-05-12 15:38:15',78),
(4,14,'bbb',2,'2025-05-10 15:38:15',15), /* A Little Life */
(5,1,'bbb',3,'2025-05-12 15:38:15',100),
(6,2,'bbb',3,'2025-05-12 15:38:15',100),
(7,3,'bbb',3,'2025-05-12 15:38:15',100),
(8,4,'bbb',3,'2025-05-12 15:38:15',100),
(9,5,'bbb',3,'2025-05-10 15:38:15',100), /* Anarchism */
(10,7,'bbb',1,'2025-05-12 15:38:15',1),
(11,8,'bbb',1,'2025-05-12 15:38:15',1),
(12,9,'bbb',1,'2025-05-12 15:38:15',1),
(13,10,'bbb',1,'2025-05-12 15:38:15',1),
(14,6,'bbb',3,'2025-05-10 15:38:15',100); /* 1984 */


INSERT INTO book_review VALUES 
(1,'bbb',1,"A philosophical and introspective journey that left me pondering life's deeper meaning. Beautiful prose but slow at times.",3,'2025-05-12 15:38:15'),
(2,'bbb',2,"Absolutely thrilling! The twist at the end blew my mind. Ender’s character is both brilliant and tragic.",5,'2025-05-12 15:38:15'),
(3,'bbb',3,'Gripping from start to finish. Katniss is a compelling protagonist, though the love triangle was a bit cliché.',4,'2025-05-12 15:38:15'),
(4,'bbb',4,'An epic blend of science fiction and emotional storytelling. The visuals and soundtrack are unforgettable.',5,'2025-05-14 15:38:15'),
(5,'bbb',5,'A thought-provoking read that challenges mainstream political ideologies. Dense but worth it.',3,'2025-05-12 15:38:15'),
(6,'bbb',6,"A chilling and powerful portrayal of totalitarianism. Orwell\'s vision feels disturbingly relevant even today. A must-read for anyone interested in politics and human rights.",5,'2025-05-13 15:38:15');
 /* Interstellar, 1984 most recent */


/* Like type (id, user_id, target_id, like_type, creation_date)
1 - Review
2 - Book
3 - Collection
*/
INSERT INTO like_list VALUES 
(1,'bbb',4,2,'2025-05-12 15:38:15'), /* book Interstellar */
(2,'bbb',6,2,'2025-05-14 15:38:15'), /* book 1984 */
(3,'bbb',12,2,'2025-05-13 15:38:15'), /* book Karamazov  */
(4,'bbb',14,2,'2025-05-12 15:38:15'), /* book A little life  */
(5,'aaa',1,1,'2025-05-12 15:38:15'), /* like review Siddhartha (6 likes) */ 
(6,'bbb',1,1,'2025-05-12 15:38:15'),
(7,'ccc',1,1,'2025-05-12 15:38:15'),
(8,'ddd',1,1,'2025-05-12 15:38:15'),
(9,'eee',1,1,'2025-05-12 15:38:15'),
(10,'fff',1,1,'2025-05-12 15:38:15'),
(11,'aaa',3,1,'2025-05-12 15:38:15'), /* like review Hunger Games (5 likes*/
(12,'bbb',3,1,'2025-05-12 15:38:15'),
(13,'ccc',3,1,'2025-05-12 15:38:15'),
(14,'ddd',3,1,'2025-05-12 15:38:15'),
(15,'bbb',13,2,'2025-05-12 15:38:15');
/* liked books - 1984, Karamazov most reent */





/* MORE BOOKS */
INSERT INTO book VALUES
(15,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(16,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(17,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(18,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(19,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(20,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(21,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(22,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(23,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(24,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(25,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(26,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(27,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(28,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(29,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(30,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(31,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(32,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(33,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(34,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(35,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(36,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(37,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(38,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(39,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(40,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(41,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(42,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(43,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(44,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(45,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(46,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(47,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(48,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(49,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(50,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(51,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(52,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(53,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(54,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL),
(55,NULL,'title',NULL,NULL,NULL,'2005-11-15',NULL,NULL, NULL ,NULL)
;

INSERT INTO book_shelf (book_id, user_id, shelf_type, progress)
VALUES 
(15, 'bbb', 3, 100),
(16, 'bbb', 3, 100),
(17, 'bbb', 3, 100),
(18, 'bbb', 3, 100),
(19, 'bbb', 3, 100),
(20, 'bbb', 3, 100),
(21, 'bbb', 3, 100),
(22, 'bbb', 3, 100),
(23, 'bbb', 3, 100),
(24, 'bbb', 3, 100),
(25, 'bbb', 3, 100),
(26, 'bbb', 3, 100),
(27, 'bbb', 3, 100),
(28, 'bbb', 3, 100),
(29, 'bbb', 3, 100),
(30, 'bbb', 3, 100),
(31, 'bbb', 3, 100),
(32, 'bbb', 3, 100),
(33, 'bbb', 3, 100),
(34, 'bbb', 3, 100),
(35, 'bbb', 3, 100),
(36, 'bbb', 3, 100),
(37, 'bbb', 3, 100),
(38, 'bbb', 3, 100),
(39, 'bbb', 3, 100),
(40, 'bbb', 2, 80),
(41, 'bbb', 2, 75),
(42, 'bbb', 2, 1),
(43, 'bbb', 2, 3),
(44, 'bbb', 2, 45),
(45, 'bbb', 2, 3),
(46, 'bbb', 2, 3),
(47, 'bbb', 2, 3),
(48, 'bbb', 2, 3),
(49, 'bbb', 2, 3),
(50, 'bbb', 2, 3),
(51, 'bbb', 2, 3),
(52, 'bbb', 2, 3),
(53, 'bbb', 2, 3),
(54, 'bbb', 2, 3),
(55, 'bbb', 2, 3)
;
