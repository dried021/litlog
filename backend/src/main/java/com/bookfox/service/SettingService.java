package com.bookfox.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.UserDto;
import com.bookfox.repository.SettingMapper;

@Service
public class SettingService {
    @Autowired
    private SettingMapper settingMapper;

    public UserDto getUserInfo(String userId){
        return settingMapper.getUserInfo(userId);
    }

    public boolean updateUser(UserDto userDto){
        return settingMapper.updateUser(userDto) > 0;
    }
}
