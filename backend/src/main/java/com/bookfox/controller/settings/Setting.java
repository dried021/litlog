package com.bookfox.controller.settings;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.UserDto;
import com.bookfox.service.SettingService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/setting")
public class Setting {
    @Resource
    private SettingService settingService;

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUserId(HttpSession session){
        String userId = (String) session.getAttribute("loginUser");
         
         Boolean isAdmin = settingService.checkIsAdmin(userId);

         Map<String, Object> response = new HashMap<>();
         response.put("id", userId);
         response.put("isAdmin", isAdmin);

         return ResponseEntity.ok(response);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserDto> getUserInfo(HttpSession session){
        String userId = (String) session.getAttribute("loginUser");
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

    @PostMapping("/withdraw")
    public ResponseEntity<Map<String, Object>> withdrawUser(@RequestBody UserDto userDto, HttpSession session){
        Map<String, Object> response = new HashMap<>();

        boolean isPwdCorrect = settingService.checkPassword(userDto);
        System.out.println("isPwdCorrect"+isPwdCorrect);
        if (!isPwdCorrect) {
            response.put("incorrectPwd", true);
            response.put("success", false);
            return ResponseEntity.ok(response);
        }

        boolean success = settingService.withdrawUser(userDto);

        if (success){
            session.invalidate();
        }

        response.put("success", success ? "1" : "0");
        response.put("message", success ? "success" : "fail");
        return ResponseEntity.ok(response);
    }
}
