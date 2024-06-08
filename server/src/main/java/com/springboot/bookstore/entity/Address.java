package com.springboot.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "address")
public class Address {
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone")
    private String phone;

    private String street;

    @Column(name = "ward_id")
    private long wardId;
    private String ward;

    @Column(name = "district_id")
    private long districtId;
    private String district;

    @Column(name = "province_id")
    private long provinceId;
    private String province;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_default")
    private boolean isDefault;


}
