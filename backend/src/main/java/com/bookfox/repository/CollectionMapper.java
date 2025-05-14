package com.bookfox.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.CollectionDto;

@Mapper
public interface CollectionMapper {
    List<CollectionDto> selectPopularCollectionsThisWeek();
    List<CollectionDto> selectAllCollectionsSortedByLikes();
    List<CollectionDto> selectAllCollectionsSortedByRecent();
    List<CollectionDto> selectCollectionById(int id);
}

