package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProductService {
    Page<Product> findAll(int page, int size,String sortBy, String sortDir);
    List<Product> findByCategoryId(int id);
}
