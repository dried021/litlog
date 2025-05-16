package com.bookfox.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookfox.model.AdminCommentDto;
import com.bookfox.model.AdminUserDto;
import com.bookfox.model.BookReviewListDTO;

@Mapper
public interface AdminMapper {
    public List<AdminUserDto> selectUsers(Map<String, Object> params);
    public int countUsers(String searchName);
    public int countReviews(String id);
    public int countCollections(String id);
    public int countComments(String id);

    public List<AdminCommentDto> selectComments(Map<String, Object> params);
    public int countCollectionComments(String searchKeyword);
    
    public void changeUsers(Map<String, Object> params);
    public void adminDeleteUser(String id);

    public void deleteCommentById(String id);
    public void deleteCollectionById(String id);
    public void deleteReviewById(String id);

    public List<BookReviewListDTO> selectReviews(Map<String, Object> params);
    public int countAdminReviews(String searchKeyword);

}
