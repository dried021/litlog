package com.bookfox.model;


import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookReviewListDTO {
    private int id;
    private String nickname;
    private String userId;
    private String userProfile;
    private int bookId;
    private String bookApiId;
    private String title;
    private String authors;
    private String thumbnail;
    private String content;
    private int rating;
    private Timestamp creationDate;
    private int likeCount;
}
