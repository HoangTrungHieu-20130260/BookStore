package com.springboot.bookstore.controller;

import com.springboot.bookstore.dto.OrderDto;
import com.springboot.bookstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping("/cod")
    public ResponseEntity<?> orderCOD(@RequestBody OrderDto orderDto){
        return orderService.orderWithPaymentMethodCOD(orderDto);
    }

    @PostMapping("/vnpay")
    public ResponseEntity<?> orderVNPAY(@RequestBody OrderDto orderDto){
        return orderService.orderWithPaymentMethodVNPAY(orderDto);
    }
}
