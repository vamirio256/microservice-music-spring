package com.zyan.backend.auth;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.jwt.JwtUtils;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.ProfileRepository;
import com.zyan.backend.user.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProfileRepository profileRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ProfileRepository profileRepository, AuthenticationManager authenticationManager,
            JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.profileRepository = profileRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        // Check user email and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        //process if succeeded
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User with email '%s' not found".formatted(request.getEmail())));

        var jwtToken = jwtUtils.generateToken(user);
        return AuthResponseDTO.builder()
                .user(user.mapUserToUserDTO())
                .jwtToken(jwtToken)
                .build();
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO request) {
        Optional<User> existUser = userRepository.findByEmail(request.getEmail());
        if (existUser.isPresent()) {
            throw new EntityExistsException("User with email '%s' already exist".formatted(request.getEmail()));
        }
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .build();
        Profile profile = Profile.builder()
                .user(user)
                .build();
        user.setProfile(profile);
        userRepository.save(user);
        profileRepository.save(profile);
        var jwtToken = jwtUtils.generateToken(user);
        return AuthResponseDTO.builder()
                .user(user.mapUserToUserDTO())
                .jwtToken(jwtToken)
                .build();
    }
}
