package com.bookfox.controller.mypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.service.ActivityService;
import com.bookfox.model.ActivityDto;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/members")
public class ActivityController {
    @Resource
    private ActivityService activityService;

    @GetMapping("{userId}/activity/following")
    public ResponseEntity<Map<String,Object>> getFollowingActivityFeed(
        @PathVariable String userId,
        @RequestParam(defaultValue = "10") int limit,
        @RequestParam(defaultValue = "0") int offset
    ) {
        Map<String, Object> response = new HashMap<>();
        List<ActivityDto> result = activityService.getFollowingActivityFeed(userId, limit, offset);
        
        response.put("totalCount", result.size());
        response.put("activities", result);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{userId}/activity/incoming")
    public ResponseEntity<Map<String,Object>> getIncomingActivityFeed(
        @PathVariable String userId,
        @RequestParam(defaultValue = "10") int limit,
        @RequestParam(defaultValue = "0") int offset
    ) {
        Map<String, Object> response = new HashMap<>();
        List<ActivityDto> result = activityService.getIncomingActivityFeed(userId, limit, offset);
        
        response.put("totalCount", result.size());
        response.put("activities", result);
        return ResponseEntity.ok(response);
    }
}
