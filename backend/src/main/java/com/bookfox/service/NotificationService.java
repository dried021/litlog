package com.bookfox.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookfox.model.NotificationDto;
import com.bookfox.repository.NotificationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationMapper notificationMapper;

    public void sendNotification(NotificationDto dto) {
        notificationMapper.insertNotification(dto);
    }

    public List<NotificationDto> getNotificationsByUserId(String userId) {
        return notificationMapper.getNotificationsByUserId(userId);
    }

    public void setAsRead(int notificationId) {
        notificationMapper.setNotificationAsRead(notificationId);
    }

    public String getNicknameByUserId(String userId) {
        return notificationMapper.getNicknameByUserId(userId);
    }
}
