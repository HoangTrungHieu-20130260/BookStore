package com.springboot.bookstore.controller;

import com.springboot.bookstore.config.EmailConfig;
import com.springboot.bookstore.config.JwtGenerator;
import com.springboot.bookstore.config.OTPConfig;
import com.springboot.bookstore.dto.*;
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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    private EmailConfig emailConfig;

    @Autowired
    private OTPConfig otpConfig;
    private final Map<String, String> otpStorage = new HashMap<>();
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
        User user = userRepository.findByUsername(loginDto.getUsername())
                .orElse(null);
        if (user == null) {
            return new ResponseEntity<>("Tài khoản không tồn tại!", HttpStatus.NOT_FOUND);
        }
        if (!encoder.matches(loginDto.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Mật khẩu không đúng!", HttpStatus.BAD_REQUEST);
        }
        if (!user.isStatus()) {
            return new ResponseEntity<>("Tài khoản đã bị khóa!", HttpStatus.NOT_FOUND);
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            return new ResponseEntity<>(new AuthResponseDto(token, user.getRole().getName()), HttpStatus.OK);
        } catch (AuthenticationException e) {
            throw new RuntimeException(e);
        }



    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsUserByUsername(registerDto.getUsername())) {
            return ResponseEntity.badRequest().body("Username is taken");
        }
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(encoder.encode(registerDto.getPassword()));
        user.setEmail(registerDto.getEmail());
        user.setPhone(registerDto.getPhone());
        user.setStatus(true);
        Role role = roleRepository.findByName("USER").orElse(null);
        user.setRole(role);
        userRepository.save(user);
        return ResponseEntity.ok("User registered success!");
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgot(@RequestBody ForgotDto forgotDto){
        if (userRepository.existsByEmail(forgotDto.getEmail())){
            otpConfig.clearOTP(otpStorage, forgotDto.getEmail());
            String otp = otpConfig.generateOTP(otpStorage, forgotDto.getEmail());
            emailConfig.sendEmail( forgotDto.getEmail(), "RESET PASSWORD", otp);
            return new ResponseEntity<>("Mã OTP đã được gửi đến email của bạn!", HttpStatus.OK);
        }
        return ResponseEntity.ok("Email chưa được đăng kí trên hệ thống!");
    }

    @PostMapping("/reset")
    public ResponseEntity<?> reset(@RequestBody UserDTO userDTO){
        if (otpConfig.checkEmailIsValid(otpStorage, userDTO.getEmail())){
            if(!otpStorage.get(userDTO.getEmail()).equals(userDTO.getOtp())){
                return new ResponseEntity<>("OTP không hợp lệ!", HttpStatus.BAD_REQUEST);
            }
            User user = userRepository.findByEmail(userDTO.getEmail());
            user.setPassword(encoder.encode(userDTO.getNewPassword()));
            userRepository.save(user);
            otpConfig.clearOTP(otpStorage, userDTO.getEmail());
        }
        return new ResponseEntity<>("Thay đổi mật khẩu thành công!", HttpStatus.OK);
    }
}
