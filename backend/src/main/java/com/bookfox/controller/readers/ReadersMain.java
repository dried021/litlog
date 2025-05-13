package com.bookfox.controller.readers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.UserListDto;
import com.bookfox.service.ReaderService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/readers")
public class ReadersMain {
    @Resource
    private ReaderService readerService;

    @GetMapping("/avidUserList")
    public ResponseEntity<List<UserListDto>> getAvidUserList(){
        List<UserListDto> users = readerService.getAvidUserList();
        return ResponseEntity.ok(users);
    }

    @GetMapping("belovedUserList")
    public ResponseEntity<List<UserListDto>> getBelovedUserList(){
        List<UserListDto> users = readerService.getBelovedUserList();
        return ResponseEntity.ok(users);
    }
}