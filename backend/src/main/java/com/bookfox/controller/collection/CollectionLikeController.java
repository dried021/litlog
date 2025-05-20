package com.bookfox.controller.collection;

import com.bookfox.model.CollectionLikeDto;
import com.bookfox.model.NotificationDto;
import com.bookfox.service.CollectionLikeService;
import com.bookfox.service.NotificationService;

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
    private final NotificationService notificationService;

    @PostMapping("/{collectionId}/like")
    public ResponseEntity<?> toggleCollectionLike(@PathVariable int collectionId, HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("Please log in to access this page.");
        }

        CollectionLikeDto likeDto = new CollectionLikeDto();
        likeDto.setUserId(userId);
        likeDto.setTargetId(collectionId);
        likeDto.setLikeType(3); 

        boolean isLiked = likeService.toggleLike(likeDto);
        int newLikeCount = likeService.getCollectionLikeCount(collectionId);

        
        if (isLiked) {
            String ownerId = likeService.getCollectionOwnerId(collectionId);
            if (!userId.equals(ownerId)) {
                NotificationDto dto = new NotificationDto();
                dto.setUserId(ownerId);                 
                dto.setSenderId(userId);               
                dto.setType("COLLECTION_LIKE");
                dto.setTargetId(collectionId); 
                dto.setRead(false);

                notificationService.sendNotification(dto);
            }
        }

        return ResponseEntity.ok(Map.of(
                "liked", isLiked,
                "likeCount", newLikeCount
        ));
    }

    @GetMapping("/{collectionId}/like-status") 
    public ResponseEntity<Boolean> hasUserLiked(
        @PathVariable int collectionId,
        HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) return ResponseEntity.ok(false);
        boolean liked = likeService.hasUserLikedCollection(userId, collectionId);
        return ResponseEntity.ok(liked);
    }

}

