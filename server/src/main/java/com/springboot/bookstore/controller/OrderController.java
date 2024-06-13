package com.springboot.bookstore.controller;

import com.springboot.bookstore.dto.OrderDto;
import com.springboot.bookstore.entity.Order;
import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }
    @GetMapping
    public Page<Order> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String filter) {
        return orderService.findAll(page, size, sortBy,sortDir,filter);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        return ResponseEntity.ok(orderService.findById(id));

    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
    }

    @PostMapping("/cod")
    public ResponseEntity<?> orderCOD(@RequestBody OrderDto orderDto){
        return orderService.orderWithPaymentMethodCOD(orderDto);
    }
}
