package com.springboot.bookstore.controller;
import com.springboot.bookstore.service.DiscountCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/discount")
public class DiscountCodeController {

    private DiscountCodeService discountCodeService;

    @Autowired
    public DiscountCodeController(DiscountCodeService discountCodeService) {
        this.discountCodeService = discountCodeService;
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkCode(
            @RequestParam String code
    ) {
        return discountCodeService.checkDiscountCode(code);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id){
        return discountCodeService.findById(id);
    }
}

