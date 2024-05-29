package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.User;
import org.springframework.data.domain.Page;

public interface UserService {
    Page<User> findAll(int page ,int size, String sortBy, String sortDir);
    Page<User> findAll(int page, int size, String sort, String order, String filter);
    User findById(int id);
    void deleteUser(int id);
    User findByUserName(String username);
    boolean existsUserByUsername(String username);

}
