package com.bookfox;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan(basePackages = "com.bookfox.repository")
public class LitLogApplication {

	public static void main(String[] args) {
		//Dotenv dotenv = Dotenv.configure().filename("setting.env").directory("./").load();
		//dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		SpringApplication.run(LitLogApplication.class, args);
	}

}

