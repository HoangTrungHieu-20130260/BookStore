package com.springboot.bookstore.service;

import org.springframework.http.ResponseEntity;

public interface DiscountCodeService {
    ResponseEntity<?> checkDiscountCode(String code);

    ResponseEntity<?> findById(int id);

    ResponseEntity<?> discountIsUsed(int id);
}
