package com.bookfox.controller.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api")
public class Main {

    @GetMapping("/message")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}