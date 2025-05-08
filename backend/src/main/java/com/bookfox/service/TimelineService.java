package com.bookfox.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.TimelineDto;
import com.bookfox.repository.TimelineMapper;

@Service
public class TimelineService {
    @Autowired
    private TimelineMapper timelineMapper;

    public List<TimelineDto> getReviewTimeline(String userId, int year) {
        return timelineMapper.getReviewTimeline(Map.of(
            "userId", userId,
            "year", year
        ));
    }
}
