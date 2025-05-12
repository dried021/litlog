package com.bookfox.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookfox.model.BookReviewDto;
import com.bookfox.repository.BookMapper;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    public Boolean exists(String bookApiId) {
        Boolean exists = bookMapper.exists(bookApiId);
        return exists;
    }

    public int getIdByBookApiId(String bookApiId) {
        return bookMapper.getIdByBookApiId(bookApiId);
    }

    public int getBookshelfCount(int id) {
        return bookMapper.getBookshelfCount(id);
    }

    public int getLikeCount(int id) {
        return bookMapper.getLikeCount(id);
    }

    public int getReviewCount(int id) {
        return bookMapper.getReviewCount(id);
    }

    public List<BookReviewDto> getReviews(int id, int currentPage, String userId) {
        int offset = (currentPage - 1) * 5;
        System.out.println("userId"+userId);
        Map<String, Object> params = Map.of("id", id, "offset", offset, "userId", userId);
        System.out.println("검사"+bookMapper.getReviews(params));
        return bookMapper.getReviews(params);
    }

    public void likeReview(int reviewId, String userId){
        Map<String, Object> params = Map.of("id", reviewId, "userId", userId);
        bookMapper.likeReview(params);
    }

    public void unlikeReview(int reviewId, String userId){
        Map<String, Object> params = Map.of("id", reviewId, "userId", userId);
        bookMapper.unlikeReview(params);
    }

}
