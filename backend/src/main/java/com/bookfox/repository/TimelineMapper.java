package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.TimelineDto;

@Mapper
public interface TimelineMapper {
    List<TimelineDto> getReviewTimelineAll(String userId);
    List<TimelineDto> getReviewTimeline(Map<String, Object> param);
    int getUserJoinYear(String userId);
}
