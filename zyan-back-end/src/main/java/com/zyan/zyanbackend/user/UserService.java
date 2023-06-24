package com.zyan.zyanbackend.user;

import com.zyan.zyanbackend.user.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService extends UserDetailsService {
    User saveUser(User user);
    User getUserById(int id);
    List<User> findAll();
    UserDto currentUser();
    void checkIfUserExists(Integer userId) throws Exception;
}
