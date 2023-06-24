package com.zyan.zyanbackend.auth;

import com.zyan.zyanbackend.user.UserModel;
import com.zyan.zyanbackend.user.UserRepository;
import com.zyan.zyanbackend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello is exception");
    }

    @GetMapping("/goodbye")
    public ResponseEntity<String> goodbye(){return ResponseEntity.ok("See ya");}

}
