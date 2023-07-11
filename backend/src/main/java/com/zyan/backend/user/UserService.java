package com.zyan.backend.user;

import com.zyan.backend.auth.RegisterRequestDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(RegisterRequestDTO request);

    boolean checkIfEmailExist(String email);

    Optional<User> findByEmail(String email);

    void followUser(int followedId);

    UserDTO findById(int userId);

    void unfollowUser(int followedId);
}
