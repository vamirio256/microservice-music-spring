package com.soundcloudclone.authorizeservice.service;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.model.UserModel;

public interface AuthorizeService {
    User registerUser(UserModel userModel);

    void saveVerificationTokenForUser(String token, User user);
}
