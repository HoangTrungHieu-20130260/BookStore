package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;


public interface ProductService {
    Page<Product> findAll(int page, int size,String sortBy, String sortDir, String filter);
    List<Product> getAllProducts();
    Product findById(int id);
    void deleteProduct(int id);
    Product updateProduct(int id, Product product);

    Product createProduct(Product product);
    List<Object[]> getBestSellingProducts();
    public List<Product> get10NewsProduct();
}
