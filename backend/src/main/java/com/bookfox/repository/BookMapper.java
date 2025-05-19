package com.bookfox.repository;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.BookDto;
import com.bookfox.model.BookListDto;
import com.bookfox.model.BookReviewDto;
import com.bookfox.model.BookReviewListDTO;

@Mapper
public interface BookMapper {
    public Boolean exists(String bookApiId);
    public int getIdByBookApiId(String bookApiId);
    public String getApiIdByBookId(int bookId);

    public int getBookshelfCount(int id);
    public int getLikeCount(int id);
    public int getReviewCount(int id);
    public boolean isLiked(Map<String, Object> params);

    public List<BookReviewDto> getReviews(Map<String, Object> params);
    public void likeReview(Map<String, Object> params);
    public void unlikeReview(Map<String, Object> params);

    public void addBook(BookDto bookDto);
    public void addBookshelf(Map<String, Object> params);
    public void addLike(Map<String, Object> params);
    
    public int checkBookshelf(Map<String, Object> params);
    public int checkLike(Map<String, Object> params);
    public void unlike(Map<String, Object> params);

    public int addReview(Map<String, Object> params);

    public List<BookListDto> getPopularBookList();
    public List<BookListDto> getJustReviewedBookList();
    public List<BookReviewListDTO> getPopularReviewList(int currentPage);

    public int checkReviewed(Map<String, Object> params);

    // 알림
    public String getReviewAuthorId(int reviewId); 
    public String getBookApiIdByReviewId(int reviewId); 
}


