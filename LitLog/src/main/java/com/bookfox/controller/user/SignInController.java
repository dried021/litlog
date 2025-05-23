package com.bookfox.controller.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.UserDto;
import com.bookfox.service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SignInController {

    private final UserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> body, HttpSession session, HttpServletResponse response) {
        String id = body.get("id");
        String password = body.get("password");

        if (id == null || password == null || id.trim().isEmpty() || password.trim().isEmpty()) {
            return ResponseEntity.ok(Map.of("status", "실패", "message", "ID or password cannot be empty.."));
        }

        UserDto user = userService.findById(id); 
        if (user == null) {
            return ResponseEntity.ok(Map.of("status", "실패", "message", "ID not found."));
        }

        if (!user.getPwd().equals(password)) {
            return ResponseEntity.ok(Map.of("status", "실패", "message", "Passwords do not match."));
        }

        session.setAttribute("loginUser", id);

        return ResponseEntity.ok(Map.of(
            "status", "성공",
            "message", "Login successful.",
            "user_status", user.getUserStatus() 
        ));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("status", "성공", "message", "Logout successful."));
    }

}
