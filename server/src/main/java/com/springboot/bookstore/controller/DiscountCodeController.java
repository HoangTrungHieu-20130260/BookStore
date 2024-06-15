package com.springboot.bookstore.controller;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.DiscountCode;
import com.springboot.bookstore.service.DiscountCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/discount")
public class DiscountCodeController {
    private DiscountCodeService discountCodeService;
    @Autowired
    public DiscountCodeController(DiscountCodeService discountCodeService) {
        this.discountCodeService = discountCodeService;
    }
    @GetMapping("")
    public Page<DiscountCode> findAll(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size,
                                      @RequestParam(defaultValue = "id") String sortBy,
                                      @RequestParam(defaultValue = "asc") String sortDir,
                                      @RequestParam(defaultValue = "") String filter) {
        return discountCodeService.findAll(page,size,sortBy,sortDir, filter);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        return ResponseEntity.ok(discountCodeService.findById(id));

    }

    @DeleteMapping("/{id}")
    public void deleteDiscountCode(@PathVariable int id) {
        discountCodeService.deleteDiscountCode(id);
    }
    @PostMapping
    public ResponseEntity<DiscountCode> createDiscountCode(@RequestBody DiscountCode discountCode) {
        return ResponseEntity.ok(discountCodeService.createDiscountCode(discountCode));
    }
    @PutMapping("/{id}")
    public ResponseEntity<DiscountCode> updateDiscountCode(@PathVariable int id, @RequestBody DiscountCode discountCode) {
        return ResponseEntity.ok(discountCodeService.updateDiscountCode(id, discountCode));
    }
    @GetMapping("/code")
    public ResponseEntity<?> findByCode(@RequestParam String code) {
        return ResponseEntity.ok(discountCodeService.findByCode(code));

    }
}
