package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.DiscountCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface DiscountCodeRepository extends JpaRepository<DiscountCode, Integer> {
    Optional<DiscountCode> findByCode(String code);
    Page<DiscountCode> findAll(Specification<DiscountCode> specification, Pageable pageable);
}