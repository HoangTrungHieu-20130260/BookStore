package com.springboot.bookstore.service.serviceImpl;

import com.springboot.bookstore.entity.Product;
import com.springboot.bookstore.entity.Role;
import com.springboot.bookstore.service.RoleService;
import org.springframework.data.domain.Page;

public class RoleServiceImpl implements RoleService {
    @Override
    public Page<Role> findAll(int page, int size, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public void deleteRole(int id) {

    }

    @Override
    public Role updateRole(int id, Product product) {
        return null;
    }

    @Override
    public Role createRole(Product product) {
        return null;
    }
}
