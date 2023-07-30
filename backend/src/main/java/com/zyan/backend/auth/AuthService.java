package com.zyan.backend.auth;

import com.zyan.backend.user.entities.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface AuthService {
    AuthResponseDTO authenticate(AuthRequestDTO authRequestDTO);

    void register(RegisterRequestDTO request, String siteUrl) throws MessagingException, UnsupportedEncodingException;
    void sendVerificationEmail(User user, String siteUrl) throws MessagingException, UnsupportedEncodingException;
    boolean verify(String verificationCode);
}
