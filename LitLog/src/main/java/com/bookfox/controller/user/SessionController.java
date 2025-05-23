package com.bookfox.controller.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SessionController {

    @GetMapping("/api/session-check")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String userId = (String) session.getAttribute("loginUser");

        if (userId != null) {
            return ResponseEntity.ok(Map.of("loggedIn", true, "id", userId));
        } else {
            return ResponseEntity.ok(Map.of("loggedIn", false));
        }
    }
}
