package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RateRepository extends JpaRepository<Rate, Integer> {
    Page<Rate> findAll(Specification<Rate> specification, Pageable pageable);
}
