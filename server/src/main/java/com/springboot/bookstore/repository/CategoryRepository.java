package com.springboot.bookstore.repository;

import com.springboot.bookstore.dto.CategoryDto;
import com.springboot.bookstore.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    @Override
    Page<Category> findAll(Pageable pageable);
    List<Category> findByParentCategoryIsNull();
    List<Category> findByParentCategoryIsNotNull();
    List<Category> findByParentCategoryId(int id);
}
