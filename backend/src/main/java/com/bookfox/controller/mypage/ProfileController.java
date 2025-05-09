package com.bookfox.controller.mypage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.ProfileDto;
import com.bookfox.service.NetworkService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/members")
public class ProfileController {
    @Resource
    private NetworkService networkService;

    @GetMapping("/profile-summary/{userId}")
    public ProfileDto getProfile(@PathVariable String userId) {
        return networkService.getProfileDto(userId);
    }
}
