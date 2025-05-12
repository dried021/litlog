package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileReviewDto {
    private int id;
    private String userId;
    private int bookId;
    private String title;
    private String content;
    private int rating;
    private Timestamp creationDate;

    private String bookApiId;
    private int likeStatus;
    private int likeCount;
    private String thumbnail;
}
