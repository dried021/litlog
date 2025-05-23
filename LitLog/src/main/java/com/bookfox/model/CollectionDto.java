package com.bookfox.model;

import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectionDto {
    private int id;
    private String userId;
    private String nickname;        // 작성자 닉네임
    private String profileImage;
    private String title;
    private String content;
    private String thumbnail;       // 대표 썸네일 (optional)
    private Timestamp creationDate;
    private int likeCount;
    private int totalLikeCount;
    private int commentCount;       // 댓글 수
    private List<BookDto> books;         // 책 객체로 받을 경우
}


