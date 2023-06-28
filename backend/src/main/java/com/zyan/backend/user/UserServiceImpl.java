package com.zyan.backend.user;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.s3.S3Bucket;
import com.zyan.backend.s3.S3Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           S3Service s3Service, S3Bucket s3Bucket) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User with id [%s] not found".formatted(id)));
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public void checkIfUserExists(int userId) throws Exception {
        if(userRepository.findById(userId).isEmpty()){
            throw new ResourceNotFoundException("User with id [%s] not found".formatted(userId));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByName(username);
        return user.orElseThrow(()-> new UsernameNotFoundException("User not found " + username)) ;
    }
}
