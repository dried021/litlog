package com.bookfox.controller.mypage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookfox.model.ProfileDto;
import com.bookfox.model.ProfileReviewDto;
import com.bookfox.service.NotificationService;
import com.bookfox.service.ProfileService;
import com.bookfox.model.BookshelfDto;
import com.bookfox.model.NotificationDto;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/members")
public class ProfileController {
    @Autowired
    private NotificationService notificationService;

    @Resource
    private ProfileService profileService;

    @GetMapping("/profile-summary/{userId}")
    public ProfileDto getProfile(@PathVariable String userId, HttpSession session) {
        String sessionUserId = (String) session.getAttribute("loginUser");
        boolean followStatus = profileService.checkIsFollowing(sessionUserId, userId);
       
        ProfileDto dto = profileService.getProfileDto(userId);
        dto.setFollowStatus(followStatus);

        return dto;
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

    @PostMapping("/{userId}/following")
    public ResponseEntity<Map<String, Object>> followUser(@PathVariable String userId, HttpSession session) {
        String sessionUserId = (String) session.getAttribute("loginUser");
        boolean success = profileService.followUser(sessionUserId, userId);

        // 알림
        if (success && !sessionUserId.equals(userId)) {
            NotificationDto dto = new NotificationDto();
            dto.setUserId(userId);             
            dto.setSenderId(sessionUserId);   
            dto.setType("FOLLOW");
            dto.setTargetId(0);                
            dto.setRead(false);
            notificationService.sendNotification(dto);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/following")
    public ResponseEntity<Map<String, Object>> unfollowUser(@PathVariable String userId, HttpSession session) {
        String sessionUserId = (String) session.getAttribute("loginUser");
        boolean success = profileService.unfollowUser(sessionUserId, userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/followers")
    public ResponseEntity<Map<String, Object>> removeFollower(@PathVariable String userId, HttpSession session) {
        String sessionUserId = (String) session.getAttribute("loginUser");
        boolean success = profileService.removeFollower(userId, sessionUserId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
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

    @PutMapping("/{userId}/profile")
    public ResponseEntity<?> updateProfile(@PathVariable String userId,
                                        @RequestParam("bio") String bio,
                                        @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        boolean success = profileService.updateProfile(userId, bio, profileImage);
        if (success) {
            return ResponseEntity.ok("Updated profile");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
    }
}
