package com.bookfox.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.UserDto;
import com.bookfox.repository.AdminMapper;

@Service
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;

    public int getCount(String searchName) {
        if (searchName == null || searchName.isBlank()) {
            return adminMapper.countAll();
        } else {
            return adminMapper.countByName(searchName);
        }
    }
    
    public List<UserDto> getUsers(Map<String, Object> map){
        return adminMapper.getUsers(map);
    }
}
