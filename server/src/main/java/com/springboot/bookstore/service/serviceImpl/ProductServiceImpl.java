package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.repository.CategoryRepository;
import com.springboot.bookstore.repository.ProductRepository;
import com.springboot.bookstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<Product> findAll(int page, int size,String sortBy, String sortDir) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDir.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sortPa = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sortPa);
        return productRepository.findAll(pageable);
    }

    @Override
    public List<Product> getAllProducts() {
        System.out.println(productRepository.findAll());
        return productRepository.findAll();
    }

    @Override
    public Product findById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product updateProduct(int id, Product product) {
        Product result = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        result.setCategory(product.getCategory());
        result.setTitle(product.getTitle());
        result.setImage(product.getImage());
        result.setOldPrice(product.getOldPrice());
        result.setCurrentPrice(product.getCurrentPrice());
        result.setQuantity(product.getQuantity());
        result.setDescription(product.getDescription());
        result.setAuthor(product.getAuthor());
        result.setPublisher(product.getPublisher());
        result.setPublishYear(product.getPublishYear());
        result.setUpdatedAt(LocalDateTime.now());
        result = productRepository.save(result);
        return result;
    }
    @Override
    public Product createProduct(Product product) {
        Product result = new Product();
        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        result.setTitle(product.getTitle());
        result.setCategory(category);
        result.setImage(product.getImage());
        result.setOldPrice(product.getOldPrice());
        result.setCurrentPrice(product.getCurrentPrice());
        result.setQuantity(product.getQuantity());
        result.setDescription(product.getDescription());
        result.setAuthor(product.getAuthor());
        result.setPublisher(product.getPublisher());
        result.setPublishYear(product.getPublishYear());
        result.setCreatedAt(LocalDateTime.now());
        result.setActive(true);
        return productRepository.save(result);
    }
}
