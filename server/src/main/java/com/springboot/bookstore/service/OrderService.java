package com.springboot.bookstore.service;

import com.springboot.bookstore.dto.OrderDto;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<?> loadOrderDataById(long id);

    ResponseEntity<?> orderWithPaymentMethodCOD(OrderDto orderDto);

    ResponseEntity<?> orderWithPaymentMethodVNPAY(OrderDto orderDto);
}
