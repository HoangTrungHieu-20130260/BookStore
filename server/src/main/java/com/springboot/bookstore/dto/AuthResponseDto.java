package com.springboot.bookstore.dto;

import com.springboot.bookstore.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AuthResponseDto {
    private String token;
    private String role;
}
