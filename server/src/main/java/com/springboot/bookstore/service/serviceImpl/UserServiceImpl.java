package com.springboot.bookstore.service.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bookstore.config.JwtGenerator;
import com.springboot.bookstore.dto.AddressDto;
import com.springboot.bookstore.dto.UserDTO;
import com.springboot.bookstore.entity.Address;
import com.springboot.bookstore.entity.User;
import com.springboot.bookstore.repository.AddressRepository;
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
import java.time.LocalDateTime;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private PasswordEncoder encoder;
    private JwtGenerator jwtGenerator;

    private AddressRepository addressRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder, JwtGenerator jwtGenerator, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtGenerator = jwtGenerator;
        this.addressRepository = addressRepository;
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
    public ResponseEntity<?> createUser(User user) {
        if (userRepository.existsUserByUsername(user.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }
        if (userRepository.existsUserByEmail(user.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.setStatus(true);
        user.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(userRepository.save(user));
    }

    @Override
    public ResponseEntity<?> updateUser(int id, User user) {
        User result = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        result.setPassword(encoder.encode(user.getPassword()));
        result.setEmail(user.getEmail());
        result.setPhone(user.getPhone());
        result.setFullName(user.getFullName());
        result.setAvatar(user.getAvatar());
        result.setStatus(user.isStatus());
        result.setRole(user.getRole());
        result.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(userRepository.save(result));
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
    public ResponseEntity<?> editDataUser(UserDTO userDTO){
        User user = findByUserName(userDTO.getUsername());
        if (user == null) return new ResponseEntity<>("Tài khoản không tồn tại!", HttpStatus.BAD_REQUEST);
        String fullName = userDTO.getFullName();
        String email = userDTO.getEmail();
        String phone = userDTO.getPhone();
        String avatar = userDTO.getAvatarLink();
        user.setUpdatedAt(LocalDateTime.now());
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAvatar(avatar);
        userRepository.save(user);
        System.out.println("Edit user:" + user.getUsername() + " success");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> addNewAddress(String username, AddressDto addressDto) {
        try {
            User user = findByUserName(username);
            if (addressDto.isDefault()) {
                List<Address> addresses = user.getAddress();
                for (Address ar : addresses) {
                    ar.setDefault(false);
                }
            }
            userRepository.save(user);
            Address address = new Address();
            address.setUser(user);
            address.setFullName(addressDto.getFullName());
            address.setPhone(addressDto.getPhone());
            address.setStreet(addressDto.getStreet());
            address.setWardId(addressDto.getWardId());
            address.setWard(addressDto.getWard());
            address.setDistrictId(addressDto.getDistrictId());
            address.setDistrict(addressDto.getDistrict());
            address.setProvinceId(addressDto.getProvinceId());
            address.setProvince(addressDto.getProvince());
            address.setDefault(addressDto.isDefault());
            address.setCreatedAt(LocalDateTime.now());
            addressRepository.save(address);
            return new ResponseEntity<>(address, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi thao tác !", HttpStatus.BAD_REQUEST);
        }
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

    @Override
    public ResponseEntity<?> editAddress(String username, AddressDto addressDto) {
        try {
            User user = findByUserName(username);
            if (addressDto.isDefault()) {
                List<Address> addresses = user.getAddress();
                for (Address ar : addresses) {
                    ar.setDefault(false);
                }
            }
            userRepository.save(user);
            Address address = addressRepository.findById(addressDto.getId()).orElse(null);
            if (address == null) return new ResponseEntity<>("Address not found!", HttpStatus.BAD_REQUEST);
            address.setFullName(addressDto.getFullName());
            address.setPhone(addressDto.getPhone());
            address.setStreet(addressDto.getStreet());
            address.setWardId(addressDto.getWardId());
            address.setWard(addressDto.getWard());
            address.setDistrictId(addressDto.getDistrictId());
            address.setDistrict(addressDto.getDistrict());
            address.setProvinceId(addressDto.getProvinceId());
            address.setProvince(addressDto.getProvince());
            address.setDefault(addressDto.isDefault());
            address.setUpdatedAt(LocalDateTime.now());
            addressRepository.save(address);
            return new ResponseEntity<>(address, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi thao tác !", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> loadAddressUser(String token) {
        if (token == null) return new ResponseEntity<>("Token expired !", HttpStatus.BAD_REQUEST);
        try {
            String username = jwtGenerator.getUsernameFromJWT(token);
            User user = findByUserName(username);
            if (user == null) return new ResponseEntity<>("User not found !", HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(user.getAddress(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Token expired !", HttpStatus.OK);
        }
    }

}


