package com.zyan.backend.user;

import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.dto.UserSummaryDTO;
import com.zyan.backend.user.entities.Favorite;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.services.UserService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable int userId) {
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PutMapping("/avatar")
    public ResponseEntity<UserDTO> updateUserAvatar(@RequestBody MultipartFile avatar) {
        return ResponseEntity.ok(userService.updateUserAvatar(avatar));
    }

    @PostMapping("/follow/{followedId}")
    public ResponseEntity<String> followUser(
            @PathVariable int followedId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.followUser(followedId);
        return ResponseEntity.ok("Followed successfully user with id '%s'".formatted(followedId));
    }

    @PostMapping("/unfollow/{followedId}")
    public ResponseEntity<String> unfollowUser(
            @PathVariable int followedId) {
        userService.unfollowUser(followedId);
        return ResponseEntity.ok("Unfollowed successfully user with id '%s'".formatted(followedId));
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<UserSummaryDTO>> recommendUsers(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(userService.recommendUsers(user));
    }

    @PostMapping("/favorite/{trackId}")
    public ResponseEntity<String> addFavoriteTrack(
            @PathVariable int trackId) {
        userService.addFavoriteTrack(trackId);
        return ResponseEntity.ok("Added successfully track with id '%s' to favorite".formatted(trackId));
    }

    @DeleteMapping("/favorite/{trackId}")
    public ResponseEntity<String> removeFavoriteTrack(
            @PathVariable int trackId
    ) {
        userService.removeFavoriteTrack(trackId);
        return ResponseEntity.status(HttpStatusCode.valueOf(204)).body("Deleted successfully track with id '%s' from favorite".formatted(trackId));
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<Favorite>> getFavoriteTracks(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(userService.getFavoriteTracks(user));
    }
}
