package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.BookshelfDto;
import com.bookfox.model.ProfileDto;
import com.bookfox.model.ProfileReviewDto;

@Mapper
public interface ProfileMapper {
    public ProfileDto getProfile(String userId);
    public List<String> getFollowing(String userId);
    public List<String> getFollowers(String userId);
    public boolean checkIsFollowing(Map<String, Object> map);
    public boolean followUser(Map<String, Object> map);
    public boolean unfollowUser(Map<String, Object> map);
    public boolean removeFollower(Map<String, Object> map);
    public List<BookshelfDto> getFavoriteBooks(Map<String, Object> map);
    public List<BookshelfDto> getRecentlyReadBooks(Map<String, Object> map);
    public List<ProfileReviewDto> getRecentReviews(Map<String, Object> map);
    public List<ProfileReviewDto> getPopularReviews(Map<String, Object> map);
}
