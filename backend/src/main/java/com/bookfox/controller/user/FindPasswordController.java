package com.bookfox.controller.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookfox.model.UserDto;
import com.bookfox.service.EmailService;
import com.bookfox.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/find-password")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FindPasswordController  {

    private final UserService userService;
    private final EmailService emailService;

    @PostMapping("/send-code")
    public ResponseEntity<?> sendResetCode(@RequestBody Map<String, String> body, HttpSession session) {
        String id = body.get("id");
        String name = body.get("name"); 
        String email = body.get("email");

        if (id == null || name == null || email == null) {
            return ResponseEntity.badRequest().body("\"Incomplete input.");
        }

        UserDto user = userService.findById(id);
        if (user == null || !user.getEmail().equals(email) || !user.getName().equals(name)) {
            return ResponseEntity.badRequest().body("Entered information is incorrect.");
        }

        String code = String.valueOf((int)(Math.random() * 900000) + 100000); // 6자리 숫자 코드
        session.setAttribute("resetCode", code);
        session.setAttribute("resetId", id);
        session.setMaxInactiveInterval(180); // 3분

        String subject = "[LitLog] Password Reset Verification Code";
        String bodyText = """
            Hello,

            We received a request to reset the password for your LitLog account.

            Please use the verification code below to continue:

            Verification Code: %s

            ⚠️ This code is valid for 3 minutes.

            If you did not request a password reset, please ignore this email or contact support.

            Best regards,  
            LitLog
            """.formatted(code);

        emailService.sendSimpleMessage(email, subject, bodyText);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> body, HttpSession session) {
        String code = body.get("code");
        String sessionCode = (String) session.getAttribute("resetCode");

        if (sessionCode != null && sessionCode.equals(code)) {
            session.setAttribute("resetVerified", true);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(400).body("Incorrect code.");
        }
    }

    @PostMapping("/submit-new")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body, HttpSession session) {
        Boolean verified = (Boolean) session.getAttribute("resetVerified");
        String resetId = (String) session.getAttribute("resetId");

        if (verified == null || !verified || resetId == null) {
            return ResponseEntity.status(403).body("Not verified.");
        }

        String newPwd = body.get("newPwd");
        userService.updatePassword(resetId, newPwd);

        session.removeAttribute("resetVerified");
        session.removeAttribute("resetId");
        session.removeAttribute("resetCode");

        return ResponseEntity.ok().build();
    }
}

    

