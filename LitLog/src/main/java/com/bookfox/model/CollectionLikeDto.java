package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollectionLikeDto {
    private String userId;
    private int targetId;
    private int likeType; // 3 = 콜렉션
}
