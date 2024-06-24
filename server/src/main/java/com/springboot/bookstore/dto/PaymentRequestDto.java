package com.springboot.bookstore.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentRequestDto {
    private long amount;
    private String orderInfo;
}
