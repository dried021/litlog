package com.bookfox.controller.settings;

import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> getUserId(){
         //session에서 user 가져오기
         String id = "admin01";
         
         Boolean isAdmin = settingService.checkIsAdmin(id);

         Map<String, Object> response = new HashMap<>();
         response.put("id", id);
         response.put("isAdmin", isAdmin);

         return ResponseEntity.ok(response);
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

    @PostMapping("/withdraw")
    public ResponseEntity<Map<String, Object>> withdrawUser(@RequestBody UserDto userDto){
        System.out.println("syso"+userDto.getId()+userDto.getPwd());
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
            //로그아웃 절차 진행
        }

        response.put("success", success ? "1" : "0");
        response.put("message", success ? "success" : "fail");
        return ResponseEntity.ok(response);
    }
}
