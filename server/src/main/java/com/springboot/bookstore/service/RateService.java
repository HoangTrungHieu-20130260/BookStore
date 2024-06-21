package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Rate;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RateService {
    Rate getRateById(int id);
    Rate createRate(int userId, int productId, String content, int stars, int orderDetailId);
    List<Rate> getRateByProductId(int productId);
}
