package com.bookfox.service;

import java.util.List;

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
        return bookshelfMapper.getCurrentlyReadingBooks(userId);
    }
    public List<BookshelfDto> getToReadBooks(String userId) {
        return bookshelfMapper.getCurrentlyReadingBooks(userId);
    }
}
