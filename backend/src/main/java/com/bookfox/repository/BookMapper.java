package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.BookDto;
import com.bookfox.model.BookReviewDto;

@Mapper
public interface BookMapper {
    public Boolean exists(String bookApiId);
    public int getIdByBookApiId(String bookApiId);
    public int getBookshelfCount(int id);
    public int getLikeCount(int id);
    public int getReviewCount(int id);
    public List<BookReviewDto> getReviews(Map<String, Object> params);
    public void likeReview(Map<String, Object> params);
    public void unlikeReview(Map<String, Object> params);

    public void addBook(BookDto bookDto);
    public void addBookshelf(Map<String, Object> params);
}

