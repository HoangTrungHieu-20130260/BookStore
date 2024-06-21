package com.springboot.bookstore.repository;


import com.springboot.bookstore.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
}
