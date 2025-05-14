package com.bookfox.controller.settings;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.UserDto;
import com.bookfox.service.SettingService;

import jakarta.annotation.Resource;


@RestController
@RequestMapping("/setting")
public class Setting {
    @Resource
    private SettingService settingService;

    @GetMapping("/user")
    public ResponseEntity<String> getUserId(){
         //session에서 user 가져오기
         String id = "user01";

         return ResponseEntity.ok(id);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserDto> getUserInfo(@RequestParam String userId){
        return ResponseEntity.ok(settingService.getUserInfo(userId));
    }

    @PostMapping("/userinfo")
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody UserDto userDto) {
        Map<String, Object> response = new HashMap<>();

        boolean success = settingService.updateUser(userDto);

        response.put("success", success);
        response.put("message", success ? "success" : "fail");
        return ResponseEntity.ok(response);
    }
}
