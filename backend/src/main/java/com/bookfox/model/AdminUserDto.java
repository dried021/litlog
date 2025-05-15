package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserDto {
    private String id;
    private String name;
    private String tel;
    private String email;
    private String nickname;
    private String profile;
    private int reviews;
    private int collections;
    private int comments; 
    private Integer userType;
    private Integer userStatus;
    private Timestamp regDate;
}
