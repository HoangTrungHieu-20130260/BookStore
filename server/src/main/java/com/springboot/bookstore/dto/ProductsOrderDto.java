package com.springboot.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductsOrderDto {
    private int id;
    private String productName;
    private int quantity;
    private double price;
}