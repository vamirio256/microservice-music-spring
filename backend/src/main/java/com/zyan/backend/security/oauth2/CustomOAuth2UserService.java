package com.zyan.backend.security.oauth2;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.security.jwt.JwtUtils;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    public CustomOAuth2UserService(JwtUtils jwtUtils, UserRepository userRepository) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        CustomOAuth2User oauthUser = new CustomOAuth2User(new DefaultOAuth2UserService().loadUser(userRequest));

        if (oauthUser.getEmail().isEmpty()) {
            throw new ResourceNotFoundException("Email is empty, please login with other methods");
        }

        //if email exist, update
        Optional<User> existUser = userRepository.findByEmail(oauthUser.getEmail());
        if (existUser.isPresent()) {
            User updatedUser = existUser.get();
            updatedUser.setUsername(oauthUser.getName());
            updatedUser.setAvatarUrl(oauthUser.getAvatarUrl());
            userRepository.save(updatedUser);
        } else {
            var user = User.builder()
                    .username(oauthUser.getName())
                    .email(oauthUser.getEmail())
                    .role(UserRole.USER)
                    .enabled(true)
                    .avatarUrl(oauthUser.getAvatarUrl())
                    .build();
            Profile profile = Profile.builder()
                    .user(user)
                    .build();
            user.setProfile(profile);
            userRepository.save(user);
        }

        return oauthUser;
    }
}

