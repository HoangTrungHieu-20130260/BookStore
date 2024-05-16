package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.User;

public interface UserService {
    User findByUserName(String username);
    boolean existsUserByUsername(String username);

}
