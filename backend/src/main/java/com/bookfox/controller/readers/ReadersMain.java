package com.bookfox.controller.readers;

import java.time.LocalDate;
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
        @RequestParam(defaultValue = "10") int itemsPerPage,
        @RequestParam(defaultValue = "0") int period
    ){
        if (period == 0){
            period = LocalDate.now().getYear();
        }

        List<UserListDto> users = readerService.getRank(startIndex, itemsPerPage, period);
        for (UserListDto user : users){
            user.setBooks(readerService.getRankerThumbnailByPeriod(user.getId(), period)); // 🔄 연도 반영
        }

        int totalItems = readerService.getUserCountByPeriod(period); // 🔄 연도 반영
        Map<String, Object> response = new HashMap<>();
        response.put("items", users);
        response.put("totalItems", totalItems);
        return ResponseEntity.ok(response);
    }


}