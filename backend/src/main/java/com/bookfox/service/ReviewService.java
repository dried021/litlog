package com.bookfox.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.BookReviewDto;
import com.bookfox.repository.ReviewMapper;

@Service
public class ReviewService {
    @Autowired
    private ReviewMapper reviewMapper;

    public BookReviewDto getReviewDetailById(int reviewId, String loginUserId) {
        return reviewMapper.getReviewDetailById(reviewId, loginUserId);
    }
}
