package com.bookfox.controller.collection;

import com.bookfox.model.CollectionLikeDto;
import com.bookfox.service.CollectionLikeService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class CollectionLikeController {

    private final CollectionLikeService likeService;

    @PostMapping("/{collectionId}/like")
    public ResponseEntity<?> toggleCollectionLike(@PathVariable int collectionId, HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        CollectionLikeDto likeDto = new CollectionLikeDto();
        likeDto.setUserId(userId);
        likeDto.setTargetId(collectionId);
        likeDto.setLikeType(3); // 3 = 콜렉션

        boolean isLiked = likeService.toggleLike(likeDto);
        int newLikeCount = likeService.getCollectionLikeCount(collectionId);

        return ResponseEntity.ok(Map.of(
                "liked", isLiked,
                "likeCount", newLikeCount
        ));
    }

    @GetMapping("/{collectionId}/like-status") // 이렇게 바꿔!
    public ResponseEntity<Boolean> hasUserLiked(
        @PathVariable int collectionId,
        HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) return ResponseEntity.ok(false);
        boolean liked = likeService.hasUserLikedCollection(userId, collectionId);
        return ResponseEntity.ok(liked);
    }

}

