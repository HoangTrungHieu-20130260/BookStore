package com.springboot.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RateRequestDto {
    private int userId;
    private int productId;
    private String content;
    private int stars;
    private int orderDetailsId;
}