package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.BookDto;
import com.bookfox.model.CollectionDto;

@Mapper
public interface CollectionMapper {
     // 이번 주 인기 컬렉션 (페이징 지원)
    List<CollectionDto> selectPopularCollectionsThisWeek(@Param("offset") int offset, @Param("size") int size);

    // 이번 주 인기 컬렉션 총 개수
    int countPopularCollectionsThisWeek();
    
    List<CollectionDto> selectCollectionsSortedByLikes(@Param("offset") int offset, @Param("size") int size);
    List<CollectionDto> selectCollectionsSortedByRecent(@Param("offset") int offset, @Param("size") int size);
    int countAllCollections();
    List<CollectionDto> selectCollectionById(int id);
     // 1. 콜렉션 저장
    void insertCollection(CollectionDto dto);

    // 2. 책 존재 여부 확인
    Integer findBookIdByApiId(String bookApiId);

    // 3. 책 저장
    void insertBook(BookDto book);

    // 4. 콜렉션-책 연결 저장
    void insertCollectionBook(@Param("collectionId") int collectionId,
                              @Param("bookId") int bookId,
                              @Param("thumbnail") String thumbnail,
                               @Param("orderIndex") int orderIndex);

    List<BookDto> getBooksByCollectionId(Map<String, Object> params);
    int getBookCountByCollectionId(int collectionId);

    // 메타 정보 수정
    void updateCollectionMeta(CollectionDto dto);

    // 기존 책들 삭제
    void deleteBooksByCollectionId(@Param("collectionId") int collectionId);

    void deleteCollection(@Param("collectionId") int collectionId,
                      @Param("userId") String userId);

    String findUserIdByCollectionId(@Param("collectionId") int collectionId);
}

