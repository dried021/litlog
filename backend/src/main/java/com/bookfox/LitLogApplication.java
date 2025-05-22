package com.bookfox;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.bookfox.repository")
public class LitLogApplication {

	public static void main(String[] args) {
		SpringApplication.run(LitLogApplication.class, args);
	}

}

