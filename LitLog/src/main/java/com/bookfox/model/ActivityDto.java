package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityDto {
    private String followUserId;
    private String followUsername;
    private String profileImage;

    private String bookApiId;
    private String bookTitle;

    private int collectionId;
    private String collectionTitle;

    private int reviewId;
    private int rating;
    
    private Timestamp creationDate;
    private String activityType;
}
