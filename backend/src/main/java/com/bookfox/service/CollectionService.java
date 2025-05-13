package com.bookfox.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookfox.model.CollectionDto;
import com.bookfox.repository.CollectionMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final CollectionMapper collectionMapper;

    public List<CollectionDto> getWeeklyPopularCollections() {
        return collectionMapper.selectPopularCollectionsThisWeek();
    }

    public List<CollectionDto> getAllCollectionsSortedByLikes() {
        return collectionMapper.selectAllCollectionsSortedByLikes();
    }

    public List<CollectionDto> getAllCollectionsSortedByRecent() {
        return collectionMapper.selectAllCollectionsSortedByRecent();
    }
}
