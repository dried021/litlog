package com.bookfox.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public String generateAndSendCode(String email) {
        String code = String.valueOf((int)(Math.random() * 900000) + 100000); // 6자리 숫자
        sendEmail(email, code);
        return code;
    }

    private void sendEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("[LitLog] Verify Your Email Address");

        String content = """
        Hello,

        Thank you for signing up for LitLog.

        Please enter the verification code below to complete your email verification.

        📌 Verification Code: 527194

        ※ If you did not request this email, please disregard it.
    """.formatted(code);

        message.setText(content);
        mailSender.send(message);
    }


    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}


