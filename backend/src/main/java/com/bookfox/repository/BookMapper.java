package com.bookfox.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {
    public Boolean exists(String bookApiId);
}
