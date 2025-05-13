package com.bookfox.controller.readers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @GetMapping("rank")
    public ResponseEntity<Map<String, Object>> getRank(
        @RequestParam(defaultValue = "0") int startIndex,
        @RequestParam(defaultValue = "10 ") int itemsPerPage
    ){
        List<UserListDto> users = readerService.getRank(startIndex, itemsPerPage);
        for(UserListDto user : users){
            user.setBooks(readerService.getRankerThumbnail(user.getId()));
        }
        Map<String, Object> response = new HashMap<>();
        int totalItems = readerService.getUserCount(); 

        response.put("items", users);
        response.put("totalItems", totalItems);
        return ResponseEntity.ok(response);
    }

}