package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookListDto {
    private int id;
    private String title;
    private String image;
    private String link;
    //나중에 bookshelf
    private int bookshelves;
    private int likes;
    private int reviews;
}