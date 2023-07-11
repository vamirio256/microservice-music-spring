package com.zyan.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable int userId){
        return ResponseEntity.ok(userService. findById(userId));
    }

    @PostMapping("/follow/{followedId}")
    public ResponseEntity<String> followUser(
            @PathVariable int followedId){
        userService.followUser(followedId);
        return ResponseEntity.ok("Successfully following user with id '%s'".formatted(followedId));
    }

    @PostMapping("/unfollow/{followedId}")
    public ResponseEntity<String> unfollowUser(
            @PathVariable int followedId){
        userService.unfollowUser(followedId);
        return ResponseEntity.ok("Successfully unfollowed user with id '%s'".formatted(followedId));
    }
}