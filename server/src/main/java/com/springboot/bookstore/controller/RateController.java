package com.springboot.bookstore.controller;

import com.springboot.bookstore.dto.RateRequestDto;
import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v1/rate")
public class RateController {
    private RateService rateService;
    @Autowired
    public RateController(RateService rateService) {
        this.rateService = rateService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rate> getRateById(@PathVariable int id) {
        Rate rate = rateService.getRateById(id);
        return ResponseEntity.ok(rate);
    }

    @PostMapping("/createRate")
    public ResponseEntity<Rate> createRate(@RequestBody RateRequestDto rateRequestDto) {
        Rate rate = rateService.createRate(rateRequestDto.getUserId(), rateRequestDto.getProductId(), rateRequestDto.getContent(), rateRequestDto.getStars(), rateRequestDto.getOrderDetailsId());
        return ResponseEntity.ok(rate);
    }
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rate>> getRateByProductId(@PathVariable int productId) {
        List<Rate> rates = rateService.getRateByProductId(productId);
        return ResponseEntity.ok(rates);
    }


}

