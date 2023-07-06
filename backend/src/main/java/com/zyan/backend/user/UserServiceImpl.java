package com.zyan.backend.user;

import com.zyan.backend.auth.RegisterRequestDTO;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void createAdmin() {
        if(userRepository.findByRole(UserRole.ADMIN).isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@gmail.com")
                    .password(new BCryptPasswordEncoder().encode("admin"))
                    .build();
            userRepository.save(admin);
        }
    }

    @Override
    public UserDTO createUser(RegisterRequestDTO request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .role(UserRole.USER)
                .password(new BCryptPasswordEncoder().encode(request.getPassword()))
                .build();
        log.info(user.toString());
        return userRepository.save(user).mapUserToUserDTO();
    }

    @Override
    public boolean checkIfEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void followUser(int followerId, int followedId) {

    }

    @Override
    public Optional<User> findById(int userId) {
        return userRepository.findById(userId);
    }
}
