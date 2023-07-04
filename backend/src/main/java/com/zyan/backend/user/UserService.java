package com.zyan.backend.user;

import com.zyan.backend.security.dto.SignUpDTO;

public interface UserService {
    UserDTO createUser(SignUpDTO signUpDTO);
}
