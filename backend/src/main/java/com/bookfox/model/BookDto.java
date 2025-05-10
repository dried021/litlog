package com.bookfox.model;

import java.security.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {
    private int id;
    private String bookApiId;
    private String title;
    private String subtitle;
    private String authors;
    private String publisher;
    private Timestamp publishedDate;
    private String description;
    private int pageCount;
    private String thumnail;
    private int bookCategory;
}
