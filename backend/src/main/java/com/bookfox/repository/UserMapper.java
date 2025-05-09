package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;
import com.bookfox.model.UserDto;

@Mapper
public interface UserMapper {
    UserDto selectUserById(String id);
    void insertUser(UserDto user);
    UserDto selectUserByNickname(String nickname); 
    UserDto selectUserByEmail(String email);
}
