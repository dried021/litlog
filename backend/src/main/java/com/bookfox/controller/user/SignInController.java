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

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sign-in")
@CrossOrigin(origins = "http://localhost:5173")
public class SignInController {

    private final UserService userService; // ✅ 주입 추가

    @PostMapping
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> body, HttpSession session) {
        String id = body.get("id");
        String password = body.get("password");

        if (id == null || password == null || id.trim().isEmpty() || password.trim().isEmpty()) {
            return ResponseEntity.ok(Map.of("status", "실패", "message", "아이디 또는 비밀번호가 비어 있습니다."));
        }

        UserDto user = userService.findById(id); // ✅ 인스턴스 방식으로 호출
        if (user == null) {
            return ResponseEntity.ok(Map.of("status", "실패", "message", "존재하지 않는 아이디입니다."));
        }

        if (!user.getPwd().equals(password)) {
            return ResponseEntity.ok(Map.of("status", "실패", "message", "비밀번호가 일치하지 않습니다."));
        }

        session.setAttribute("loginUser", user.getId());

        return ResponseEntity.ok(Map.of("status", "성공", "message", "로그인 성공"));
    }
}
