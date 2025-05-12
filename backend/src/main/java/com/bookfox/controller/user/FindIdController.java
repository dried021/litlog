package com.bookfox.controller.user;

import com.bookfox.service.EmailService;
import com.bookfox.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/find-id")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FindIdController {

    private final UserService userService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> findUserId(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");

        String foundId = userService.findUserId(name, email);
        if (foundId != null) {
            // 아이디 메일로 전송
            String subject = "[LitLog] 요청하신 아이디입니다.";
            String text = String.format("요청하신 아이디는 다음과 같습니다:\n\n👉 %s", foundId);
            emailService.sendSimpleMessage(email, subject, text);

            return ResponseEntity.ok(Map.of("message", "아이디가 이메일로 전송되었습니다."));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "해당 정보로 가입된 아이디가 없습니다."));
        }
    }

}
