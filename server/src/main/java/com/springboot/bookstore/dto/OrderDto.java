package com.springboot.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDto {
    private int userId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String paymentMethod;
    private boolean paymentStatus;
    private String note;
    private double shippingCost;
    private double totalAmount;
    private String discountCode;
    private List<ProductsOrderDto> products;
}
