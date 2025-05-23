package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.ActivityDto;

@Mapper
public interface ActivityMapper {
    public List<ActivityDto> getFollowingActivityFeed(Map<String, Object> map);
    public List<ActivityDto> getIncomingActivityFeed(Map<String, Object> map);
}
