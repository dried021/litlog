package com.bookfox.service;

import java.util.HashMap;
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

    public List<BookReviewDto> getReviews(int id, int currentPage) {
        int offset = (currentPage - 1) * 5;
        Map<String, Integer> params = Map.of("id", id, "offset", offset);
        return bookMapper.getReviews(params);
    }

}
