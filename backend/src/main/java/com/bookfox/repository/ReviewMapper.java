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
}
