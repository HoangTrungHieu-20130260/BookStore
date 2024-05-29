package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.repository.CategoryRepository;
import com.springboot.bookstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findByParentCategoryIsNull() {
        return categoryRepository.findByParentCategoryIsNull();
    }

    @Override
    public List<Category> findByParentCategoryIsNotNull() {
        return categoryRepository.findByParentCategoryIsNotNull();
    }

    @Override
    public List<Category> findByParentCategoryId(int id) {
        return categoryRepository.findByParentCategoryId(id);
    }
}
