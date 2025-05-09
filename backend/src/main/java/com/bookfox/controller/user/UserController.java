package com.bookfox.controller.user;

import com.bookfox.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/sign-up")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping("/check-id")
    public ResponseEntity<?> checkId(@RequestBody Map<String, String> body) {
        String id = body.get("id");

        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("아이디가 비어 있습니다.");
        }

        boolean available = !userService.isIdDuplicate(id);
        return ResponseEntity.ok(Map.of("available", available));
    }

    @PostMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@RequestBody Map<String, String> body) {
        String nickname = body.get("nickname");

        if (nickname == null || nickname.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("닉네임이 비어 있습니다.");
        }

        boolean available = !userService.isNicknameDuplicate(nickname);
        return ResponseEntity.ok(Map.of("available", available));
    }

}
