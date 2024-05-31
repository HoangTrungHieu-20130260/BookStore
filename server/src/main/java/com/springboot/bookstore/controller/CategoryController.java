package com.springboot.bookstore.controller;

import com.springboot.bookstore.dto.CategoryDto;
import com.springboot.bookstore.dto.CategoryWithProductPageDto;
import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    private CategoryService categoryService;
    @Autowired

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping("")
    public Page<Category> findAll(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(defaultValue = "id") String sortBy,
                              @RequestParam(defaultValue = "asc") String sortDir) {
        return categoryService.findAll(page,size,sortBy,sortDir);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.findById(id));

    }
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
    }

    @GetMapping("/get-parent-categories-is-null")
    public List<Category> findByParentCategoryIsNull() {
        return categoryService.findByParentCategoryIsNull();
    }
    @GetMapping("/get-parent-categories-is-not-null")
    public List<Category> findByParentCategoryIsNotNull() {
        return categoryService.findByParentCategoryIsNotNull();
    }
    @GetMapping("/products/{id}")
    public CategoryWithProductPageDto findProductsByCategoryId(
            @PathVariable int id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return categoryService.findProductsByCategoryId(id, page,size,sortBy,sortDir);
    }
    @GetMapping("/get-all")
    public List<CategoryDto> getCategoryAndSubCategory() {
        return categoryService.getCategoryAndSubCategory();
    }

}
