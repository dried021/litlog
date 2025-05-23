package com.bookfox.controller.user;

import com.bookfox.service.EmailService;
import com.bookfox.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/find-id")
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
            String subject = "[LitLog] Your ID Request Result";
            String text = String.format("""
            Hello %s,

            This is the result of your username retrieval request on LitLog.

            The username associated with your information is:

            👉 Username: %s

            If you did not request this, please ignore this email.

            Thank you,
            LitLog
            """, name, foundId);
            emailService.sendSimpleMessage(email, subject, text);

            return ResponseEntity.ok(Map.of("message", "Your ID has been sent to your email."));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "No ID is registered with the provided information."));
        }
    }

}
