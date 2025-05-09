package com.bookfox.model;

import java.security.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookshelfDto {
    private int id;
    private String bookId;
    private String userId;
    private int shelfType;
    private Timestamp creationDate;
    private int progress;
    private boolean likeStatus;
    private int rating;
    private String thumbnail;
}
