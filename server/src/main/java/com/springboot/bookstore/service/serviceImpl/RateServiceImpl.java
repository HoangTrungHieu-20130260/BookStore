package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.config.JwtGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bookstore.entity.OrderDetails;
import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.repository.OrderDetailsRepository;
import com.springboot.bookstore.repository.ProductRepository;
import com.springboot.bookstore.repository.RateRepository;
import com.springboot.bookstore.repository.UserRepository;
import com.springboot.bookstore.service.RateService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class RateServiceImpl implements RateService {
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private RateRepository rateRepository;
    private JwtGenerator jwtGenerator;


    @Autowired
    public RateServiceImpl(RateRepository rateRepository, UserRepository userRepository, ProductRepository productRepository, OrderDetailsRepository orderDetailsRepository, JwtGenerator jwtGenerator) {
        this.rateRepository = rateRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.jwtGenerator = jwtGenerator;
    }




    @Override
    public Page<Rate> findAll(int page, int size, String sortBy, String sortDir, String filter) {
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
        Specification<Rate> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            return predicate;
        };
        return rateRepository.findAll(specification, pageable);
    }

    @Override
    public Page<Rate> findByProductId(int id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return rateRepository.findByProductId(id, pageable);
    }

    @Override
    public Rate findById(int id) {
        return rateRepository.findById(id).orElse(null);
    }

    @Override
    public Rate updateRate(int id, Rate rate) {
        Rate result = rateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        result.setStatus(rate.isStatus());
        result.setUpdatedAt(LocalDateTime.now());
        return rateRepository.save(result);
    }

    @Override
    public Rate createRate(int userId, int productId, String comment, int stars, int orderDetailsId) {
        LocalDateTime time = LocalDateTime.now();
        Rate rate = new Rate();
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        OrderDetails orderDetails = orderDetailsRepository.findById(orderDetailsId).orElse(null);
        rate.setProduct(product);
        rate.setUser(user);
        rate.setRating(stars);
        rate.setComment(comment);
        rate.setOrderDetails(orderDetails);
        rate.setCreatedAt(time);
        rate.setStatus(true);
        return rateRepository.save(rate);
    }

    @Override
    public List<Rate> getRateByProductId(int productId) {
        return rateRepository.findAllByProductIdAndStatus(productId, true);
        }
}
