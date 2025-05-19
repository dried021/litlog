package com.bookfox.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.UserDto;
import com.bookfox.repository.SettingMapper;

@Service
public class SettingService {
    @Autowired
    private SettingMapper settingMapper;

    public boolean checkIsAdmin(String id){
        return settingMapper.checkIsAdmin(id) > 0;
    }

    public UserDto getUserInfo(String userId){
        return settingMapper.getUserInfo(userId);
    }

    public boolean updateUser(UserDto userDto){
        UserDto originalUserDto = settingMapper.getUserInfo(userDto.getId());

        if (!originalUserDto.getNickname().equals(userDto.getNickname())) {
            userDto.setNicknameResetAt(new Timestamp(System.currentTimeMillis()));
        }
        if (!originalUserDto.getPwd().equals(userDto.getPwd())) {
            userDto.setPwdResetAt(new Timestamp(System.currentTimeMillis()));
        }

        return settingMapper.updateUser(userDto) > 0;
    }

    public boolean checkPassword(UserDto userDto){
        return settingMapper.checkPassword(userDto) > 0;
    }
    public boolean withdrawUser(UserDto userDto){
        String id = userDto.getId();
        settingMapper.deleteReviewByUserId(id);
        settingMapper.deleteCollectionByUserId(id);
        settingMapper.deleteCommentByUserId(id);
        return settingMapper.withdrawUser(userDto) >  0;
    }
    
}
