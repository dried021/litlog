package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class NotificationDto {
    private int id;              
    private String userId;      
    private String senderId;    
    private String senderNickname; 
    private String type;       
    private int targetId;      
    private String message;   
    private boolean isRead;      
    private Timestamp createdAt; 
    private String bookApiId; 
}
