package com.springboot.bookstore.service;

import com.springboot.bookstore.dto.OrderDto;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<?> orderWithPaymentMethodCOD(OrderDto orderDto);
}
