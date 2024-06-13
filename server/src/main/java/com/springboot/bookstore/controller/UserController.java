package com.springboot.bookstore.controller;

import com.springboot.bookstore.dto.AddressDto;
import com.springboot.bookstore.dto.UserDTO;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/find-by-username")
    public ResponseEntity<?> findByUsername(@RequestParam String username) {
        User user = userService.findByUserName(username);
        return ResponseEntity.ok("Find access");
    }
    @GetMapping("")
    public Page<User> findAll(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return userService.findAll(page,size,sortBy,sortDir);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        return ResponseEntity.ok(userService.findById(id));

    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }

    @PostMapping("/user-details/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody UserDTO userDTO
    ) {
        return userService.changePassword(userDTO);
    }

    @GetMapping("/get-data-user")
    public ResponseEntity<?> fecthDataUser (@RequestParam String token){
        return userService.getDataUser(token);
    }

    @PostMapping("/user-details/edit")
    public ResponseEntity<?> editDataUser(
            @RequestBody UserDTO userDTO
    ) {
        return userService.editDataUser(userDTO);
    }

    @PostMapping("/user-details/add-new-address")
    public ResponseEntity<?> addNewAddress(
            @RequestParam String username,
            @RequestBody AddressDto addressDto
    ) {
        return userService.addNewAddress(username, addressDto);
    }

    @PostMapping("/user-details/edit-address")
    public ResponseEntity<?> editAddress(
            @RequestParam String username,
            @RequestBody AddressDto addressDto
    ) {
        return userService.editAddress(username, addressDto);
    }

//    public Page<User> getAll(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "5") int perPage,
//            @RequestParam(defaultValue = "id") String sort,
//            @RequestParam(defaultValue = "asc") String order,
//            @RequestParam(defaultValue = "") String filter
//    ) {
//        return userService.findAll(page, perPage, sort, order, filter);
//    }

}
