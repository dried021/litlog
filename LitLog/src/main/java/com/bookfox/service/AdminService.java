package com.bookfox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.AdminCommentDto;
import com.bookfox.model.AdminUserDto;
import com.bookfox.model.BookReviewListDTO;
import com.bookfox.repository.AdminMapper;
import com.bookfox.repository.SettingMapper;

@Service
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private SettingMapper settingMapper;

    public Map<String, Object> getUsers(int pageNum, String searchName, int sortOption){
        int userPerPage = 10;
        int offset = (pageNum - 1 ) * userPerPage;
        
        searchName = (searchName != null) ? searchName : "";
        Map<String, Object> params = Map.of("offset", offset, "userPerPage", userPerPage, "searchName", searchName, "sortOption", sortOption);
        List<AdminUserDto> users = adminMapper.selectUsers(params);
        int totalCount = adminMapper.countUsers(searchName);
        int pageCount = (int) Math.ceil((double) totalCount / userPerPage);

        for (AdminUserDto user : users){
            String id = user.getId();
            user.setReviews(adminMapper.countReviews(id));
            user.setCollections(adminMapper.countCollections(id));
            user.setComments(adminMapper.countComments(id));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("users", users);
        result.put("pageCount", pageCount);
        result.put("totalCount", totalCount);
        return result;
    }

    public Map<String, Object> getComments(int pageNum, String searchKeyword, int sortOption){
        int commentPerPage = 10;
        int offset = (pageNum - 1) * commentPerPage;

        searchKeyword = (searchKeyword != null) ? searchKeyword : "";
        Map<String, Object> params = Map.of("offset", offset, "commentPerPage", commentPerPage, "searchKeyword", searchKeyword,"sortOption", sortOption);
        List<AdminCommentDto> comments = adminMapper.selectComments(params);

        int totalCount = adminMapper.countCollectionComments(searchKeyword);
        int pageCount = (int) Math.ceil((double) totalCount / commentPerPage);

        Map<String, Object> result = new HashMap<>();
        result.put("comments", comments);
        result.put("pageCount", pageCount);
        result.put("totalCount", totalCount);
        return result;
    }

    public Map<String, Object> getReviews(int pageNum, String searchKeyword, int sortOption){
        int reviewPerPage = 10;
        int offset = (pageNum - 1) * reviewPerPage;
        searchKeyword = (searchKeyword != null) ? searchKeyword : "";
        Map<String, Object> params = Map.of("offset", offset, "reviewPerPage", reviewPerPage, "searchKeyword", searchKeyword,"sortOption", sortOption);
        List<BookReviewListDTO> reviews = adminMapper.selectReviews(params);

        int totalCount = adminMapper.countAdminReviews(searchKeyword);
        int pageCount = (int) Math.ceil((double) totalCount / reviewPerPage);

        Map<String, Object> result = new HashMap<>();
        result.put("reviews", reviews);
        result.put("pageCount", pageCount);
        result.put("totalCount", totalCount);
        return result;

    }

    public void changeUsers(String id, Integer option, String buttonType){
        if ("userStatus".equals(buttonType) && option == 3){
            adminMapper.adminDeleteUser(id);
            settingMapper.deleteReviewByUserId(id);
            settingMapper.deleteCommentByUserId(id);
            settingMapper.deleteCollectionByUserId(id);
            return;
        }

        Map<String, Object> params = Map.of("option", option, "buttonType", buttonType, "id", id);
        adminMapper.changeUsers(params);
    }

    public void deleteCommentById(String id){
        adminMapper.deleteCommentById(id);
    }

    public void deleteCollectionById(String id){
        adminMapper.deleteCollectionById(id);
    }

    public void deleteReviewById(String id){
        adminMapper.deleteReviewById(id);
    }
}
