package com.bookfox.controller.mypage;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookfox.model.BookReviewDto;
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
}
