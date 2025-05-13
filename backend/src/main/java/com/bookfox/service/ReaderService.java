package com.bookfox.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookfox.model.BookDto;
import com.bookfox.model.UserListDto;
import com.bookfox.repository.ReaderMapper;


@Service
public class ReaderService {
    @Autowired
    private ReaderMapper readerMapper;

    public List<UserListDto> getAvidUserList(){
        return readerMapper.getAvidUserList();
    }

    public List<UserListDto> getBelovedUserList(){
        return readerMapper.getBelovedUserList();
    }

    public List<UserListDto> getRank(int startIndex, int itemsPerPage){
        int offset = (startIndex) * itemsPerPage;
        Map<String, Object> params = Map.of("offset", offset, "itemsPerPage", itemsPerPage);
        return readerMapper.getRank(params);
    }

    public List<BookDto> getRankerThumbnail(String id){
        return readerMapper.getRankerThumbnail(id);
    }

    public int getUserCount(){
        return readerMapper.getUserCount();
    }
}
