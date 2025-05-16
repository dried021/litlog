package com.bookfox.controller.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/comment")
    public Map<String, Object> getAdminComments(
        @RequestParam(defaultValue = "1") int pageNum,
        @RequestParam(required=false) String searchKeyword,
        @RequestParam(defaultValue = "1") int sortOption
    ) {
        return adminService.getComments(pageNum, searchKeyword, sortOption);
    }

    @GetMapping("/review")
    public Map<String, Object> getAdminReviews(
        @RequestParam(defaultValue = "1") int pageNum,
        @RequestParam(required=false) String searchKeyword,
        @RequestParam(defaultValue = "1") int sortOption
    ){
        return adminService.getReviews(pageNum, searchKeyword, sortOption);
    }
    

    @PostMapping("/user")
    public ResponseEntity<?> changeUserOption(@RequestBody Map<String, Object> payload){
        Integer option = (Integer) payload.get("option");
        String buttonType = (String) payload.get("buttonType");
        String id = (String) payload.get("id");

        adminService.changeUsers(id, option, buttonType);
        return ResponseEntity.ok().body("updated");
    }

    @PostMapping("/comment")
    public ResponseEntity<String> deleteComment(@RequestBody Map<String, Object> payload){
        String id = payload.get("id").toString();
        adminService.deleteCommentById(id);
        return ResponseEntity.ok("comment deleted successfully");
    }

    @PostMapping("/collection")
    public ResponseEntity<String> deleteCollection(@RequestBody Map<String, Object> payload){
        String id = payload.get("id").toString();
        adminService.deleteCollectionById(id);
        return ResponseEntity.ok("collection deleted successfully");
    }

    @PostMapping("/review")
    public ResponseEntity<String> deleteReview(@RequestBody Map<String, Object> payload){
        String id = payload.get("id").toString();
        adminService.deleteReviewById(id);
        return ResponseEntity.ok("review deleted successfully");
    }

}
