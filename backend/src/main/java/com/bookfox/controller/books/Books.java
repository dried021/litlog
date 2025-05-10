package com.bookfox.controller.books;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bookfox.service.BookService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/books")
public class Books {
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
}