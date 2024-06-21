package com.springboot.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "note")
    private String note;

    @Column(name = "payment_method")
    private String payment_method;

    @Column(name = "payment_status")
    private boolean payment_status;

    @Column(name = "total_amount")
    private double total_amount;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_code_id", referencedColumnName = "id")
    private DiscountCode discountCode;

    @Column(name = "shipping_cost")
    private double shipping_cost;

    @Column(name = "transaction_id")
    private String transaction_id;

     @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
     @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
     private List<OrderDetails> orderDetails;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_status_id", referencedColumnName = "id", nullable = false)
    private OrderStatus orderStatus;
}