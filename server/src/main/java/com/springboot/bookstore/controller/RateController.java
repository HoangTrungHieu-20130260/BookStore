package com.springboot.bookstore.controller;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.springboot.bookstore.dto.RateRequestDto;
import java.util.List;
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
    @GetMapping("/by-product/{id}")
    public Page<Rate> findByProductId(@PathVariable int id,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "5") int size) {
        return rateService.findByProductId(id, page, size);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        return ResponseEntity.ok(rateService.findById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRate(@PathVariable int id, @RequestBody Rate rate) {
        return ResponseEntity.ok(rateService.updateRate(id ,rate));
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

