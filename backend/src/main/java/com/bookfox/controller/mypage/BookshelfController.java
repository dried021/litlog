package com.bookfox.controller.mypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.BookshelfDto;
import com.bookfox.service.BookService;
import com.bookfox.service.BookshelfService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("members")
public class BookshelfController {
    @Resource
    private BookshelfService bookshelfService;

    @Resource
    private BookService bookService;

    @GetMapping("/{userId}/bookshelf/current")
    public ResponseEntity<Map<String, Object>> getCurrentlyReadingBooks(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<BookshelfDto> books = bookshelfService.getCurrentlyReadingBooks(userId);
        
        response.put("totalCount", books.size());
        response.put("books", books);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}/bookshelf/finished")
    public ResponseEntity<Map<String,Object>> getReadBooks(@PathVariable String userId) {
        Map<String,Object> response = new HashMap<>(); 
        List<BookshelfDto> books = bookshelfService.getReadBooks(userId);
        
        response.put("totalCount", books.size());
        response.put("books", books);
        
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}/bookshelf/to-read")
    public ResponseEntity<Map<String,Object>> getToReadBooks(@PathVariable String userId) {
        Map<String,Object> response = new HashMap<>(); 
        List<BookshelfDto> books = bookshelfService.getToReadBooks(userId);
        
        response.put("totalCount", books.size());
        response.put("books", books);
        
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}/bookshelf/favorite")
    public ResponseEntity<Map<String, Object>> getFavoriteBooks(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<BookshelfDto> books = bookshelfService.getFavoriteBooks(userId);
        
        response.put("totalCount", books.size()); 
        response.put("books", books);
        
        return ResponseEntity.ok(response); 
    }

    @PostMapping("/{userId}/progress")
    public ResponseEntity<String> updateProgress(@PathVariable String userId, @RequestBody BookshelfDto dto) {
        boolean success = bookshelfService.updateProgress(userId, dto.getBookId(), dto.getProgress());

        if (success) {
            return ResponseEntity.ok("Progress updated");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
        }
    }

    @DeleteMapping("/{userId}/bookshelf/{bookId}")
    public ResponseEntity<String> deleteBookshelf(@PathVariable String userId, @PathVariable int bookId) {
        boolean success = bookshelfService.removeBookshelf(userId, bookId);

        if (success) {
            return ResponseEntity.ok("Removed from bookshelf");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
        }
    }
    @PatchMapping("/{userId}/bookshelf/{bookId}")
    public ResponseEntity<String> moveBookshelf(@PathVariable String userId, @PathVariable int bookId, @RequestBody Map<String, Object> request) {
        int bookshelfType = (int) request.get("bookshelfType");
        boolean success = bookshelfService.moveBookshelf(userId, bookId, bookshelfType);

        if (success) {
            return ResponseEntity.ok("Moved shelf");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
        }
    }
    @DeleteMapping("/{userId}/books/{bookId}")
    public ResponseEntity<String> unlikeBook(@PathVariable String userId, @PathVariable int bookId) {
        boolean success = bookshelfService.unlikeBook(userId, bookId);

        if (success) {
            return ResponseEntity.ok("Moved shelf");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
        }
    }
}
