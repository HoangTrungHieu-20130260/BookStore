package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findAll(Specification<Product> specification, Pageable pageable);
    List<Product> findAll();
    Page<Product> findByCategoryId(int id, Pageable pageable);
}
