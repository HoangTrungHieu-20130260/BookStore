package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Rate;
import org.springframework.data.domain.Page;

public interface RateService{
    Page<Rate> findAll(int page, int size, String sortBy, String sortDir, String filter);
    Page<Rate> findByProductId(int id, int page, int size);
    Rate findById(int id);
    Rate updateRate(int id, Rate rate);
}
