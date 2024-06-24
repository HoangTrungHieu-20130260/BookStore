package com.springboot.bookstore.service.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bookstore.dto.ProductsOrderDto;
import com.springboot.bookstore.dto.OrderDto;
import com.springboot.bookstore.entity.*;
import com.springboot.bookstore.repository.*;
import com.springboot.bookstore.service.OrderService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private OrderStatusRepository orderStatusRepository;
    private DiscountCodeRepository discountCodeRepository;
    private RateRepository rateRepository;
    @Autowired
    public OrderServiceImpl(UserRepository userRepository, ProductRepository productRepository, OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, OrderStatusRepository orderStatusRepository, DiscountCodeRepository discountCodeRepository, RateRepository rateRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.discountCodeRepository = discountCodeRepository;
        this.rateRepository = rateRepository;
    }




    @Override
    public Page<Order> findAll(int page, int size, String sortBy, String sortDir, String filter) {
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
        Specification<Order> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("fullName"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("payment_method")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("payment_method"), filterJson.get("payment_method").asText()));
            }
            if (filterJson.has("payment_status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("payment_status"), filterJson.get("payment_status").asBoolean()));
            }
            if (filterJson.has("order_status")) {
                Join<Order, OrderStatus> orderStatusJoin = root.join("orderStatus");
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(orderStatusJoin.get("id"), filterJson.get("order_status").asLong()));
            }
            if (filterJson.has("createdAt_gte")) {
                LocalDateTime createdAtGte = LocalDateTime.parse(filterJson.get("createdAt_gte").asText());
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), createdAtGte));
            }
            return predicate;
        };
        return orderRepository.findAll(specification, pageable);
    }

    @Override
    public Order findById(int id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteOrder(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        List<OrderDetails> orderDetailsList = order.getOrderDetails();
        for (OrderDetails orderDetails : orderDetailsList) {
            if (orderDetails.getReview() != null) {
                rateRepository.deleteById(orderDetails.getReview().getId());
            }
        }
        orderRepository.deleteById(id);
    }

    @Override
    public Order updateOrder(int id, Order order) {
        Order result = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        result.setFullName(order.getFullName());
        result.setEmail(order.getEmail());
        result.setAddress(order.getEmail());
        result.setOrderStatus(order.getOrderStatus());
        return result;
    }

    @Override
    public ResponseEntity<?> orderWithPaymentMethodCOD(OrderDto orderDto) {
        System.out.println(orderDto);
        Order order = new Order();
        OrderStatus status = orderStatusRepository.findByStatus("Pending").orElse(null);
        if (orderDto.getUserId() != 0) {
            User user = userRepository.findUserById(orderDto.getUserId());
            order.setUser(user);
        }
        order.setFullName(orderDto.getFullName());
        order.setAddress(orderDto.getAddress());
        order.setPhone(orderDto.getPhone());
        order.setPayment_method(orderDto.getPaymentMethod());
        order.setPayment_status(false);
        order.setOrderStatus(status);
        order.setTotal_amount(orderDto.getTotalAmount());
        order.setNote(orderDto.getNote());
        if (orderDto.getDiscountCode() != null) {
            DiscountCode discountCode = discountCodeRepository.findByCode(orderDto.getDiscountCode()).orElse(null);
            System.out.println(discountCode);
            order.setDiscountCode(discountCode);
        }

        order.setShipping_cost(orderDto.getShippingCost());
        order.setCreatedAt(LocalDateTime.now());
        orderRepository.save(order);

        OrderDetails order_details;
        for (ProductsOrderDto products : orderDto.getProducts()) {
            order_details = new OrderDetails();
            Product product = productRepository.findById(products.getId()).orElse(null);
            order_details.setProduct(product);
            assert product != null;
            order_details.setProduct_name(product.getTitle());
            order_details.setQuantity(product.getQuantity());
            order_details.setPrice(product.getCurrentPrice());
            order_details.setOrder(order);
            orderDetailsRepository.save(order_details);

        }
//        updateDeliveryStatus(order.getId(), "Pending");

        System.out.println("Order created: " + order.getId());
        return ResponseEntity.ok(order);
    }
}
