package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.BookReviewDto;

@Mapper
public interface ReviewMapper {
    BookReviewDto getReviewDetailById(
        @Param("reviewId") int reviewId,
        @Param("loginUserId") String loginUserId
    );

    int countAllReviewedBooks(String userId);
    int countWrittenReviews(String userId);
    
    int updateReview(
        @Param("reviewId") int reviewId,
        @Param("content") String content,
        @Param("rating") int rating,
        @Param("creationDate") java.sql.Timestamp creationDate
    );
    
    int deleteReview(@Param("reviewId") int reviewId);
}
