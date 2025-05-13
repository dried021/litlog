package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto {
    private String id;
    private String profile;
    private int bookshelves;
    private int reviews;
    private int likes;
    private int collections;
    private int followers;
    private int activityScore;
}
