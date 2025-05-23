package com.bookfox.controller.books;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bookfox.model.BookReviewDto;
import com.bookfox.model.NotificationDto;
import com.bookfox.service.BookService;
import com.bookfox.service.NotificationService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/books")
public class Books {
    @Autowired
    private NotificationService notificationService;

    @Resource
    private BookService bookService;

    @Value("${google.books.api.key}")
    private String apiKey;

    @GetMapping("/search")
    public ResponseEntity<String> searchResults(@RequestParam String keyword,
        @RequestParam(defaultValue = "1") int startIndex,
        @RequestParam(defaultValue = "1") int maxResults) {
        String url = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&startIndex=" + startIndex + "&maxResults="+ maxResults + "&key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/detail")
    public ResponseEntity<String> detailBooks(@RequestParam String keyword) {
        String url = "https://www.googleapis.com/books/v1/volumes/" + keyword + "?key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        System.out.println("url"+url);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/query")
    public ResponseEntity<Boolean> queryBooks(@RequestParam String bookApiId) {
        Boolean exists = bookService.exists(bookApiId);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/counts")
    public ResponseEntity<Map<String, Object>> bookscount(@RequestParam String bookApiId, HttpSession session){
        String userId = (String) session.getAttribute("loginUser");

        boolean exists = bookService.exists(bookApiId);
        Map<String, Object> response = new HashMap<>();
        
        if (!exists){
            response.put("bookshelfCount", 0);
            response.put("likeCount", 0);
            response.put("isLiked", 0);
            return ResponseEntity.ok(response);
        }

        int id = bookService.getIdByBookApiId(bookApiId);
        int bookshelfCount = bookService.getBookshelfCount(id);
        int likeCount = bookService.getLikeCount(id);
        if (userId == null){
            response.put("isLiked", false);
        }else{
            boolean isLiked = bookService.isLiked(id, userId);
            response.put("isLiked", isLiked);
        }
        response.put("bookshelfCount", bookshelfCount);
        response.put("likeCount", likeCount);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/bookshelf")
    public ResponseEntity<Boolean> checkBookShelf(@RequestParam String bookApiId, HttpSession session){
        String userId = (String) session.getAttribute("loginUser");
        boolean exists = bookService.exists(bookApiId);
        
        if (!exists || userId == null){
            return ResponseEntity.ok(false);
        }
        
        int bookId = bookService.getIdByBookApiId(bookApiId);
        int result = bookService.checkBookshelf(bookId, userId);
        return ResponseEntity.ok(result > 0);
    }

    @GetMapping("/reviews")
    public ResponseEntity<Map<String, Object>> getReviews(@RequestParam String bookApiId,
                    @RequestParam int currentPage, @RequestParam boolean isPopularity, HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");
        if (userId == null) userId = "";
        
        boolean exists = bookService.exists(bookApiId);

        Map<String, Object> response = new HashMap<>();
        if (exists) {
            int bookId = bookService.getIdByBookApiId(bookApiId);
            List<BookReviewDto> reviews = bookService.getReviews(bookId, currentPage, userId, isPopularity);
            int reviewsCount = bookService.getReviewCount(bookId);
            response.put("reviews", reviews);
            response.put("reviewsCount", reviewsCount);
        } else {
            response.put("reviews", null);
            response.put("reviewsCount", 0);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reviews/like")
    public ResponseEntity<Boolean> changeLikeState(@RequestBody Map<String, Object> payload, HttpSession session){
        String userId = (String) session.getAttribute("loginUser");

        if (userId == null){
            return ResponseEntity.ok(false);
        }
        int reviewId = (int) payload.get("reviewId");
        boolean isLiked = (boolean) payload.get("isLiked");

        if (isLiked){
            bookService.likeReview(reviewId, userId);
            // 알림
            String ownerId = bookService.getReviewAuthorId(reviewId);
            if (!userId.equals(ownerId)) {
                String bookApiId = bookService.getBookApiIdByReviewId(reviewId);
                NotificationDto dto = new NotificationDto();
                dto.setUserId(ownerId);
                dto.setSenderId(userId);
                dto.setType("REVIEW_LIKE");
                dto.setTargetId(reviewId);
                dto.setBookApiId(bookApiId);
                dto.setRead(false);
                notificationService.sendNotification(dto);
            }
        }else{
            bookService.unlikeReview(reviewId, userId);
        }

        return ResponseEntity.ok(true);
    }
}