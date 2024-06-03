package com.springboot.bookstore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class OTPConfig {
    public String generateOTP(Map<String, String> otpStorage, String email) {
        String otp = String.format("%04d", (int) (Math.random() * 1000000));
        otpStorage.put(email, otp);
        return otp;
    }

    public boolean checkEmailIsValid(Map<String, String> mapOtp, String email) {
        return mapOtp.containsKey(email);
    }

    public void setTimeOutOtp(Map<String, String> mapOtp, String email, int minutes) {
        new Thread(() -> {
            try {
                TimeUnit.MINUTES.sleep(minutes);
                mapOtp.remove(email);
                System.out.println("5 Minutes finish. OTP is clear.");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void clearOTP(Map<String, String> otpStorage, String email) {
        if (!otpStorage.isEmpty()) {
            otpStorage.remove(email);
            System.out.println("OTP email: " + email + " is clear!!!");
        }
    }
}
