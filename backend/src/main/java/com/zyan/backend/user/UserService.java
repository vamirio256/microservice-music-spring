package com.zyan.backend.user;

import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User saveUser(User user);
    User getUserById(int id);
    List<User> findAll();
    void checkIfUserExists(int userId) throws Exception;
}
