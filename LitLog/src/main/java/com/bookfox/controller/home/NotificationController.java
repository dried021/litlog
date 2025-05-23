package com.bookfox.controller.home;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookfox.model.NotificationDto;
import com.bookfox.service.NotificationService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationDto>> getNotifications(HttpSession session) {
        String loginUserId = (String) session.getAttribute("loginUser");
        if (loginUserId == null) {
            return ResponseEntity.status(401).build();
        }

        List<NotificationDto> notifications = notificationService.getNotificationsByUserId(loginUserId);
        return ResponseEntity.ok(notifications);
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> readNotification(@PathVariable int id) {
        notificationService.setAsRead(id);
        return ResponseEntity.ok().build();
    }
}
