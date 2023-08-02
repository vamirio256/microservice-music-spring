package com.zyan.backend.security.oauth2;

import com.zyan.backend.exception.EmailAlreadyExistException;
import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomAuthenticationSuccessfulHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;

    public CustomAuthenticationSuccessfulHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

//        CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
//        if (oauthUser.getEmail().isEmpty()) {
//            throw new ResourceNotFoundException("Email is empty, please login with other methods");
//        }
//
//        var user = User.builder()
//                .username(oauthUser.getName())
//                .email(oauthUser.getEmail())
//                .role(UserRole.USER)
//                .enabled(true)
//                .avatarUrl(oauthUser.getAvatarUrl())
//                .build();
//
//        //if email exist, update
//        Optional<User> existUser = userRepository.findByEmail(oauthUser.getEmail());
//        if(existUser.isPresent()){
//            existUser.
//        }
//
//        Profile profile = Profile.builder()
//                .user(user)
//                .build();
//        user.setProfile(profile);
//        userRepository.save(user);
    }
}
