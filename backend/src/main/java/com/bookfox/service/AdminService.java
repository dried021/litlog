package com.bookfox.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.AdminUserDto;
import com.bookfox.repository.AdminMapper;

@Service
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;

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
}
