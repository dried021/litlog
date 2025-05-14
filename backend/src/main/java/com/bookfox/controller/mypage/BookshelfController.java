package com.bookfox.controller.mypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.BookshelfDto;
import com.bookfox.service.BookshelfService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("members")
public class BookshelfController {
    @Resource
    private BookshelfService bookshelfService;

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
        // TODO: return session user 
        
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}/bookshelf/to-read")
    public ResponseEntity<Map<String,Object>> getToReadBooks(@PathVariable String userId) {
        Map<String,Object> response = new HashMap<>(); 
        List<BookshelfDto> books = bookshelfService.getToReadBooks(userId);
        
        response.put("totalCount", books.size());
        response.put("books", books);
        // TODO: return session user 
        
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}/bookshelf/favorite")
    public ResponseEntity<Map<String, Object>> getFavoriteBooks(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        List<BookshelfDto> books = bookshelfService.getFavoriteBooks(userId);
        
        response.put("totalCount", books.size()); 
        response.put("books", books);
        // TODO: return session user 
        return ResponseEntity.ok(response); 
    }
}
