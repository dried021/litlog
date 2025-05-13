package com.bookfox.controller.mypage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.ProfileDto;
import com.bookfox.model.ProfileReviewDto;
import com.bookfox.service.ProfileService;
import com.bookfox.model.BookshelfDto;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/members")
public class ProfileController {
    @Resource
    private ProfileService profileService;

    @GetMapping("/profile-summary/{userId}")
    public ProfileDto getProfile(@PathVariable String userId) {
        return profileService.getProfileDto(userId);
    }

    @GetMapping("/{userId}/network")
    public ResponseEntity<Map<String, Object>> getNetwork(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<String> followingIds = profileService.getFollowing(userId);
        List<String> followerIds = profileService.getFollowers(userId);
        
        List<ProfileDto> following = new ArrayList<>();
        List<ProfileDto> followers = new ArrayList<>();

        for (String id : followingIds) {
            ProfileDto dto = profileService.getProfileDto(id);
            following.add(dto);
        }
        for (String id : followerIds) {
            ProfileDto dto = profileService.getProfileDto(id);
            followers.add(dto);
        }

        response.put("followingCount", following.size());
        response.put("followersCount", followers.size());
        response.put("following", following);
        response.put("followers", followers);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/books/favorite")
    public ResponseEntity<Map<String, Object>> getFavoriteBooks(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<BookshelfDto> books = profileService.getFavoriteBooks(userId, 4);
        response.put("totalCount", books.size());
        response.put("books", books);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/books/recent")
    public ResponseEntity<Map<String, Object>> getRecentBooks(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>(); 
        List<BookshelfDto> books = profileService.getRecentlyReadBooks(userId, 4);
        response.put("totalCount", books.size());
        response.put("books", books);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/reviews/recent")
    public ResponseEntity<Map<String, Object>> getRecentReviews(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<ProfileReviewDto> reviews = profileService.getRecentReviews(userId, 3);
        response.put("totalCount", reviews.size());
        response.put("reviews", reviews);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/reviews/popular")
    public ResponseEntity<Map<String,Object>> getPopularReviews(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<ProfileReviewDto> reviews = profileService.getPopularReviews(userId, 3);
        response.put("totalCount", reviews.size());
        response.put("reviews", reviews);
        return ResponseEntity.ok(response);
    }
}
