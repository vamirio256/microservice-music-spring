package com.zyan.backend.user;

import com.zyan.backend.auth.RegisterRequestDTO;
import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.User;
import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
//    private final Map<Integer, Set<Integer>> followingMap;
//    private final Map<Integer, Set<Integer>> followedMap;


    public UserServiceImpl(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    //    @PostConstruct
    public void createAdmin() {
        if (userRepository.findByRole(UserRole.ADMIN).isEmpty()) {
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
        Optional<User> existUser = userRepository.findByEmail(request.getEmail());
        if(existUser.isPresent()){
            throw new EntityExistsException("User with email '%s' already exist".formatted(request.getEmail()));
        }

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
    public void followUser(int followedId) {
//        SecurityContextHolder.getContext().getAuthentication().
//
//
//        if (followerId == followedId) {
//            throw new MethodArgumentTypeMismatchException("Follower and followd user can not be the same");
//        }
//
//        User follower = userRepository.findById(followerId)
//                .orElseThrow(() -> new ResourceNotFoundException("Follower wit id '%s' not found".formatted(followerId)));
//        User followed = userRepository.findById(followedId)
//                .orElseThrow(() -> new ResourceNotFoundException("Follower wit id '%s' not found".formatted(followedId)));
//        follower.getFollowedUsers().add(followed);
//        followed.getFollowers().add(follower);
//
//        userRepository.save(follower);
//        userRepository.save(followed);
    }

    @Override
    public UserDTO findById(int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().mapUserToUserDTO();
        } else {
            throw new ResourceNotFoundException("User with id '%s' not found".formatted(userId));
        }
    }

    @Override
    public void unfollowUser(int followedId) {

//        User follower = userRepository.findById(followerId)
//                .orElseThrow(() -> new ResourceNotFoundException("Follower wit id '%s' not found".formatted(followerId)));
//        User followed = userRepository.findById(followedId)
//                .orElseThrow(() -> new ResourceNotFoundException("Follower wit id '%s' not found".formatted(followedId)));
//        follower.getFollowedUsers().remove(followed);
//        followed.getFollowers().remove(follower);
//
//        userRepository.save(follower);
//        userRepository.save(followed);
    }
}
