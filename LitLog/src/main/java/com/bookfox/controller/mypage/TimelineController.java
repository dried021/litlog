package com.bookfox.controller.mypage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bookfox.model.TimelineDto;
import com.bookfox.service.TimelineService;

@RestController
@RequestMapping("/api/members") 
public class TimelineController {
    @Autowired
    private TimelineService timelineService;

    @GetMapping("/{userId}/reviews/review-timeline")
    public List<TimelineDto> getTimelineAll(@PathVariable String userId) {
        return timelineService.getReviewTimelineAll(userId);
    }
    
    @GetMapping("/{userId}/reviews/review-timeline/{year}")
    public List<TimelineDto> getTimeline(@PathVariable String userId, @PathVariable int year) {
        return timelineService.getReviewTimeline(userId, year);
    }

    @GetMapping("/{userId}/join-year")
    public int getJoinYear(@PathVariable String userId) {
        return timelineService.getUserJoinYear(userId);
    }
}
