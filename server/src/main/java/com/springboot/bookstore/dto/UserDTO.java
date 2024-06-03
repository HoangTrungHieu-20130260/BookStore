package com.springboot.bookstore.dto;

import com.springboot.bookstore.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private long id;
    private String username;
    private String password;
    private String newPassword;
    private String email;
    private Role role;
    private boolean status;
    private String otp;
    private String fullName;
    private String address;
    private String phone;
}