package com.springboot.bookstore.dto;

import com.springboot.bookstore.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryDto {
    private Category category;
    private List<Category> categories;
}
