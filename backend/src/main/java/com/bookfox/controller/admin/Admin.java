package com.bookfox.controller.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bookfox.service.AdminService;


@RestController
@RequestMapping("/admin")
public class Admin {
    @Autowired
    private AdminService adminService;


    @GetMapping
    public Map<String, Object> getAdminUsers(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(required=false) String searchName,
            @RequestParam(defaultValue = "1") int sortOption
    ) {
        
        return adminService.getUsers(pageNum, searchName, sortOption);
    }
}
