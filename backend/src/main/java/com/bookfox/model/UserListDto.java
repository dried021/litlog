package com.bookfox.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto {
    private String id;
    private String bio;
    private String profile;
    private int bookshelves;
    private int reviews;
    private int likes;
    private int collections;
    private int followers;
    private int activityScore;

    private List<BookDto> books;
}
