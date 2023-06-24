package com.zyan.backend.auth;

import com.zyan.backend.user.UserRepository;
import com.zyan.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
