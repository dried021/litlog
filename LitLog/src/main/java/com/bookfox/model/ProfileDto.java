package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProfileDto {
    private String id;
    private String nickname;
    private String profileImage;
    private String bio;
    private int totalBooksReadCount;
    private int annualBooksReadCount;
    private int userFollowingCount;
    private int userFollowersCount;
    private int userReviewsCount;
    private int userCollectionsCount;
    private boolean followStatus;
}
