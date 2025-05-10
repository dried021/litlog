package com.bookfox.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookfox.repository.BookMapper;

@Service
public class BookService {
    @Autowired
    private BookMapper bookMapper;

    public Boolean exists(String bookApiId){
        Boolean exists = bookMapper.exists(bookApiId);
        return exists != null && exists; 
    }

    public int getIdByBookApiId(String bookApiId){
        return bookMapper.getIdByBookApiId(bookApiId);
    }

    public int getBookshelfCount(int id){
        return bookMapper.getBookshelfCount(id);
    }

    public int getLikeCount(int id){
        return bookMapper.getLikeCount(id);
    }
}
