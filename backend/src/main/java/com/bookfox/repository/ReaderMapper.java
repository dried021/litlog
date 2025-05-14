package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.BookDto;
import com.bookfox.model.UserListDto;

@Mapper
public interface ReaderMapper {
    public List<UserListDto> getAvidUserList();
    public List<UserListDto> getBelovedUserList();
    public List<UserListDto> getRank(Map<String, Object> params);
    public List<BookDto> getRankerThumbnail(String id);
    public int getUserCount();
    public List<UserListDto> getSearchResult(Map<String, Object> params);
    public int getSearchResultCount(String keyword);
}
