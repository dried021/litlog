package com.bookfox.service;

import com.bookfox.repository.UserMapper;
import com.bookfox.model.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public UserDto findById(String id) {
        return userMapper.selectUserById(id);
    }

    public boolean isIdDuplicate(String id) {
        return userMapper.selectUserById(id) != null;
    }

    public void register(UserDto user) {
        userMapper.insertUser(user);
    }

    public boolean isNicknameDuplicate(String nickname){
        return userMapper.selectUserByNickname(nickname) != null;
    }

    public boolean isEmailDuplicate(String email) {
        return userMapper.selectUserByEmail(email) != null;
    }

    public void updatePassword(String id, String newPwd) {
        userMapper.updatePassword(id, newPwd); 
    }

    public String findUserId(String name, String email) {
        return userMapper.findUserId(name, email);
    }

}
