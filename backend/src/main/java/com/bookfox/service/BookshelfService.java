package com.bookfox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.BookshelfDto;
import com.bookfox.repository.BookshelfMapper;

@Service
public class BookshelfService {
    @Autowired
    private BookshelfMapper bookshelfMapper;

    public List<BookshelfDto> getCurrentlyReadingBooks(String userId) {
        return bookshelfMapper.getCurrentlyReadingBooks(userId);
    }
    public List<BookshelfDto> getReadBooks(String userId) {
        return bookshelfMapper.getReadBooks(userId);
    }
    public List<BookshelfDto> getToReadBooks(String userId) {
        return bookshelfMapper.getToReadBooks(userId);
    }
    public List<BookshelfDto> getFavoriteBooks(String userId) {
        return bookshelfMapper.getFavoriteBooks(userId);
    }
    public boolean updateProgress(String userId, int bookId, int progress) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("progress", progress);
        map.put("bookId", bookId);

        return bookshelfMapper.updateProgress(map) > 0;
    }
    public boolean removeBookshelf(String userId, int bookId, int shelfType) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("bookId", bookId); 
        map.put("shelfType", shelfType);

        return bookshelfMapper.removeBookshelf(map);
    }
}
