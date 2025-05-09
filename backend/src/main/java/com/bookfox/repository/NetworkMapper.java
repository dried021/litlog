package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.ProfileDto;

@Mapper
public interface NetworkMapper {
    public ProfileDto getProfile(String userId);
}
