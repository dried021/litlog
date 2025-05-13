package com.bookfox.controller.books;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.BookDto;
import com.bookfox.service.BookService;
import com.bookfox.util.CategoryMapper;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/books")
public class BooksAdd {
    @Resource
    private BookService bookService;

    @PostMapping("/bookshelf")
    public ResponseEntity<Boolean> addToBookshelf(@RequestBody Map<String, Object> request) {
        //session에서 user 가져오기
        String userId = "user01";

        String bookApiId = (String) request.get("bookId");
        int option = (int) request.get("option");
        boolean exists = bookService.exists(bookApiId);

        if (!exists){
            Map<String, Object> book = (Map<String, Object>) request.get("book");
            if (book != null) {
                BookDto bookDto = mapToBookDto(book);
                bookService.addBook(bookDto);
            }
        }

        int bookId = bookService.getIdByBookApiId(bookApiId);
        bookService.addBookshelf(bookId, userId, option);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/like")
    public ResponseEntity<Integer> addLike(@RequestBody Map<String, Object> request) {
        //session에서 user 가져오기
        String userId = "user01";
        String bookApiId = (String) request.get("bookId");
        boolean exists = bookService.exists(bookApiId);

        if (!exists){
            Map<String, Object> book = (Map<String, Object>) request.get("book");
            if (book != null) {
                BookDto bookDto = mapToBookDto(book);
                System.out.println("Book DTO: " + bookDto);
                bookService.addBook(bookDto);
            }
        }

        int bookId = bookService.getIdByBookApiId(bookApiId);
        int result = bookService.checkLike(bookId, userId);
        if (result>0){
            return ResponseEntity.ok(result);
        }
        bookService.addLike(bookId, userId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/unlike")
    public ResponseEntity<Boolean> unLike(@RequestBody Map<String, Object> request) {
        //session에서 user 가져오기
        String userId = "user01";
        String bookApiId = (String) request.get("bookApiId");

        int bookId = bookService.getIdByBookApiId(bookApiId);
        bookService.unlike(bookId, userId);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/review")
    public ResponseEntity<Map<String, Object>> addReview(@RequestBody Map<String, Object> request){
        //세션에서 가져오기
        String userId = "user01";

        String content = (String) request.get("content");
        int rating = Integer.parseInt(String.valueOf(request.get("rating")));
        String bookApiId = (String) request.get("bookApiId");


        boolean exists = bookService.exists(bookApiId);

        if (!exists){
            Map<String, Object> book = (Map<String, Object>) request.get("book");
            if (book != null) {
                BookDto bookDto = mapToBookDto(book);
                System.out.println("Book DTO: " + bookDto);
                bookService.addBook(bookDto);
            }
        }

        int bookId = bookService.getIdByBookApiId(bookApiId);

        Map<String, Object> response = new HashMap<>();
        int reviewId =bookService.addReview(bookId, userId, content, rating);
        response.put("success", true);
        response.put("reviewId", reviewId);
        response.put("userId", userId);
        response.put("message", "Review added successfully.");
        return ResponseEntity.ok(response);
    }
    



    private BookDto mapToBookDto(Map<String, Object> book) {
        BookDto bookDto = new BookDto();
        
        // bookApiId
        bookDto.setBookApiId(Optional.ofNullable((String) book.get("id")).orElse(""));
    
        Map<String, Object> volumeInfo = (Map<String, Object>) book.get("volumeInfo");
        if (volumeInfo != null) {
            
            // Title
            bookDto.setTitle(Optional.ofNullable((String) volumeInfo.get("title")).orElse("Unknown Title"));
            
            // Subtitle
            bookDto.setSubtitle(Optional.ofNullable((String) volumeInfo.get("subtitle")).orElse(""));
    
            // Authors - List<String> to String
            List<String> authors = (List<String>) volumeInfo.get("authors");
            bookDto.setAuthors(authors != null && !authors.isEmpty() ? String.join(", ", authors) : "Unknown Author");
    
            // Publisher
            bookDto.setPublisher(Optional.ofNullable((String) volumeInfo.get("publisher")).orElse("Unknown Publisher"));
    
            // Published Date - String to Timestamp
            String publishedDate = (String) volumeInfo.get("publishedDate");
            if (publishedDate != null) {
                bookDto.setPublishedDate(parseTimestamp(publishedDate));
            } else {
                bookDto.setPublishedDate(null);
            }
    
            // Description
            bookDto.setDescription(Optional.ofNullable((String) volumeInfo.get("description")).orElse("No description available"));
    
            // Page Count
            Object pageCount = volumeInfo.get("pageCount");
            bookDto.setPageCount(pageCount instanceof Integer ? (int) pageCount : 0);
    
            // Thumbnail
            Map<String, String> imageLinks = (Map<String, String>) volumeInfo.get("imageLinks");
            bookDto.setThumbnail(imageLinks != null ? imageLinks.getOrDefault("thumbnail", "/images/covernotavailable.png") : "/images/covernotavailable.png");
    
            // Category Mapping
            List<String> categories = (List<String>) volumeInfo.get("categories");
            bookDto.setBookCategory(CategoryMapper.mapCategory(categories));
        }
    
        return bookDto;
    }

    private Timestamp parseTimestamp(String dateString) {
        if (dateString == null || dateString.isEmpty()) {
            return null;
        }

        try {
            LocalDate localDate = LocalDate.parse(dateString);
            LocalDateTime localDateTime = localDate.atStartOfDay();
            return Timestamp.valueOf(localDateTime);
        } catch (Exception e) {
            System.out.println("Invalid date format: " + dateString);
            return null;
        }
    }


}