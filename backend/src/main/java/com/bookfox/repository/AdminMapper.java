package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.AdminUserDto;

@Mapper
public interface AdminMapper {
    public List<AdminUserDto> selectUsers(Map<String, Object> params);
    public int countUsers(String searchName);
    public int countReviews(String id);
    public int countCollections(String id);
    public int countComments(String id);
}
