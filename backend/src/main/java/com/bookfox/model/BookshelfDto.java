package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookshelfDto {
    private int id;
    private int bookId;
    private String userId;
    private int shelfType;
    private Timestamp creationDate;
    private int progress;

    private String bookApiId;
    private boolean likeStatus;
    private int rating;

    private Timestamp publishedDate;
    private String thumbnail;
    private int pageCount;
}
