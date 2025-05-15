package com.bookfox.service;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.BookDto;
import com.bookfox.model.BookListDto;
import com.bookfox.model.BookReviewDto;
import com.bookfox.model.BookReviewListDTO;
import com.bookfox.repository.BookMapper;

@Service
public class BookService {
    @Autowired
    private BookMapper bookMapper;

    public Boolean exists(String bookApiId) {
        Boolean exists = bookMapper.exists(bookApiId);
        return exists;
    }

    public int getIdByBookApiId(String bookApiId) {
        return bookMapper.getIdByBookApiId(bookApiId);
    }

    public String getApiIdByBookId(int bookId){
        return bookMapper.getApiIdByBookId(bookId);
    }

    public int getBookshelfCount(int id) {
        return bookMapper.getBookshelfCount(id);
    }

    public int getLikeCount(int id) {
        return bookMapper.getLikeCount(id);
    }

    public int getReviewCount(int id) {
        return bookMapper.getReviewCount(id);
    }

    public boolean isLiked(int id, String userId){
        Map<String, Object> params = Map.of("id", id, "userId", userId);
        return bookMapper.isLiked(params);
    }

    public List<BookReviewDto> getReviews(int id, int currentPage, String userId, Boolean isPopularity) {
        int offset = (currentPage - 1) * 5;
        Map<String, Object> params = Map.of("id", id, "offset", offset, "userId", userId, "isPopularity", isPopularity);
        return bookMapper.getReviews(params);
    }

    public void likeReview(int reviewId, String userId){
        Map<String, Object> params = Map.of("id", reviewId, "userId", userId);
        bookMapper.likeReview(params);
    }

    public void unlikeReview(int reviewId, String userId){
        Map<String, Object> params = Map.of("id", reviewId, "userId", userId);
        bookMapper.unlikeReview(params);
    }

    public void addBook(BookDto bookDto){
        bookMapper.addBook(bookDto);
    }

    public int checkBookshelf(int bookId, String userId){
        Map<String, Object> params = Map.of("bookId", bookId, "userId", userId);
        return bookMapper.checkBookshelf(params);
    }

    public void addBookshelf(int bookId, String userId, int option){
        Map<String, Object> params = Map.of("bookId", bookId, "userId", userId, "option", option);
        bookMapper.addBookshelf(params);
    }

    public int checkLike(int bookId, String userId){
        Map<String, Object> params = Map.of("bookId", bookId, "userId", userId);
        return bookMapper.checkLike(params);
    }
    public void addLike(int bookId, String userId){
        Map<String, Object> params = Map.of("bookId", bookId, "userId", userId);
        bookMapper.addLike(params);
    }
    public void unlike(int bookId, String userId){
        Map<String, Object> params = Map.of("bookId", bookId, "userId", userId);
        bookMapper.unlike(params);
    }

    public boolean checkReviewed(String userId, String bookApiId){
        Map<String, Object> params = Map.of("userId", userId, "bookApiId", bookApiId);
        return bookMapper.checkReviewed(params) > 0;
    }

    public int addReview(int bookId, String userId, String content, int rating){
        Map<String, Object> params = new HashMap<>();
        params.put("bookId", bookId);
        params.put("userId", userId);
        params.put("content", content);
        params.put("rating", rating);        
        bookMapper.addReview(params);
        Object idObject = params.get("id");
        int generatedId;

        if (idObject instanceof BigInteger) {
            generatedId = ((BigInteger) idObject).intValue();
        } else if (idObject instanceof Long) {
            generatedId = ((Long) idObject).intValue();
        } else {
            generatedId = (int) idObject; 
        }

        return generatedId;
    }

    public List<BookListDto> getPopularBookList(){
        return bookMapper.getPopularBookList();
    }

    public List<BookListDto> getJustReviewedBookList(){
        return bookMapper.getJustReviewedBookList();
    }

    public List<BookReviewListDTO> getPopularReviewList(int currentPage){
        int offset = (currentPage - 1) * 5;
        return bookMapper.getPopularReviewList(offset);
    }
}
