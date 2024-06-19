package com.springboot.bookstore.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class PaymentResponseDto implements Serializable {
    private String status;
    private String message;
    private String url;
}
