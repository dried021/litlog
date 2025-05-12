package com.bookfox.controller.books;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.BookListDto;
import com.bookfox.service.BookService;

import jakarta.annotation.Resource;


@RestController
@RequestMapping("/books")
public class BookMain {
    @Resource
    private BookService bookService;

    @GetMapping("/popularBookList")
    public ResponseEntity<List<BookListDto>> getPopularBookList(){
        List<BookListDto> books = bookService.getPopularBookList(); 
        System.out.println("popularbooklist" + books);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/justReviewedBookList")
    public ResponseEntity<List<BookListDto>> getJustReviewedBookList(){
        List<BookListDto> books = bookService.getJustReviewedBookList(); 
        return ResponseEntity.ok(books);
    }

}

