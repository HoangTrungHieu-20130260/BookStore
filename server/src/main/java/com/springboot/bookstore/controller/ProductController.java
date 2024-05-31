package com.springboot.bookstore.controller;

import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
    private ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("")
    public Page<Product> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return productService.findAll(page, size, sortBy,sortDir);
    }
//    @GetMapping("/products-by-category/{id}")
////    public List<Product> findByCategoryId(@PathVariable int id) {
////        return productService.findByCategoryId(id);
////    }
}
