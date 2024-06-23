package com.springboot.bookstore.service.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bookstore.entity.DiscountCode;
import com.springboot.bookstore.repository.DiscountCodeRepository;
import com.springboot.bookstore.service.DiscountCodeService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@Service
public class DiscountCodeServiceImpl implements DiscountCodeService {
    private DiscountCodeRepository discountCodeRepository;
    @Autowired
    public DiscountCodeServiceImpl(DiscountCodeRepository discountCodeRepository) {
        this.discountCodeRepository = discountCodeRepository;
    }

    @Override
    public ResponseEntity<?> checkDiscountCode(String code) {
        DiscountCode discount = discountCodeRepository.findByCode(code).orElse(null);
        if (discount == null) return new ResponseEntity<>("DiscountCode invalid", HttpStatus.OK);
        LocalDateTime nowDate = LocalDateTime.now();
        if ((discount.getStartDate().equals(nowDate) || discount.getStartDate().isBefore(nowDate)) &&
                discount.getEndDate().isAfter(nowDate) && discount.isStatus()) {
            if (discount.getQuantity() > 0) {
                return new ResponseEntity<>(discount, HttpStatus.OK);
            } else return new ResponseEntity<>("Out of stock", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Discount invalid", HttpStatus.OK);
        }
    }

    @Override
    public Page<DiscountCode> findAll(int page, int size, String sortBy, String sortDir, String filter) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDir.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sortPa = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sortPa);
        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<DiscountCode> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("code"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            return predicate;
        };
        return discountCodeRepository.findAll(specification, pageable);
    }

    @Override
    public DiscountCode findById(int id) {
        return discountCodeRepository.findById(id).orElse(null);
    }

    @Override
    public DiscountCode findByCode(String code) {
        return discountCodeRepository.findByCode(code).orElse(null);
    }

    @Override
    public void deleteDiscountCode(int id) {
        discountCodeRepository.deleteById(id);
    }

    @Override
    public DiscountCode createDiscountCode(DiscountCode discountCode) {
        discountCode.setCreatedAt(LocalDateTime.now());
        return discountCodeRepository.save(discountCode);
    }

    @Override
    public DiscountCode updateDiscountCode(int id, DiscountCode discountCode) {
        DiscountCode result = discountCodeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Discount not found"));
        result.setCode(discountCode.getCode());
        result.setDiscountRate(discountCode.getDiscountRate());
        result.setStartDate(discountCode.getStartDate());
        result.setEndDate(discountCode.getEndDate());
        result.setStatus(discountCode.isStatus());
        return discountCodeRepository.save(result);
    }
}
