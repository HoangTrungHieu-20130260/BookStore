package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Optional<Order> findById(long id);
    Page<Order> findAll(Specification<Order> specification, Pageable pageable);
}