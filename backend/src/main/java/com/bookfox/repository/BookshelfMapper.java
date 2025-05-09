package com.bookfox.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.bookfox.model.BookshelfDto;

@Mapper
public interface BookshelfMapper {
    public List<BookshelfDto> getCurrentlyReadingBooks(String userId);
    public List<BookshelfDto> getReadBooks(String userId);
    public List<BookshelfDto> getToReadBooks(String userId);
}
