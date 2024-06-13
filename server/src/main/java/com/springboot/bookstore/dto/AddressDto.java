package com.springboot.bookstore.dto;
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
public class AddressDto {
    private int id;
    private String fullName;
    private String phone;
    private String street;
    private long wardId;
    private String ward;
    private long districtId;
    private String district;
    private long provinceId;
    private String province;
    private boolean isDefault;
}
