package com.zyan.backend.security;

import com.zyan.backend.security.dto.SignUpDTO;
import com.zyan.backend.user.UserDTO;
import com.zyan.backend.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class SignUpController {

    private final UserService userService;

    public SignUpController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity signUpUser(@RequestBody SignUpDTO signUpDTO){
        UserDTO createdUser = userService.createUser(signUpDTO);
        if(createdUser == null){
            return ResponseEntity.badRequest().body("User not created");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}
