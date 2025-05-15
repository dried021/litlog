package com.bookfox.controller.mypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookfox.model.BookReviewDto;
import com.bookfox.model.ReviewUpdateDto;
import com.bookfox.service.ReviewService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/members") 
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{userId}/reviews/{reviewId}")
    public BookReviewDto getReviewDetail(@PathVariable String userId, @PathVariable int reviewId, HttpSession session) {
        String loginUserId = (String) session.getAttribute("loginUser");
        
        return reviewService.getReviewDetailById(reviewId, loginUserId);
    }

    @GetMapping("/{userId}/review-counts")
    public Map<String, Integer> getReviewCounts(@PathVariable String userId) {
        int totalTimelineBooks = reviewService.countAllReviewedBooks(userId);
        int totalWrittenReviews = reviewService.countWrittenReviews(userId);

        Map<String, Integer> result = new HashMap<>();
        result.put("totalTimelineBooks", totalTimelineBooks);
        result.put("totalWrittenReviews", totalWrittenReviews);
        return result;
    }
    
    @PatchMapping("/{userId}/reviews/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable String userId, @PathVariable int reviewId, @RequestBody ReviewUpdateDto dto, HttpSession session) {
        String loginUserId = (String) session.getAttribute("loginUser");

        if (loginUserId == null) {
            return ResponseEntity.status(401).body("Login Required");
        }

        if (!userId.equals(loginUserId)) {
            return ResponseEntity.status(403).body("Access Denied");
        }

        boolean success = reviewService.updateReview(reviewId, dto);

        if (success) {
            return ResponseEntity.ok("Review Updated");
        } else {
            return ResponseEntity.status(500).body("Review Update Failed");
        }
    }

    @DeleteMapping("/{userId}/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable String userId, @PathVariable int reviewId, HttpSession session) {
        String loginUserId = (String) session.getAttribute("loginUser");

        if (loginUserId == null) {
            return ResponseEntity.status(401).body("Login Required");
        }

        if (!userId.equals(loginUserId)) {
            return ResponseEntity.status(403).body("Access Denied");
        }

        boolean success = reviewService.deleteReview(reviewId);

        if (success) {
            return ResponseEntity.ok("Review Deleted");
        } else {
            return ResponseEntity.status(500).body("Review Delete Failed");
        }
    }

    @GetMapping("/{userId}/reviews/review-list")
    public List<BookReviewDto> getReviewList(@PathVariable String userId) {
        return reviewService.getReviewList(userId);
    }
}
