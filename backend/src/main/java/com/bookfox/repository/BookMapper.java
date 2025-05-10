package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {
    public Boolean exists(String bookApiId);
    public int getIdByBookApiId(String bookApiId);
    public int getBookshelfCount(int id);
    public int getLikeCount(int id);
}

