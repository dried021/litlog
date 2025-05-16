package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.CollectionCommentDto;

@Mapper
public interface CollectionCommentMapper {
    List<CollectionCommentDto> getCommentsByCollectionId(Map<String, Object> param);
    int getCommentCountByCollectionId(int collectionId);
    void insertComment(CollectionCommentDto comment);
    CollectionCommentDto getCommentById(int commentId);
    void deleteComment(int commentId);
    void updateCommentContent(@Param("commentId") int commentId, @Param("content") String content);

}

