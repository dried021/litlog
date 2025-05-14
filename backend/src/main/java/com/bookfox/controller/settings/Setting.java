package com.bookfox.controller.settings;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.Resource;


@RestController
@RequestMapping("/setting")
public class Setting {
    //@Resource
    //private SettingService settingService;

    @GetMapping("/user")
    public ResponseEntity<String> getUserId(){
         //session에서 user 가져오기
         String id = "user01";

         return ResponseEntity.ok(id);
    }
}
