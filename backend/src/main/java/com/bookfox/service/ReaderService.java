package com.bookfox.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
