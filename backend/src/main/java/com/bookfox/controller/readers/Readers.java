package com.bookfox.controller.readers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.UserListDto;
import com.bookfox.service.ReaderService;

import jakarta.annotation.Resource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/readers")
public class Readers {
    @Resource
    private ReaderService readerService;
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchResults(@RequestParam String keyword,
        @RequestParam(defaultValue = "1") int currentPage,
        @RequestParam(defaultValue = "true") boolean isRelevance) {

        List<UserListDto> users = readerService.getSearchResult(keyword, currentPage, isRelevance);
        for(UserListDto user : users){
            user.setBooks(readerService.getRankerThumbnail(user.getId()));
        }
        
        int usersCount = readerService.getSearchResultCount(keyword);
        
        Map<String, Object> response = new HashMap<>();

        response.put("users", users);
        response.put("usersCount", usersCount);
        return ResponseEntity.ok(response);
    }
    
}
