package com.bookfox.controller.books;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/books")
public class BookController {

    @Value("${google.books.api.key}")
    private String apiKey;

    @GetMapping("/search")
    public ResponseEntity<String> searchBooks(@RequestParam String keyword) {
        String url = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);

        return ResponseEntity.ok(result);
    }
}