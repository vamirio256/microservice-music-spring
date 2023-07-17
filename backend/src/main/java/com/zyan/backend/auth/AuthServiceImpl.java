package com.zyan.backend.auth;

import com.zyan.backend.security.JwtUtils;
import com.zyan.backend.user.ProfileRepository;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.UserRepository;
import com.zyan.backend.user.UserRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
                .orElseThrow();
        var jwtToken = jwtUtils.generateToken(user);
        return AuthResponseDTO.builder()
                .jwtToken(jwtToken)
                .build();
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO request) {
        Profile profile = new Profile();
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .build();
        profile.setUser(user);
        user.setProfile(profile);
        userRepository.save(user);
        profileRepository.save(profile);
        var jwtToken = jwtUtils.generateToken(user);
        return AuthResponseDTO.builder()
                .jwtToken(jwtToken)
                .build();
    }
}
