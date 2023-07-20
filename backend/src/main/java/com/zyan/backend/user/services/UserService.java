package com.zyan.backend.user.services;

import com.zyan.backend.auth.RegisterRequestDTO;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.User;

import java.util.Optional;

public interface UserService {
    UserDTO createUser(RegisterRequestDTO request);

    boolean checkIfEmailExist(String email);

    Optional<User> findByEmail(String email);

    void followUser(int followedId);

    Object findById(int userId);

    void unfollowUser(int followedId);
}
