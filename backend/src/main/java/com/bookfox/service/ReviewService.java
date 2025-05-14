package com.bookfox.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.BookReviewDto;
import com.bookfox.model.ReviewUpdateDto;
import com.bookfox.repository.ReviewMapper;

@Service
public class ReviewService {
    @Autowired
    private ReviewMapper reviewMapper;

    public BookReviewDto getReviewDetailById(int reviewId, String loginUserId) {
        return reviewMapper.getReviewDetailById(reviewId, loginUserId);
    }

    public int countAllReviewedBooks(String userId) {
        return reviewMapper.countAllReviewedBooks(userId);
    }

    public int countWrittenReviews(String userId) {
        return reviewMapper.countWrittenReviews(userId);
    }

    public boolean updateReview(int reviewId, ReviewUpdateDto dto) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        int result = reviewMapper.updateReview(reviewId, dto.getContent(), dto.getRating(), now);
        return result > 0;
    }
    public boolean deleteReview(int reviewId) {
        int result = reviewMapper.deleteReview(reviewId);
        return result > 0;
    }
}
