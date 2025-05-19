package com.bookfox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.CollectionCommentDto;
import com.bookfox.repository.CollectionCommentMapper;

@Service
public class CollectionCommentService {

    @Autowired
    private CollectionCommentMapper commentMapper;

    public List<CollectionCommentDto> getCommentsByCollectionId(int collectionId, int offset, int size) {
        Map<String, Object> param = new HashMap<>();
        param.put("collectionId", collectionId);
        param.put("offset", offset);
        param.put("size", size);
        return commentMapper.getCommentsByCollectionId(param);
    }

    public int getCommentCountByCollectionId(int collectionId) {
        return commentMapper.getCommentCountByCollectionId(collectionId);
    }

    public void insertComment(CollectionCommentDto comment) {
        commentMapper.insertComment(comment);
    }

    public CollectionCommentDto getCommentById(int commentId) {
        return commentMapper.getCommentById(commentId);
    }

    public void deleteComment(int commentId) {
        commentMapper.deleteComment(commentId);
    }

    public void updateCommentContent(int commentId, String content) {
        commentMapper.updateCommentContent(commentId, content);
    }

    // 알림
    public String getCollectionOwnerId(int collectionId) {
        return commentMapper.getCollectionOwnerId(collectionId);
    }
}

