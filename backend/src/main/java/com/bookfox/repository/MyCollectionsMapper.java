package com.bookfox.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.MyCollectionsDto;

@Mapper
public interface MyCollectionsMapper {
    List<MyCollectionsDto> getCreatedCollections(@Param("userId") String userId);
    List<MyCollectionsDto> getLikedCollections(@Param("userId") String userId);
}
