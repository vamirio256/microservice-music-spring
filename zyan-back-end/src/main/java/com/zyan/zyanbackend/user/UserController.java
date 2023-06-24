package com.zyan.zyanbackend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{userId}")
    public ResponseEntity<User> getUser(@PathVariable("userId") int id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
