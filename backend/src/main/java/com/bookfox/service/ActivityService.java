package com.bookfox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.ActivityDto;
import com.bookfox.repository.ActivityMapper;

@Service
public class ActivityService {
    @Autowired
    private ActivityMapper activityMapper;
    
    public List<ActivityDto> getFollowingActivityFeed(String userId, int limit, int offset) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("limit", limit);
        map.put("offset", offset);
        return activityMapper.getFollowingActivityFeed(map);
    }

    public List<ActivityDto> getIncomingActivityFeed(String userId, int limit, int offset) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("limit", limit);
        map.put("offset", offset);
        return activityMapper.getIncomingActivityFeed(map);
    }
}
