package com.bookfox.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.UserListDto;

@Mapper
public interface ReaderMapper {
    public List<UserListDto> getAvidUserList();
    public List<UserListDto> getBelovedUserList();
}
