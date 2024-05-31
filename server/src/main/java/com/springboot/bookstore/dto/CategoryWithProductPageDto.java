package com.springboot.bookstore.dto;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.domain.Page;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryWithProductPageDto {
    private Category category;
    private Page<Product> products;
}
