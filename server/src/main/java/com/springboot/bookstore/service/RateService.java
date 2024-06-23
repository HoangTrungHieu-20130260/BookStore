package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Rate;
import org.springframework.data.domain.Page;

public interface RateService{
    Page<Rate> findAll(int page, int size, String sortBy, String sortDir, String filter);
    Page<Rate> findByProductId(int id, int page, int size);
    Rate findById(int id);
    Rate updateRate(int id, Rate rate);
    Rate getRateById(int id);
    Rate createRate(int userId, int productId, String content, int stars, int orderDetailId);
    List<Rate> getRateByProductId(int productId);
}
