package com.springboot.bookstore.repository;
import com.springboot.bookstore.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
    Optional<OrderStatus> findByStatus(String status);
}
