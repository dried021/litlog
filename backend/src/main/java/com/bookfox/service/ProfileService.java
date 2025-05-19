package com.bookfox.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookfox.model.BookshelfDto;
import com.bookfox.model.ProfileDto;
import com.bookfox.model.ProfileReviewDto;
import com.bookfox.repository.ProfileMapper;

@Service
public class ProfileService {
    @Autowired
    private ProfileMapper profileMapper;

    public ProfileDto getProfileDto(String userId) {
        return profileMapper.getProfile(userId);
    }

    public List<String> getFollowing(String userId) {
        return profileMapper.getFollowing(userId);
    }

    public List<String> getFollowers(String userId) {
        return profileMapper.getFollowers(userId);
    }

    public boolean checkIsFollowing(String userId, String followUserId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("followUserId", followUserId);
        return profileMapper.checkIsFollowing(map);
    }

    public boolean followUser(String userId, String followUserId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("followUserId", followUserId);
        return profileMapper.followUser(map);
    }

    public boolean unfollowUser(String userId, String followUserId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("followUserId", followUserId);
        return profileMapper.unfollowUser(map);
    }

    public boolean removeFollower(String userId, String followUserId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("followUserId", followUserId);
        return profileMapper.removeFollower(map);
    }
    public List<BookshelfDto> getFavoriteBooks(String userId, int count) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("count", count);
        return profileMapper.getFavoriteBooks(map);
    }

    public List<BookshelfDto> getRecentlyReadBooks(String userId, int count) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("count", count);
        return profileMapper.getRecentlyReadBooks(map);
    }

    public List<ProfileReviewDto> getRecentReviews(String userId, int count) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("count", count);
        return profileMapper.getRecentReviews(map);
    }

    public List<ProfileReviewDto> getPopularReviews(String userId, int count) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("count", count);
        return profileMapper.getPopularReviews(map);
    }

    public boolean updateProfile(String userId, String bio, MultipartFile profileImage) throws IOException {
        Map<String, Object> map = new HashMap<>(); 
        map.put("userId", userId);
        map.put("profileImage", profileImage);
        map.put("bio", bio);
        boolean success = true;
        if (profileImage != null && !profileImage.isEmpty()) {
            String originalFilename = profileImage.getOriginalFilename();
            String extension = Optional.ofNullable(originalFilename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(originalFilename.lastIndexOf(".")))
                .orElse("");
            String newFilename = UUID.randomUUID() + extension;

            Path imagePath = Paths.get("uploads/profile-images", newFilename);
            Files.createDirectories(imagePath.getParent());
            Files.copy(profileImage.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/images/profile/" + newFilename;
            map.put("profileImage", imageUrl);
            map.put("profileImageOrigin", originalFilename);

            profileMapper.updateProfileImage(map);
            profileMapper.updateProfileImageOrigin(map);
        }
        if (bio != null) {
            success = profileMapper.updateBio(map);
        }
        return success;
    }
}
