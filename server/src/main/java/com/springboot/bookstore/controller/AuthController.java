package com.springboot.bookstore.controller;

import com.springboot.bookstore.config.JwtGenerator;
import com.springboot.bookstore.dto.AuthResponseDto;
import com.springboot.bookstore.dto.LoginDto;
import com.springboot.bookstore.dto.RegisterDto;
import com.springboot.bookstore.entity.Role;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.repository.RoleRepository;
import com.springboot.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder;
    private JwtGenerator jwtGenerator;
    @Autowired
    public AuthController(AuthenticationManager authenticationManager,UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder encoder, JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtGenerator = jwtGenerator;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);

    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsUserByUsername(registerDto.getUsername())) {
            return ResponseEntity.badRequest().body("Username is taken");
        }
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(encoder.encode(registerDto.getPassword()));
        user.setStatus(true);
        Role role = roleRepository.findByName("USER").orElse(null);
        user.setRole(role);
        System.out.println(role);
        userRepository.save(user);
        return ResponseEntity.ok("User registered success!");
    }

}
