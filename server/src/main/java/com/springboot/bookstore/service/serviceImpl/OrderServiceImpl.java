package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.dto.ProductsOrderDto;
import com.springboot.bookstore.dto.OrderDto;
import com.springboot.bookstore.entity.*;
import com.springboot.bookstore.repository.*;
import com.springboot.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderServiceImpl implements OrderService {
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private OrderStatusRepository orderStatusRepository;
    private DiscountCodeRepository discountCodeRepository;

    @Autowired
    public OrderServiceImpl(UserRepository userRepository, ProductRepository productRepository, OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, OrderStatusRepository orderStatusRepository, DiscountCodeRepository discountCodeRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.discountCodeRepository = discountCodeRepository;
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
        order.setCreated_at(String.valueOf(LocalDateTime.now()));
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
