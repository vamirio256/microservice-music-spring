package com.zyan.backend.user;

import com.zyan.backend.security.dto.SignUpDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createUser(SignUpDTO signUpDTO) {
        User user = User.builder()
                .username(signUpDTO.getUsername())
                .email(signUpDTO.getEmail())
                .roles(UserRole.USER)
                .password(new BCryptPasswordEncoder().encode(signUpDTO.getPassword()))
                .build();
        log.info(user.toString());
        return userRepository.save(user).mapUserToUserDTO();
    }
}
