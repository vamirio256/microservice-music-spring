package com.zyan.backend.user.services;

import com.zyan.backend.auth.RegisterRequestDTO;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface UserService {
    UserDTO createUser(RegisterRequestDTO request);

    boolean checkIfEmailExist(String email);

    Optional<User> findByEmail(String email);

    void followUser(int followedId);

    UserDTO findById(int userId);

    void unfollowUser(int followedId);
    void addFavoriteTrack (int trackId);

    void removeFavoriteTrack(int trackId);

    UserDTO updateUserAvatar(MultipartFile avatar);
}
