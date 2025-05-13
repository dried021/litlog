package com.bookfox.controller.mypage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookfox.model.BookReviewDto;
import com.bookfox.service.ReviewService;

@RestController
@RequestMapping("/api/members") 
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{userId}/reviews/{reviewId}")
    public BookReviewDto getReviewDetail(@PathVariable String userId, @PathVariable int reviewId) {
        return reviewService.getReviewDetailById(reviewId);
    }
}
