package com.springboot.bookstore.service.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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

        JsonNode jsonFilter;
        try {
            jsonFilter = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Specification<User> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (jsonFilter.has("q")) {
                String searchStr = jsonFilter.get("q").asText();
                predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("fullName")), "%" + searchStr.toLowerCase() + "%");
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

}
