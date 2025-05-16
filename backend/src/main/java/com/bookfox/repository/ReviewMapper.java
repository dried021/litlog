package com.bookfox.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.BookReviewDto;

@Mapper
public interface ReviewMapper {
    List<BookReviewDto> getReviewListAll(@Param("userId") String userId);
    List<BookReviewDto> getReviewList(@Param("userId") String userId, @Param("year") int year);

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
