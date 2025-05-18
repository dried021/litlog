package com.bookfox.controller.collection;

import com.bookfox.model.BookDto;
import com.bookfox.model.CollectionDto;
import com.bookfox.service.CollectionService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public ResponseEntity<?> getWeeklyPopularCollections(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "12") int size) {

    int offset = (page - 1) * size;

    List<CollectionDto> list = collectionService.getPopularCollectionsThisWeek(offset, size);
    int totalCount = collectionService.countPopularCollectionsThisWeek();

    int totalPages = (int) Math.ceil((double) totalCount / size);

    return ResponseEntity.ok(Map.of(
        "book_collections", list,
        "totalPages", totalPages
    ));
}

    // 전체 컬렉션 인기/최신 정렬
    @GetMapping
    public ResponseEntity<?> getCollections(
            @RequestParam(defaultValue = "popular") String sort,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {

        int offset = (page - 1) * size;

        List<CollectionDto> list;
        int totalCount;

        if ("recent".equals(sort)) {
            list = collectionService.getCollectionsSortedByRecent(offset, size);
            totalCount = collectionService.countAllCollections(); // 정렬 상관없이 총 개수
        } else {
            list = collectionService.getCollectionsSortedByLikes(offset, size);
            totalCount = collectionService.countAllCollections();
        }

        int totalPages = (int) Math.ceil((double) totalCount / size);

        return ResponseEntity.ok(Map.of(
                "book_collections", list,
                "totalPages", totalPages
        ));
    }

    @GetMapping("/{id}")
    public CollectionDto getCollectionDetail(@PathVariable int id) {
        return collectionService.getCollectionById(id);
    }

    @PostMapping("/new")
    public ResponseEntity<?> saveCollection(
        @RequestBody CollectionDto dto,
        HttpSession session
    ) {
        String userId = (String) session.getAttribute("loginUser");
        System.out.println("[콜렉션 생성 요청] 세션 userId = " + userId);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        dto.setUserId(userId);
        int collectionId = collectionService.saveCollection(dto);
        return ResponseEntity.ok(Map.of("collectionId", collectionId));
    }

    @GetMapping("/{id}/books")
    public Map<String, Object> getBooksByPage(
        @PathVariable int id,
        @RequestParam int page,
        @RequestParam int size
    ) {
        int offset = (page - 1) * size;
        List<BookDto> books = collectionService.getBooksByCollectionId(id, offset, size);
        int totalCount = collectionService.getBookCountByCollectionId(id);

        Map<String, Object> result = new HashMap<>();
        result.put("books", books);
        result.put("totalCount", totalCount);
        return result;
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<?> updateCollection(
        @PathVariable int collectionId,
        @RequestBody CollectionDto dto,
        HttpSession session
    ) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        String ownerId = collectionService.getCollectionOwner(collectionId);
        if (!userId.equals(ownerId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }

        dto.setId(collectionId);
        dto.setUserId(userId);

        try {
            collectionService.updateCollection(dto);
            return ResponseEntity.ok("수정 성공");
        } catch (Exception e) {
            e.printStackTrace(); // ✅ 서버 콘솔에 전체 오류 출력
            return ResponseEntity.status(500).body("수정 실패");
        }
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<?> deleteCollection(
        @PathVariable int collectionId,
        HttpSession session
    ) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            collectionService.deleteCollection(collectionId, userId);
            return ResponseEntity.ok("삭제 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("삭제 실패");
        }
    }
}

