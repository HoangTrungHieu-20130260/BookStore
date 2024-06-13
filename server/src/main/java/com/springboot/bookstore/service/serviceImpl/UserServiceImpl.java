package com.springboot.bookstore.service.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bookstore.config.JwtGenerator;
import com.springboot.bookstore.dto.UserDTO;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.repository.UserRepository;
import com.springboot.bookstore.service.UserService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private PasswordEncoder encoder;
    private JwtGenerator jwtGenerator;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder, JwtGenerator jwtGenerator) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtGenerator = jwtGenerator;
    }

    @Override
    public Page<User> findAll(int page, int size,String sortBy, String sortDir) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDir.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sortPa = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sortPa);
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> findAll(int page, int size, String sort, String order, String filter) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sortPa = Sort.by(direction, sort);
        Pageable pageable = PageRequest.of(page, size, sortPa);

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Specification<User> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (filterJson.has("q")) {
                String searchStr = filterJson.get("q").asText();
                predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("full_name")), "%" + searchStr.toLowerCase() + "%");
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            return predicate;
        };

        return userRepository.findAll(specification, pageable);
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(int id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            userRepository.deleteById(id);
        }

    }

    @Override
    public User findByUserName(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    @Override
    public boolean existsUserByUsername(String username) {
        return userRepository.existsUserByUsername(username);
    }

    @Override
    public ResponseEntity<?> getDataUser(String token) {
        String username = jwtGenerator.getUsernameFromJWT(token);
        User user = findByUserName(username);
        if (user == null){
            return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> changePassword(UserDTO userDTO) {
        User user = findByUserName(userDTO.getUsername());
        if (encoder.matches(userDTO.getPassword(), user.getPassword())) {
            user.setPassword(encoder.encode(userDTO.getNewPassword()));
//            user.getUserInformation().setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            return new ResponseEntity<>("Thay đổi mật khẩu thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Mật khẩu không chính xác !", HttpStatus.BAD_REQUEST);
        }
    }

}


