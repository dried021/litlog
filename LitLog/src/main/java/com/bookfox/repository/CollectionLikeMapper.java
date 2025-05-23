package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;
import com.bookfox.model.CollectionLikeDto;

@Mapper
public interface CollectionLikeMapper {
    void insertLike(CollectionLikeDto like);
    void deleteLike(CollectionLikeDto like);
    int countLikesForCollection(int collectionId);
    boolean hasUserLikedCollection(CollectionLikeDto like);
    String getCollectionOwnerId(int collectionId); // 알림
}
