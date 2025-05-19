package com.bookfox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bookfox.model.BookDto;
import com.bookfox.model.CollectionDto;
import com.bookfox.repository.CollectionMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final CollectionMapper collectionMapper;

    public List<CollectionDto> getPopularCollectionsThisWeek(int offset, int size) {
        List<CollectionDto> collections = collectionMapper.selectPopularCollectionsThisWeek(offset, size);
        for (CollectionDto col : collections) {
            List<BookDto> books = collectionMapper.getBooksByCollectionId(Map.of(
                "collectionId", col.getId(),
                "limit", 6
            ));
            col.setBooks(books);
        }
        return collections;
    }

    public int countPopularCollectionsThisWeek() {
        return collectionMapper.countPopularCollectionsThisWeek();
    }

    public List<CollectionDto> getCollectionsSortedByLikes(int offset, int size) {
        List<CollectionDto> collections = collectionMapper.selectCollectionsSortedByLikes(offset, size);

        // ★ 각 콜렉션에 대해 books 리스트를 직접 붙여주기
        for (CollectionDto col : collections) {
            List<BookDto> books = collectionMapper.getBooksByCollectionId(Map.of(
                "collectionId", col.getId(),
                "limit", 6  // 썸네일 용도만이므로 최대 6개만
            ));
            col.setBooks(books);
        }

        return collections;
    }

    public List<CollectionDto> getCollectionsSortedByRecent(int offset, int size) {
        List<CollectionDto> collections = collectionMapper.selectCollectionsSortedByRecent(offset, size);

        for (CollectionDto col : collections) {
            List<BookDto> books = collectionMapper.getBooksByCollectionId(Map.of(
                "collectionId", col.getId(),
                "limit", 6
            ));
            col.setBooks(books);
        }

        return collections;
    }


    public int countAllCollections() {
        return collectionMapper.countAllCollections();
    }

    public CollectionDto getCollectionById(int id) {
        List<CollectionDto> list = collectionMapper.selectCollectionById(id);
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0); // 병합된 하나의 CollectionDto 객체
    }

    @Transactional
    public int saveCollection(CollectionDto dto) {
        // 1. book_collection INSERT
        collectionMapper.insertCollection(dto); // insert + useGeneratedKeys
        int collectionId = dto.getId(); // MyBatis로 auto-increment된 ID 받음

        for (BookDto book : dto.getBooks()) {
            Integer bookId = collectionMapper.findBookIdByApiId(book.getBookApiId());

            if (bookId == null) {
                collectionMapper.insertBook(book);
                bookId = book.getId(); // 새로 생성된 book.id
            }

            collectionMapper.insertCollectionBook(collectionId, bookId, book.getThumbnail());
        }

        return collectionId;
    }

    // 책 목록 페이징 조회
    public List<BookDto> getBooksByCollectionId(int collectionId, int offset, int size) {
        Map<String, Object> params = new HashMap<>();
        params.put("collectionId", collectionId);
        params.put("offset", offset);
        params.put("size", size);
        return collectionMapper.getBooksByCollectionId(params);
    }

    // 총 책 개수 조회
    public int getBookCountByCollectionId(int collectionId) {
        return collectionMapper.getBookCountByCollectionId(collectionId);
    }
    
    public void updateCollection(CollectionDto dto) {
        // 1. 기존 책들 삭제
        collectionMapper.deleteBooksByCollectionId(dto.getId());

        // 2. 컬렉션 제목/내용 업데이트
        collectionMapper.updateCollectionMeta(dto);

        // 3. 새 책들 추가
        for (BookDto book : dto.getBooks()) {
            Integer bookId = collectionMapper.findBookIdByApiId(book.getBookApiId());
            if (bookId == null) {
                collectionMapper.insertBook(book);
                bookId = book.getId(); // useGeneratedKeys로 자동 생성됨
            }
            collectionMapper.insertCollectionBook(dto.getId(), bookId, book.getThumbnail());
        }
    }

    public void deleteCollection(int collectionId, String userId) {
        // 1. 연결된 책 삭제
        collectionMapper.deleteBooksByCollectionId(collectionId);

        // 2. 컬렉션 자체 삭제
        collectionMapper.deleteCollection(collectionId, userId);
    }

    public String getCollectionOwner(int collectionId) {
        return collectionMapper.findUserIdByCollectionId(collectionId);
    }
}
