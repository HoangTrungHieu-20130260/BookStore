package com.springboot.bookstore.service;

import com.springboot.bookstore.dto.OrderDto;
import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Order;
import com.springboot.bookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    public Page<Order> findAll(int page, int size, String sortBy, String sortDir, String filter);
    Order findById(int id);
    void deleteOrder(int id);
    ResponseEntity<?> orderWithPaymentMethodCOD(OrderDto orderDto);

}
