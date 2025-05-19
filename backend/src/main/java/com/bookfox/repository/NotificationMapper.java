package com.bookfox.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bookfox.model.NotificationDto;

@Mapper
public interface NotificationMapper {
    int insertNotification(NotificationDto notification); // 저장
    List<NotificationDto> getNotificationsByUserId(@Param("userId") String userId); // 조회
    int setNotificationAsRead(@Param("id") int id); // 읽음처리
    String getNicknameByUserId(@Param("userId") String userId);
}
