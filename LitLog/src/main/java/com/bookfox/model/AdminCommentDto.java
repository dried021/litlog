package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCommentDto {
    private int id;
    private String userId;
    private String nickname; 
    private int collectionId;
    private String content;
    private Timestamp creationDate;

    private String collectionTitle;
    private String collectionAuthor;
    private Timestamp collectionCreationDate;
}
