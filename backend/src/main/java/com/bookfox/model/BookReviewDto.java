package com.bookfox.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookReviewDto {
    private int id;
    private String userId;
    private String userProfile;
    private int bookId;
    private String bookApiId;
    private String title;
    private String content;
    private int rating;
    private Timestamp creationDate;
    private int likeCount;
    @JsonProperty("isLiked")
    private boolean isLiked;
    private String thumbnail;
    private Timestamp publishedDate;
    private String authors;
    private String publisher;
    private Integer pageCount;
}
