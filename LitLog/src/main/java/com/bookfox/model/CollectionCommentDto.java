package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollectionCommentDto {
    private int id;
    private String userId;
    private String profileImage;
    private int collectionId;
    private String content;
    private Timestamp creationDate;
    private String nickname; // optional: 댓글 목록 조회 시 JOIN 결과로 사용
}

