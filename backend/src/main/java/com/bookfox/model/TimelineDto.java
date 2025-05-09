package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimelineDto {
    private String id;            
    private int bookId;        
    private String title;        
    private String thumbnail;    
    private int rating;           
    private String content;       
    private String creationDate;  
    private boolean liked;       
}
