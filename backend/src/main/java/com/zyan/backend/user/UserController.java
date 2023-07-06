package com.zyan.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable int userId){
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PostMapping("/{followerId}/follow/{followedId}")
    public ResponseEntity<String> followUser(
            @PathVariable int followerId,
            @PathVariable int followedId){
        userService.followUser(followerId, followedId);
        return ResponseEntity.ok("User with id %s now following user with id %s".formatted(followerId, followedId));
    }
}
