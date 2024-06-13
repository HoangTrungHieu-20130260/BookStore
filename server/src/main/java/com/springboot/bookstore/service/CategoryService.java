package com.springboot.bookstore.service;

import com.springboot.bookstore.dto.CategoryDto;
import com.springboot.bookstore.dto.CategoryWithProductPageDto;
import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CategoryService {
    Page<Category> findAll(int page ,int size, String sortBy, String sortDir);
    Category findById(int id);
    void deleteCategory(int id);
    Category updateCategory(int id, Category category);
    Category createCategory(Category category);

    List<Category> findByParentCategoryIsNull();
    List<Category> findByParentCategoryIsNotNull();
    List<Category> findByParentCategoryId(int id);
    List<CategoryDto> getCategoryAndSubCategory();

    CategoryWithProductPageDto findProductsByCategoryId(int id, int page, int size,String sortBy, String sortDir);

}
