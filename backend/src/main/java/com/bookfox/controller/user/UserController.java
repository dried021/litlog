package com.bookfox.controller.user;

import com.bookfox.model.UserDto;
import com.bookfox.service.EmailService;
import com.bookfox.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/api/sign-up")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
     private final EmailService emailService;

    @PostMapping("/check-id") // 아이디 중복 체크
    public ResponseEntity<?> checkId(@RequestBody Map<String, String> body) {
        String id = body.get("id");

        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required.");
        }

        boolean available = !userService.isIdDuplicate(id);
        return ResponseEntity.ok(Map.of("available", available));
    }

    @PostMapping("/check-nickname") // 닉네임 중복 체크
    public ResponseEntity<?> checkNickname(@RequestBody Map<String, String> body) {
        String nickname = body.get("nickname");

        if (nickname == null || nickname.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Nickname is required.");
        }

        boolean available = !userService.isNicknameDuplicate(nickname);
        return ResponseEntity.ok(Map.of("available", available));
    }

    @PostMapping("/check-email") // 이메일 중복 체크
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }
        boolean available = !userService.isEmailDuplicate(email);
        return ResponseEntity.ok(Map.of("available", available));
    }

    @PostMapping("/send-code") // 이메일 인증 코드 전송
    public ResponseEntity<?> sendCode(@RequestBody Map<String, String> body, HttpSession session) {
        String email = body.get("email");
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }

        String code = emailService.generateAndSendCode(email);
        session.setAttribute("emailVerificationCode", code);
        return ResponseEntity.ok("The code has been sent.");
    }

    @PostMapping("/verify-email") // 이메일 인증 코드 확인
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> body, HttpSession session) {
        String inputCode = body.get("code");
        String savedCode = (String) session.getAttribute("emailVerificationCode");

        if (savedCode != null && savedCode.equals(inputCode)) {
            return ResponseEntity.ok(Map.of("verified", true));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect verification code.");
        }
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserDto user) {
        if (userService.isIdDuplicate(user.getId())) {
            return ResponseEntity.badRequest().body("ID already exists.");
        }

        userService.register(user);
        return ResponseEntity.ok("Sign-up successful.");
    }
}
