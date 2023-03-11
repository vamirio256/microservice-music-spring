package com.soundcloudclone.authorizeservice.service;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.entity.VerificationToken;
import com.soundcloudclone.authorizeservice.model.UserModel;

import java.util.Optional;

public interface AuthorizeService {
    User registerUser(UserModel userModel);

    void saveVerificationTokenForUser(String token, User user);

    String validateVerificationToken(String token);

    VerificationToken generateNewVerificationToken(String oldToken);

    User findUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    String validatePasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token);

    void changePassword(User user, String newPassword);

    boolean checkIfValidOldPassword(User user, String oldPassword);
}
