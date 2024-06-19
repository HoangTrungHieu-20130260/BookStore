package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.config.JwtGenerator;
import com.springboot.bookstore.entity.DiscountCode;
import com.springboot.bookstore.repository.DiscountCodeRepository;
import com.springboot.bookstore.repository.UserRepository;
import com.springboot.bookstore.service.DiscountCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DiscountCodeServiceImpl implements DiscountCodeService {
    private DiscountCodeRepository discountCodeRepository;
    private JwtGenerator jwtGenerator;
    private UserRepository userRepository;

    @Autowired
    public DiscountCodeServiceImpl(DiscountCodeRepository discountCodeRepository,
                                   JwtGenerator jwtGenerator,
                                   UserRepository userRepository
    ) {
        this.discountCodeRepository = discountCodeRepository;
        this.jwtGenerator = jwtGenerator;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<?> checkDiscountCode(String code) {
        DiscountCode discount = discountCodeRepository.findByCode(code).orElse(null);
        if (discount == null) return new ResponseEntity<>("DiscountCode invalid", HttpStatus.OK);
        LocalDateTime nowDate = LocalDateTime.now();
        if ((discount.getStartDate().equals(nowDate) || discount.getStartDate().isBefore(nowDate)) &&
                discount.getEndDate().isAfter(nowDate)) {
            if (discount.getQuantity() > 0) {
                return new ResponseEntity<>(discount, HttpStatus.OK);
            } else return new ResponseEntity<>("Out of stock", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Discount invalid", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<?> findById(int id) {
        DiscountCode discountCode = discountCodeRepository.findById(id).orElse(null);
        return discountCode == null ? new ResponseEntity<>("Discount not found", HttpStatus.NOT_FOUND)
                : new ResponseEntity<>(discountCode, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> discountIsUsed(int id) {
        DiscountCode discountCode = discountCodeRepository.findById(id).orElse(null);
        if (discountCode == null) return new ResponseEntity<>("Discount code not found!", HttpStatus.NOT_FOUND);
        discountCode.setQuantity(discountCode.getQuantity() - 1);
        return new ResponseEntity<>(discountCode, HttpStatus.OK);
    }
}
