package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;
import com.bookfox.model.BookReviewDto;

@Mapper
public interface ReviewMapper {
    BookReviewDto getReviewDetailById(int reviewId);
}
