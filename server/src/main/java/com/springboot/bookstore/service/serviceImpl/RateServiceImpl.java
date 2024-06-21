package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.config.JwtGenerator;
import com.springboot.bookstore.entity.OrderDetails;
import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.entity.Rate;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.repository.OrderDetailsRepository;
import com.springboot.bookstore.repository.ProductRepository;
import com.springboot.bookstore.repository.RateRepository;
import com.springboot.bookstore.repository.UserRepository;
import com.springboot.bookstore.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RateServiceImpl implements RateService {
    private RateRepository rateRepository;
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private OrderDetailsRepository orderDetailsRepository;
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
    public Rate getRateById(int id) {
        return rateRepository.findById(id);
    }

    @Override
    public Rate createRate(int userId, int productId, String comment, int stars, int orderDetailId) {
        LocalDateTime time = LocalDateTime.now();
        Rate rate = new Rate();
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        OrderDetails orderDetails = orderDetailsRepository.findById(orderDetailId).orElse(null);
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
