package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import com.bookfox.model.BookshelfDto;

@Mapper
public interface BookshelfMapper {
    public List<BookshelfDto> getCurrentlyReadingBooks(String userId);
    public List<BookshelfDto> getReadBooks(String userId);
    public List<BookshelfDto> getToReadBooks(String userId);
    public List<BookshelfDto> getFavoriteBooks(String userId);
    public int updateProgress(Map<String, Object> map);
    public boolean removeBookshelf(Map<String, Object> map);
    public boolean moveBookshelf(Map<String, Object> map);
    public boolean unlikeBook(Map<String, Object> map);
}
