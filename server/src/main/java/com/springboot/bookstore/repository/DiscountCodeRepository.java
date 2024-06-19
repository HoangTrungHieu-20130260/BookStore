package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.DiscountCode;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface DiscountCodeRepository extends JpaRepository<DiscountCode, Integer> {
    Optional<DiscountCode> findByCode(String code);
    Optional<DiscountCode> findById(int id);
}