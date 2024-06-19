package com.springboot.bookstore.service;

import com.springboot.bookstore.dto.AddressDto;
import com.springboot.bookstore.dto.UserDTO;
import com.springboot.bookstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface UserService {
    Page<User> findAll(int page ,int size, String sortBy, String sortDir);
    Page<User> findAll(int page, int size, String sort, String order, String filter);
    User findById(int id);
    void deleteUser(int id);
    ResponseEntity<?> createUser(User user);
    ResponseEntity<?> updateUser(int id, User user);
    User findByUserName(String username);
    boolean existsUserByUsername(String username);

    ResponseEntity<?> getDataUser(String token);

    ResponseEntity<?> editDataUser(UserDTO userDTO);

    ResponseEntity<?> addNewAddress(String username, AddressDto addressDto);

    ResponseEntity<?> changePassword(UserDTO userDTO);

    ResponseEntity<?> editAddress(String username, AddressDto addressDto);

    ResponseEntity<?> loadAddressUser(String token);
}
