package com.bookfox.controller.admin;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.bookfox.model.UserDto;
import com.bookfox.service.AdminService;


@Controller
public class Admin {
    @Autowired
    private AdminService adminService;


    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getAdminUsers(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "") String searchName
    ) {
        int pageSize = 10;
        int currentPage = pageNum;
        int start = (currentPage - 1) * pageSize;

        int count = adminService.getCount(searchName); // 사용자 수 조회

        Map<String, Object> response = new HashMap<>();

        if (count > 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("start", start);
            map.put("pageSize", pageSize);
            map.put("searchName", searchName);

            List<UserDto> userDtos = adminService.getUsers(map);

            int pageCount = (int) Math.ceil((double) count / pageSize);
            int pageBlock = 5;
            int startPage = ((currentPage - 1) / pageBlock) * pageBlock + 1;
            int endPage = Math.min(startPage + pageBlock - 1, pageCount);

            response.put("userDtos", userDtos);
            response.put("pageNum", pageNum);
            response.put("currentPage", currentPage);
            response.put("pageBlock", pageBlock);
            response.put("count", count);
            response.put("pageCount", pageCount);
            response.put("startPage", startPage);
            response.put("endPage", endPage);
            response.put("searchName", searchName);
        }

        return ResponseEntity.ok(response);
    }
}
