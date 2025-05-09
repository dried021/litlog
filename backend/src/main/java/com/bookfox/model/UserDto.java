package com.bookfox.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String id;
    private Timestamp idResetAt;
    private String name;
    private String tel;
    private String nickname;
    private Timestamp nicknameResetAt;
    private String profileImage;
    private Timestamp profileImageOrigin;
    private String pwd;
    private Timestamp pwdResetAt;
    private String email;
    private Timestamp regDate;
    private String bio;

    private Integer userType;
    private Integer userStatus;
}
