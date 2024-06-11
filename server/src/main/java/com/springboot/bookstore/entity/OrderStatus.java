package com.springboot.bookstore.entity;
import jakarta.persistence.*;
import lombok.Data;
import org.aspectj.weaver.ast.Or;

import java.util.List;

@Data
@Entity
@Table(name = "order_status")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String status;
}