package com.bookfox.service;

import com.bookfox.model.CollectionLikeDto;
import com.bookfox.repository.CollectionLikeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollectionLikeService {

    private final CollectionLikeMapper likeMapper;

    public boolean toggleLike(CollectionLikeDto likeDto) {
        boolean alreadyLiked = likeMapper.hasUserLikedCollection(likeDto);

        if (alreadyLiked) {
            likeMapper.deleteLike(likeDto);
            return false;
        } else {
            likeMapper.insertLike(likeDto);
            return true;
        }
    }

    public boolean hasUserLikedCollection(String userId, int collectionId) {
        CollectionLikeDto likeDto = new CollectionLikeDto();
        likeDto.setUserId(userId);
        likeDto.setTargetId(collectionId);
        likeDto.setLikeType(3);
        return likeMapper.hasUserLikedCollection(likeDto);
    }

    public int getCollectionLikeCount(int collectionId) {
        return likeMapper.countLikesForCollection(collectionId);
    }
}

