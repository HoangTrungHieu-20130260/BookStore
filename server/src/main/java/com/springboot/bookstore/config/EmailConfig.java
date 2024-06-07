package com.springboot.bookstore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Configuration
public class EmailConfig {

    @Autowired
    private JavaMailSender mailSender;


//    @Autowired
//    public EmailConfig(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }

    public void sendEmail(String recipientEmail, String emailSubject, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Mã xác nhận email:" + emailSubject);
        message.setText("Mã OTP của bạn là:" + otpCode);
        mailSender.send(message);
    }
}
