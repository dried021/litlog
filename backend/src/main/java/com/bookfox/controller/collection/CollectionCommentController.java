package com.bookfox.controller.collection;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.CollectionCommentDto;
import com.bookfox.model.NotificationDto;
import com.bookfox.service.CollectionCommentService;
import com.bookfox.service.NotificationService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CollectionCommentController {
    private final NotificationService notificationService;
    @Autowired
    private CollectionCommentService commentService;

    @GetMapping("/{collectionId}/comments")
    public Map<String, Object> getCommentsByCollectionId(
            @PathVariable int collectionId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        int offset = (page - 1) * size;

        List<CollectionCommentDto> comments = commentService.getCommentsByCollectionId(collectionId, offset, size);
        int totalCount = commentService.getCommentCountByCollectionId(collectionId);

        Map<String, Object> result = new HashMap<>();
        result.put("comments", comments);
        result.put("totalCount", totalCount);
        return result;
    }

    @PostMapping("/{collectionId}/comments")
    public ResponseEntity<?> addComment(
        @PathVariable int collectionId,
        @RequestBody Map<String, String> request,
        HttpSession session
    ) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        String content = request.get("content");
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("내용을 입력해주세요.");
        }

        CollectionCommentDto comment = new CollectionCommentDto();
        comment.setUserId(userId);
        comment.setCollectionId(collectionId);
        comment.setContent(content);

        commentService.insertComment(comment);

        // 알림
        String ownerId = commentService.getCollectionOwnerId(collectionId);
        if (!userId.equals(ownerId)) {
            NotificationDto dto = new NotificationDto();
            dto.setUserId(ownerId);           
            dto.setSenderId(userId);            
            dto.setType("COLLECTION_COMMENT");
            dto.setTargetId(collectionId);
            dto.setRead(false);
            notificationService.sendNotification(dto);
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable int commentId, HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        CollectionCommentDto comment = commentService.getCommentById(commentId);
        if (comment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글이 존재하지 않습니다.");
        }

        if (!userId.equals(comment.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없습니다.");
        }

        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable int commentId,
            @RequestBody Map<String, String> request,
            HttpSession session) {

        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        String content = request.get("content");
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("내용을 입력해주세요.");
        }

        CollectionCommentDto existing = commentService.getCommentById(commentId);
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글이 존재하지 않습니다.");
        }

        if (!userId.equals(existing.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다.");
        }

        commentService.updateCommentContent(commentId, content);
        return ResponseEntity.ok().build();
    }

}

