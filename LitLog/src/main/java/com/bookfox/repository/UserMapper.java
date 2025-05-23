package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.UserDto;

@Mapper
public interface UserMapper {
    UserDto selectUserById(String id);
    void insertUser(UserDto user);
    UserDto selectUserByNickname(String nickname); 
    UserDto selectUserByEmail(String email);
    void updatePassword(@Param("id") String id, @Param("newPwd") String newPwd);
    String findUserId(@Param("name") String name, @Param("email") String email);
}
