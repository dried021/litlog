package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.UserDto;

@Mapper
public interface SettingMapper {
    public UserDto getUserInfo(String userId);
    public int updateUser(UserDto userDto);
    public int checkIsAdmin(String id);
    public int checkPassword(UserDto userDto);
    public int withdrawUser(UserDto userDto);
    public void deleteReviewByUserId(String id);
    public void deleteCollectionByUserId(String id);
    public void deleteCommentByUserId(String id);
}
