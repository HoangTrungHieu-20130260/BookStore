package com.springboot.bookstore.repository;

import com.springboot.bookstore.entity.Blog;
import com.springboot.bookstore.entity.Rate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    Page<Blog> findAll(Specification<Blog> specification, Pageable pageable);
}
