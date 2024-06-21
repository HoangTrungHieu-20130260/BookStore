package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RateRepository  extends JpaRepository<Rate, Integer> {
    Rate findById(int id);
    List<Rate> findAllByProductIdAndStatus(int productId, boolean status);
}
