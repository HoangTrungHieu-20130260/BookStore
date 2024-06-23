package com.springboot.bookstore.service.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bookstore.entity.Category;
import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.repository.CategoryRepository;
import com.springboot.bookstore.repository.OrderDetailsRepository;
import com.springboot.bookstore.repository.ProductRepository;
import com.springboot.bookstore.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, OrderDetailsRepository orderDetailsRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    @Override
    public Page<Product> findAll(int page, int size,String sortBy, String sortDir, String filter) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDir.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<Product> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("title"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("active"), filterJson.get("status").asBoolean()));
            }
            if (filterJson.has("category")) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(categoryJoin.get("id"), filterJson.get("category").asLong()));
            }
            return predicate;
        };
        return switch (sortBy) {
            case "current_price" ->
                    productRepository.findAll(specification, PageRequest.of(page, size, Sort.by(direction, "price")));
            case "title" ->
                    productRepository.findAll(specification, PageRequest.of(page, size, Sort.by(direction, "title")));
            case "status" ->
                    productRepository.findAll(specification, PageRequest.of(page, size, Sort.by(direction, "status")));
            default ->
                    productRepository.findAll(specification, PageRequest.of(page, size, Sort.by(direction, sortBy)));
        };
    }

    @Override
    public List<Product> getAllProducts() {
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
        result.setCreatedAt(product.getCreatedAt());
        result.setActive(product.getActive());
        result.setUpdatedAt(LocalDateTime.now());
        result.setRates(product.getRates());
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

    @Override
    public List<Object[]> getBestSellingProducts() {
        Pageable pageable = PageRequest.of(0,10);
        return orderDetailsRepository.findBestSellingProducts(pageable).getContent();
    }

    @Override
    public List<Product> get10NewsProduct() {
        return productRepository.findTop10ByOrderByCreatedAtDesc();
    }
}
