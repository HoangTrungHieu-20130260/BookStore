package com.springboot.bookstore.service;

import com.springboot.bookstore.dto.CategoryDto;
import com.springboot.bookstore.dto.CategoryWithProductPageDto;
import com.springboot.bookstore.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CategoryService {

    List<Category> findByParentCategoryIsNull();
    List<Category> findByParentCategoryIsNotNull();
    List<Category> findByParentCategoryId(int id);
    List<CategoryDto> getCategoryAndSubCategory();

    CategoryWithProductPageDto findProductsByCategoryId(int id, int page, int size,String sortBy, String sortDir);

}
