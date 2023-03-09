package com.soundcloudclone.authorizeservice.service;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.entity.VerificationToken;
import com.soundcloudclone.authorizeservice.model.UserModel;
import com.soundcloudclone.authorizeservice.repository.UserRepository;
import com.soundcloudclone.authorizeservice.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizeServiceImpl implements AuthorizeService {

    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserModel userModel) {
        User user = User.builder()
                .email(userModel.getEmail())
                .firstName(userModel.getFirstName())
                .lastName(userModel.getLastName())
                .role("USER")
                .password(passwordEncoder.encode(userModel.getPassword()))
                .build();
        userRepository.save(user);
        return null;
    }

    @Override
    public void saveVerificationTokenForUser(String token, User user) {
        VerificationToken verificationToken = new VerificationToken(user, token);
        verificationTokenRepository.save(verificationToken);
    }
}
