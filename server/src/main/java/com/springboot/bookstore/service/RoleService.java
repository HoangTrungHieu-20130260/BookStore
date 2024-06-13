package com.springboot.bookstore.service;

import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.entity.Role;
import org.springframework.data.domain.Page;

public interface RoleService {
    Page<Role> findAll(int page, int size, String sortBy, String sortDir);
    void deleteRole(int id);
    Role updateRole(int id, Product product);

    Role createRole(Product product);

}
