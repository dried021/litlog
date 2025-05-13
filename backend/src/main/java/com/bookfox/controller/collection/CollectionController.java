package com.bookfox.controller.collection;

import com.bookfox.model.CollectionDto;
import com.bookfox.service.CollectionService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/collections") // 여기까지만 base 경로로!
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CollectionController {

    private final CollectionService collectionService;

    // 이번 주 인기순
    @GetMapping("/popular")
    public List<CollectionDto> getPopularCollectionsThisWeek() {
        return collectionService.getWeeklyPopularCollections();
    }

    // 전체 컬렉션 인기/최신 정렬
    @GetMapping // ✅ 경로를 "/collections"으로 중복 지정하면 안 됨
    public ResponseEntity<?> getCollections(@RequestParam(defaultValue = "popular") String sort) {
        List<CollectionDto> list;
        if ("recent".equals(sort)) {
            list = collectionService.getAllCollectionsSortedByRecent();
        } else {
            list = collectionService.getAllCollectionsSortedByLikes();
        }
        return ResponseEntity.ok(Map.of("book_collections", list));
    }
}

