package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Blog;
import org.springframework.data.domain.Page;

public interface BlogService {
    Page<Blog> findAll(int page ,int size, String sortBy, String sortDir, String filter);
    Blog findById(int id);
    void deleteBlog(int id);
    Blog updateBlog(int id, Blog blog);
    Blog createBlog(Blog blog);
}
