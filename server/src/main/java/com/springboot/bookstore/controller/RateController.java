package com.springboot.bookstore.controller;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/review")
public class RateController {
    private RateService rateService;
    @Autowired
    public RateController(RateService rateService) {
        this.rateService = rateService;
    }
    @GetMapping
    public Page<Rate> getAllRate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String filter) {
        return rateService.findAll(page, size, sortBy,sortDir,filter);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        return ResponseEntity.ok(rateService.findById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRate(@PathVariable int id, @RequestBody Rate rate) {
        return ResponseEntity.ok(rateService.updateRate(id ,rate));
    }

}
