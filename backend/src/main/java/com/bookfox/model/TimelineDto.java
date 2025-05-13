package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimelineDto {
    private int id;
    private String nickname;            
    private int bookId;     
    private String bookApiId;   
    private String title;        
    private String thumbnail;    
    private int rating;           
    private String content;       
    private String creationDate;  
    private boolean liked;       
}
