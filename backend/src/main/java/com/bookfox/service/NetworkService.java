package com.bookfox.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.ProfileDto;
import com.bookfox.repository.NetworkMapper;

@Service
public class NetworkService {
    @Autowired
    private NetworkMapper networkMapper;

    public ProfileDto getProfileDto(String userId) {
        return networkMapper.getProfile(userId);
    }
}
