package com.bookfox.controller.books;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/books")
public class Books {

    @Value("${google.books.api.key}")
    private String apiKey;

    @GetMapping("/search")
    public ResponseEntity<String> searchResults(@RequestParam String keyword,
        @RequestParam(defaultValue = "1") int pageNum) {
        int startIndex = (pageNum-1)*10;
        String url = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&startIndex=" + startIndex + "&maxResults=10&key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        System.out.println("url"+url);
        return ResponseEntity.ok(result);
    }
}