package com.bookfox.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewUpdateDto {
    private String content;
    private int rating;
}
