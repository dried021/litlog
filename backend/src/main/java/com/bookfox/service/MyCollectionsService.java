package com.bookfox.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookfox.model.MyCollectionsDto;
import com.bookfox.repository.MyCollectionsMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyCollectionsService {
    private final MyCollectionsMapper myCollectionsMapper;

    public List<MyCollectionsDto> getCreatedCollections(String userId) {
        return myCollectionsMapper.getCreatedCollections(userId);
    }

    public List<MyCollectionsDto> getLikedCollections(String userId) {
        return myCollectionsMapper.getLikedCollections(userId);
    }
}
