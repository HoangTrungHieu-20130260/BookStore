package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.dto.CategoryDto;
import com.springboot.bookstore.dto.CategoryWithProductPageDto;
import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.repository.CategoryRepository;
import com.springboot.bookstore.repository.ProductRepository;
import com.springboot.bookstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Page<Category> findAll(int page, int size, String sortBy, String sortDir) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDir.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sortPa = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sortPa);
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Category findById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(int id, Category category) {
        Category result = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        result.setName(category.getName());
        result.setUpdatedAt(LocalDateTime.now());
        result.setActive(category.getActive());
        return categoryRepository.save(result);
    }

    @Override
    public Category createCategory(Category category) {
        category.setCreatedAt(LocalDateTime.now());
        category.setActive(true);
        return categoryRepository.save(category);
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

    @Override
    public List<CategoryDto> getCategoryAndSubCategory() {
        List<Category> categories = findByParentCategoryIsNull();
        List<CategoryDto> result = new ArrayList<>();
        for (int i = 0; i < categories.size(); i++) {
            List<Category> subCategoryList = findByParentCategoryId(categories.get(i).getId());
            result.add(new CategoryDto(categories.get(i), subCategoryList));
        }
        return result;
    }

    @Override
    public CategoryWithProductPageDto findProductsByCategoryId(int id,int page, int size,String sortBy, String sortDir) {
        Category category = categoryRepository.findById(id).orElse(null);
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDir.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Page<Product> products =
                productRepository.findByCategoryId(id, PageRequest.of(page, size, Sort.by(direction, sortBy)));
        CategoryWithProductPageDto result = new CategoryWithProductPageDto(category, products);
        return result;
    }


}
