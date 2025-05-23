package com.bookfox.model;

import java.sql.Timestamp;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyCollectionsDto {
    private int id;
    private String title;
    private String content;
    private String nickname;
    private Timestamp creationDate;
    private int bookCount;
    private int likeCount;
    private int commentCount;

    private String thumbnailsOrigin;      // GROUP_CONCAT()
    private List<String> thumbnails;      

    public void setThumbnailsOrigin(String origin) {
        this.thumbnailsOrigin = origin;
        this.thumbnails = (origin != null && !origin.isBlank())
            ? List.of(origin.split(","))
            : List.of();
    }
}
